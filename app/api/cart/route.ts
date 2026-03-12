import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/db";
import { getUserFromRequest } from "../../../lib/server/auth/session";
import { products } from "../../../lib/products";

type CartItemInput = {
  id?: string;
  quantity?: number;
};

type NormalizedItem = {
  productId: string;
  name: string;
  unitAmountMinor: number;
  quantity: number;
  image: string | null;
};

function createGuestId() {
  const id = Math.random().toString(36).slice(2);
  return `guest_${Date.now()}_${id}`;
}

function getGuestId(request: NextRequest) {
  const existing = request.cookies.get("myshop_guest_id")?.value;
  if (existing) return { guestId: existing, isNew: false };
  return { guestId: createGuestId(), isNew: true };
}

function normalizeItems(items: CartItemInput[]): NormalizedItem[] {
  const map = new Map<string, NormalizedItem>();
  for (const item of items) {
    if (!item?.id || typeof item.id !== "string") continue;
    const product = products.find((p) => p.id === item.id);
    if (!product) continue;
    const qty = Math.max(1, Math.floor(Number(item.quantity ?? 0)));
    if (!Number.isFinite(qty) || qty <= 0) continue;
    const existing = map.get(product.id);
    const nextQty = (existing?.quantity ?? 0) + qty;
    map.set(product.id, {
      productId: product.id,
      name: product.name,
      unitAmountMinor: Math.round(product.price * 100),
      quantity: nextQty,
      image: product.image ?? null,
    });
  }
  return Array.from(map.values());
}

function toResponseItems(items: Array<{ productId: string; name: string; unitAmountMinor: number; quantity: number; image: string | null }>) {
  return items.map((item) => ({
    id: item.productId,
    name: item.name,
    price: item.unitAmountMinor / 100,
    quantity: item.quantity,
    image: item.image ?? undefined,
  }));
}

async function getCart(userId: number | null, guestId: string) {
  if (userId) {
    return prisma.cart.findUnique({ where: { userId }, include: { items: true } });
  }
  return prisma.cart.findUnique({ where: { guestId }, include: { items: true } });
}

function withGuestCookie(response: NextResponse, guestId: string, isNew: boolean) {
  if (!isNew) return response;
  response.cookies.set("myshop_guest_id", guestId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return response;
}

export async function GET(request: NextRequest) {
  const user = await getUserFromRequest(request);
  const { guestId, isNew } = getGuestId(request);
  const cart = await getCart(user?.id ?? null, guestId);
  const items = cart ? toResponseItems(cart.items) : [];
  const response = NextResponse.json({ items }, { status: 200 });
  return withGuestCookie(response, guestId, isNew && !user);
}

export async function PUT(request: NextRequest) {
  const user = await getUserFromRequest(request);
  const { guestId, isNew } = getGuestId(request);
  const body = (await request.json()) as { items?: CartItemInput[] };
  const normalized = normalizeItems(body.items ?? []);

  let cart = await getCart(user?.id ?? null, guestId);
  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        guestId: user ? null : guestId,
        userId: user?.id ?? null,
      },
      include: { items: true },
    });
  }

  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  if (normalized.length > 0) {
    await prisma.cartItem.createMany({
      data: normalized.map((item) => ({
        cartId: cart!.id,
        productId: item.productId,
        name: item.name,
        unitAmountMinor: item.unitAmountMinor,
        quantity: item.quantity,
        image: item.image,
      })),
    });
  }

  const updated = await prisma.cart.findUnique({ where: { id: cart.id }, include: { items: true } });
  const response = NextResponse.json({ items: toResponseItems(updated?.items ?? []) }, { status: 200 });
  return withGuestCookie(response, guestId, isNew && !user);
}

export async function DELETE(request: NextRequest) {
  const user = await getUserFromRequest(request);
  const { guestId, isNew } = getGuestId(request);
  const cart = await getCart(user?.id ?? null, guestId);
  if (cart) {
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  }
  const response = NextResponse.json({ items: [] }, { status: 200 });
  return withGuestCookie(response, guestId, isNew && !user);
}
