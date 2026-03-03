import { NextRequest, NextResponse } from "next/server";
import {
  createPendingOrder,
  getIdempotencyRecord,
  hashForIdempotency,
  markOrderFailed,
  saveIdempotencyRecord,
  validateStock,
} from "../../../../lib/server/commerce";
import { getUserFromRequest } from "../../../../lib/server/auth/session";
import { checkRateLimit } from "../../../../lib/server/rate-limit";
import { logEvent } from "../../../../lib/server/log";

type CheckoutItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

type CheckoutPayload = {
  items?: CheckoutItem[];
  shippingMethod?: "standard" | "express";
  promoCode?: string;
  email?: string;
  contact?: {
    firstName?: string;
    lastName?: string;
    phone?: string;
  };
  shippingAddress?: {
    streetAddress?: string;
    city?: string;
    state?: string;
    lga?: string;
    landmark?: string;
  };
};

function appBaseUrl(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin) return origin;

  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!host) return "http://localhost:3000";

  const protocol = request.headers.get("x-forwarded-proto") ?? "http";
  return `${protocol}://${host}`;
}

function createGuestId() {
  const id = Math.random().toString(36).slice(2);
  return `guest_${Date.now()}_${id}`;
}

function getIdempotencyFromHeaders(request: NextRequest) {
  const raw = request.headers.get("Idempotency-Key")?.trim();
  if (!raw) return null;
  return raw.slice(0, 128);
}

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      route: "/api/checkout/session",
      checks: ["rate-limit", "idempotency", "db-order-create"],
    },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  const user = await getUserFromRequest(request);
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const rate = checkRateLimit(`checkout:${ip}`, 20, 60_000);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Too many checkout attempts. Please retry shortly." },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSec) } }
    );
  }

  const idempotencyKey = getIdempotencyFromHeaders(request);

  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: "Missing PAYSTACK_SECRET_KEY. Add it to your environment to enable real payments." },
      { status: 503 }
    );
  }
  if (!/^sk_(test|live)_/.test(secretKey) || /your|xxxx|example|placeholder/i.test(secretKey)) {
    return NextResponse.json(
      { error: "PAYSTACK_SECRET_KEY appears invalid. Add your real Paystack test/live secret key and restart the server." },
      { status: 503 }
    );
  }

  let body: CheckoutPayload;
  let bodyRaw = "";
  try {
    bodyRaw = await request.text();
    body = JSON.parse(bodyRaw) as CheckoutPayload;
  } catch {
    return NextResponse.json({ error: "Invalid checkout payload." }, { status: 400 });
  }

  const requestHash = hashForIdempotency(bodyRaw);
  if (idempotencyKey) {
    const existing = await getIdempotencyRecord(idempotencyKey);
    if (existing) {
      if (existing.requestHash !== requestHash) {
        return NextResponse.json({ error: "Idempotency key conflict." }, { status: 409 });
      }
      return new NextResponse(existing.responseBody, {
        status: existing.statusCode,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  const items = body.items ?? [];
  const email = body.email?.trim();
  const firstName = body.contact?.firstName?.trim() ?? "";
  const lastName = body.contact?.lastName?.trim() ?? "";
  const phone = body.contact?.phone?.trim() ?? "";
  const streetAddress = body.shippingAddress?.streetAddress?.trim() ?? "";
  const city = body.shippingAddress?.city?.trim() ?? "";
  const state = body.shippingAddress?.state?.trim() ?? "";
  const lga = body.shippingAddress?.lga?.trim() ?? "";
  const landmark = body.shippingAddress?.landmark?.trim() ?? "";

  if (items.length === 0) {
    return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "A valid customer email is required for payment." }, { status: 400 });
  }
  if (!firstName || !lastName) {
    return NextResponse.json({ error: "First and last name are required." }, { status: 400 });
  }
  if (!/^(\+234|0)\d{10}$/.test(phone.replace(/\s+/g, ""))) {
    return NextResponse.json({ error: "Enter a valid Nigerian phone number." }, { status: 400 });
  }
  if (!streetAddress || !city || !state || !lga) {
    return NextResponse.json({ error: "Complete shipping address is required." }, { status: 400 });
  }

  const safeItems = items.filter(
    (item) =>
      typeof item?.id === "string" &&
      typeof item?.name === "string" &&
      item.name.trim().length > 0 &&
      Number.isFinite(item.price) &&
      item.price > 0 &&
      Number.isInteger(item.quantity) &&
      item.quantity > 0
  );

  if (safeItems.length === 0) {
    return NextResponse.json({ error: "No valid items were provided for checkout." }, { status: 400 });
  }

  let stockIssues: Array<{ id: string; requested: number; available: number }>;
  try {
    stockIssues = await validateStock(safeItems.map((item) => ({ id: item.id, quantity: item.quantity })));
  } catch (error) {
    logEvent("error", "checkout.session.stock_check_failed", {
      error: error instanceof Error ? error.message : "unknown",
      ip,
    });
    return NextResponse.json(
      { error: "Unable to validate stock at the moment. Please try again." },
      { status: 503 }
    );
  }
  if (stockIssues.length > 0) {
    const issue = stockIssues[0];
    return NextResponse.json(
      { error: `Insufficient stock for one or more items. Requested ${issue.requested}, available ${issue.available}.` },
      { status: 409 }
    );
  }

  const baseUrl = appBaseUrl(request);
  const shippingMethod = body.shippingMethod === "express" ? "express" : "standard";
  const subtotal = safeItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const normalizedPromoCode = body.promoCode?.trim().toUpperCase() ?? "";
  const hasWelcomeDiscount = normalizedPromoCode === "WELCOME10";
  const discountMultiplier = hasWelcomeDiscount ? 0.9 : 1;
  const shippingFee = shippingMethod === "express" ? 8000 : subtotal >= 50000 ? 0 : 3500;

  const lineItemsTotal = safeItems.reduce(
    (sum, item) => sum + Math.round(item.price * 100 * discountMultiplier) * item.quantity,
    0
  );
  const subtotalMinor = Math.round(subtotal * 100);
  const discountMinor = Math.max(0, subtotalMinor - lineItemsTotal);
  const shippingInMinor = Math.round(shippingFee * 100);
  const totalAmountInMinor = lineItemsTotal + shippingInMinor;

  const reference = `MYSHOP_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;
  const guestId = request.cookies.get("myshop_guest_id")?.value ?? createGuestId();

  const callbackUrl = `${baseUrl}/confirmation`;
  const metadata = {
    order_reference: reference,
    guest_id: guestId,
    customer_name: `${firstName} ${lastName}`.trim(),
    customer_phone: phone,
    shipping_method: shippingMethod,
    promo_code: normalizedPromoCode,
    cart_items: safeItems.map((item) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      unit_amount: Math.round(item.price * 100 * discountMultiplier),
    })),
  };

  try {
    await createPendingOrder({
      guestId,
      userId: user?.id ?? null,
      email,
      paystackReference: reference,
      shippingMethod,
      promoCode: normalizedPromoCode,
      subtotalMinor,
      shippingMinor: shippingInMinor,
      discountMinor,
      totalMinor: totalAmountInMinor,
      shippingAddress: JSON.stringify({
        firstName,
        lastName,
        phone,
        streetAddress,
        city,
        state,
        lga,
        landmark,
      }),
      items: safeItems.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        image: item.image,
        unitAmountMinor: Math.round(item.price * 100 * discountMultiplier),
      })),
    });
  } catch (error) {
    logEvent("error", "checkout.session.create_pending_order_failed", {
      error: error instanceof Error ? error.message : "unknown",
      reference,
      ip,
    });
    return NextResponse.json(
      { error: "Unable to create your order. Please retry." },
      { status: 503 }
    );
  }

  try {
    const paystackResponse = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: totalAmountInMinor,
        currency: "NGN",
        reference,
        callback_url: callbackUrl,
        metadata,
      }),
    });

    const paystackData = (await paystackResponse.json()) as {
      status?: boolean;
      message?: string;
      data?: { authorization_url?: string };
    };

    if (!paystackResponse.ok || !paystackData.status || !paystackData.data?.authorization_url) {
      await markOrderFailed(reference);
      const upstreamStatus =
        paystackResponse.status >= 400 && paystackResponse.status < 500 ? paystackResponse.status : 502;

      const failurePayload = JSON.stringify({
        error: paystackData.message ?? "Paystack failed to initialize the transaction.",
        paystackStatus: paystackResponse.status,
      });
      if (idempotencyKey) {
        await saveIdempotencyRecord({
          key: idempotencyKey,
          route: "/api/checkout/session",
          requestHash,
          responseBody: failurePayload,
          statusCode: upstreamStatus,
        });
      }
      return new NextResponse(failurePayload, {
        status: upstreamStatus,
        headers: { "Content-Type": "application/json" },
      });
    }

    const successPayload = JSON.stringify({ url: paystackData.data.authorization_url });
    if (idempotencyKey) {
      await saveIdempotencyRecord({
        key: idempotencyKey,
        route: "/api/checkout/session",
        requestHash,
        responseBody: successPayload,
        statusCode: 200,
      });
    }

    const response = new NextResponse(successPayload, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
    response.cookies.set("myshop_guest_id", guestId, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
    return response;
  } catch (error) {
    await markOrderFailed(reference);
    logEvent("error", "checkout.session.paystack_unreachable", {
      ip,
      reference,
      error: error instanceof Error ? error.message : "unknown",
    });

    const payload = JSON.stringify({ error: "Unable to reach Paystack API." });
    if (idempotencyKey) {
      await saveIdempotencyRecord({
        key: idempotencyKey,
        route: "/api/checkout/session",
        requestHash,
        responseBody: payload,
        statusCode: 502,
      });
    }
    return new NextResponse(payload, {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }
}
