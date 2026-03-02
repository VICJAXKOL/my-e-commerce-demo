import { createHmac, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { markOrderFailed, markOrderPaid, recordPaymentEvent } from "../../../../lib/server/commerce";
import { logEvent } from "../../../../lib/server/log";

type PaystackWebhookPayload = {
  event?: string;
  data?: {
    id?: number;
    reference?: string;
    status?: string;
  };
};

function verifySignature(body: string, signature: string, secret: string) {
  const digest = createHmac("sha512", secret).update(body).digest("hex");
  const digestBuffer = Buffer.from(digest, "utf8");
  const signatureBuffer = Buffer.from(signature, "utf8");
  if (digestBuffer.length !== signatureBuffer.length) return false;
  return timingSafeEqual(digestBuffer, signatureBuffer);
}

export async function POST(request: NextRequest) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  const signature = request.headers.get("x-paystack-signature") ?? "";
  if (!secret || !signature) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bodyRaw = await request.text();
  if (!verifySignature(bodyRaw, signature, secret)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: PaystackWebhookPayload;
  try {
    payload = JSON.parse(bodyRaw) as PaystackWebhookPayload;
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const eventType = payload.event ?? "unknown";
  const reference = payload.data?.reference;
  const providerEventId = payload.data?.id != null ? String(payload.data.id) : undefined;

  await recordPaymentEvent({
    provider: "paystack",
    providerEventId,
    eventType,
    paystackReference: reference,
    signature,
    payload,
  });

  if (!reference) {
    return NextResponse.json({ received: true, skipped: true }, { status: 200 });
  }

  if (eventType === "charge.success" || payload.data?.status === "success") {
    await markOrderPaid(reference);
    logEvent("info", "webhook.paystack.charge_success", { reference, providerEventId });
    return NextResponse.json({ received: true, status: "paid" }, { status: 200 });
  }

  if (eventType === "charge.failed" || payload.data?.status === "failed") {
    await markOrderFailed(reference);
    logEvent("warn", "webhook.paystack.charge_failed", { reference, providerEventId });
    return NextResponse.json({ received: true, status: "failed" }, { status: 200 });
  }

  return NextResponse.json({ received: true, status: "ignored" }, { status: 200 });
}
