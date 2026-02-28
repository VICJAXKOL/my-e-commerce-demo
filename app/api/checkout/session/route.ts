import { NextResponse } from "next/server";

type CheckoutItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type CheckoutPayload = {
  items?: CheckoutItem[];
  shippingMethod?: "standard" | "express";
  promoCode?: string;
  email?: string;
};

function appBaseUrl(request: Request) {
  const origin = request.headers.get("origin");
  if (origin) return origin;

  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!host) return "http://localhost:3000";

  const protocol = request.headers.get("x-forwarded-proto") ?? "http";
  return `${protocol}://${host}`;
}

export async function GET() {
  return NextResponse.json({ ok: true, route: "/api/checkout/session" });
}

export async function POST(request: Request) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: "Missing PAYSTACK_SECRET_KEY. Add it to your environment to enable real payments." },
      { status: 503 }
    );
  }
  if (
    !/^sk_(test|live)_/.test(secretKey) ||
    /your|xxxx|example|placeholder/i.test(secretKey)
  ) {
    return NextResponse.json(
      { error: "PAYSTACK_SECRET_KEY appears invalid. Add your real Paystack test/live secret key and restart the server." },
      { status: 503 }
    );
  }

  let body: CheckoutPayload;
  try {
    body = (await request.json()) as CheckoutPayload;
  } catch {
    return NextResponse.json({ error: "Invalid checkout payload." }, { status: 400 });
  }

  const items = body.items ?? [];
  const email = body.email?.trim();
  if (items.length === 0) {
    return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "A valid customer email is required for payment." }, { status: 400 });
  }

  const safeItems = items.filter(
    (item) =>
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
  const shippingInMinor = Math.round(shippingFee * 100);
  const totalAmountInMinor = lineItemsTotal + shippingInMinor;
  const reference = `MYSHOP_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;

  const callbackUrl = `${baseUrl}/confirmation`;
  const metadata = {
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
      const upstreamStatus =
        paystackResponse.status >= 400 && paystackResponse.status < 500
          ? paystackResponse.status
          : 502;
      return NextResponse.json(
        {
          error: paystackData.message ?? "Paystack failed to initialize the transaction.",
          paystackStatus: paystackResponse.status,
        },
        { status: upstreamStatus }
      );
    }

    return NextResponse.json({ url: paystackData.data.authorization_url });
  } catch {
    return NextResponse.json({ error: "Unable to reach Paystack API." }, { status: 502 });
  }
}
