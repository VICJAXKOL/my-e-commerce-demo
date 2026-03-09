import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/db";
import { ensureProductStockSeeded } from "../../../../lib/server/commerce";

function authorized(request: NextRequest) {
  const token = request.headers.get("x-admin-key");
  return !!process.env.ADMIN_API_KEY && token === process.env.ADMIN_API_KEY;
}

export async function GET(request: NextRequest) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await ensureProductStockSeeded();
  const stock = await prisma.productStock.findMany({ orderBy: { productId: "asc" } });
  return NextResponse.json({ stock }, { status: 200 });
}

export async function PATCH(request: NextRequest) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = (await request.json()) as { productId?: string; quantity?: number };
  const productId = typeof body.productId === "string" ? body.productId : "";
  const quantity = body.quantity;
  if (!productId || typeof quantity !== "number" || !Number.isInteger(quantity) || quantity < 0) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const updated = await prisma.productStock.upsert({
    where: { productId },
    create: { productId, quantity },
    update: { quantity },
  });
  return NextResponse.json({ stock: updated }, { status: 200 });
}
