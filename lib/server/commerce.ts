import { createHash } from "crypto";
import { prisma } from "../db";
import { products } from "../products";

type PendingOrderItemInput = {
  id: string;
  name: string;
  quantity: number;
  unitAmountMinor: number;
  image?: string;
};

type CreatePendingOrderInput = {
  guestId: string;
  userId?: number | null;
  email: string;
  paystackReference: string;
  shippingMethod: string;
  promoCode?: string;
  subtotalMinor: number;
  shippingMinor: number;
  discountMinor: number;
  totalMinor: number;
  shippingAddress?: string;
  items: PendingOrderItemInput[];
};

const ORDER_STATUS = {
  pending: "pending",
  paid: "paid",
  failed: "failed",
} as const;

function makeOrderNumber(reference: string) {
  return `PAY-${reference.slice(-8).toUpperCase()}`;
}

export async function ensureProductStockSeeded() {
  const count = await prisma.productStock.count();
  if (count > 0) return;
  for (const product of products) {
    await prisma.productStock.upsert({
      where: { productId: product.id },
      create: {
        productId: product.id,
        quantity: product.stock,
      },
      update: {},
    });
  }
}

export async function validateStock(items: Array<{ id: string; quantity: number }>) {
  await ensureProductStockSeeded();
  const productIds = Array.from(new Set(items.map((item) => item.id)));
  const stocks: Array<{ productId: string; quantity: number }> =
    await prisma.productStock.findMany({
      where: { productId: { in: productIds } },
    });
  const stockMap = new Map<string, number>(
    stocks.map((s): [string, number] => [s.productId, s.quantity])
  );

  return items
    .map((item) => ({
      id: item.id,
      requested: item.quantity,
      available: stockMap.get(item.id) ?? 0,
    }))
    .filter((row) => row.requested > row.available);
}

export async function createPendingOrder(input: CreatePendingOrderInput) {
  return prisma.order.create({
    data: {
      orderNumber: makeOrderNumber(input.paystackReference),
      paystackReference: input.paystackReference,
      guestId: input.guestId,
      userId: input.userId ?? null,
      email: input.email,
      status: ORDER_STATUS.pending,
      shippingMethod: input.shippingMethod,
      promoCode: input.promoCode?.trim() || null,
      subtotalMinor: input.subtotalMinor,
      shippingMinor: input.shippingMinor,
      discountMinor: input.discountMinor,
      totalMinor: input.totalMinor,
      shippingAddress: input.shippingAddress ?? null,
      items: {
        create: input.items.map((item) => ({
          productId: item.id,
          name: item.name,
          quantity: item.quantity,
          unitAmountMinor: item.unitAmountMinor,
          image: item.image ?? null,
        })),
      },
    },
    include: { items: true },
  });
}

export async function markOrderFailed(reference: string) {
  return prisma.order.updateMany({
    where: { paystackReference: reference, status: ORDER_STATUS.pending },
    data: { status: ORDER_STATUS.failed },
  });
}

export async function markOrderPaid(reference: string) {
  await ensureProductStockSeeded();
  return prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: { paystackReference: reference },
      include: { items: true },
    });
    if (!order) return null;
    if (order.status === ORDER_STATUS.paid) return order;

    for (const item of order.items) {
      await tx.productStock.updateMany({
        where: {
          productId: item.productId,
          quantity: { gte: item.quantity },
        },
        data: {
          quantity: { decrement: item.quantity },
        },
      });
    }

    return tx.order.update({
      where: { id: order.id },
      data: { status: ORDER_STATUS.paid, paidAt: new Date() },
      include: { items: true },
    });
  });
}

export async function getOrderByReference(reference: string) {
  return prisma.order.findUnique({
    where: { paystackReference: reference },
    include: { items: true },
  });
}

export async function getOrdersByGuestId(guestId: string) {
  return prisma.order.findMany({
    where: { guestId },
    orderBy: { createdAt: "desc" },
    include: { items: true },
    take: 20,
  });
}

export async function getOrdersByUserId(userId: number) {
  return prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { items: true },
    take: 20,
  });
}

export async function recordPaymentEvent(input: {
  provider: string;
  providerEventId?: string;
  eventType: string;
  paystackReference?: string;
  signature?: string;
  payload: unknown;
}) {
  const payloadRaw = JSON.stringify(input.payload);
  try {
    return await prisma.paymentEvent.create({
      data: {
        provider: input.provider,
        providerEventId: input.providerEventId ?? null,
        eventType: input.eventType,
        paystackReference: input.paystackReference ?? null,
        signature: input.signature ?? null,
        payload: payloadRaw,
      },
    });
  } catch {
    return null;
  }
}

export function hashForIdempotency(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export async function getIdempotencyRecord(key: string) {
  return prisma.idempotencyRecord.findUnique({ where: { key } });
}

export async function saveIdempotencyRecord(input: {
  key: string;
  route: string;
  requestHash: string;
  responseBody: string;
  statusCode: number;
}) {
  return prisma.idempotencyRecord.upsert({
    where: { key: input.key },
    create: input,
    update: input,
  });
}
