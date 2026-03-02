import { NextRequest, NextResponse } from "next/server";
import { getOrdersByGuestId } from "../../../lib/server/commerce";

export async function GET(request: NextRequest) {
  const guestId = request.cookies.get("myshop_guest_id")?.value;
  if (!guestId) {
    return NextResponse.json({ orders: [] }, { status: 200 });
  }

  const orders = await getOrdersByGuestId(guestId);
  const payload = orders.map((order) => ({
    orderNumber: order.orderNumber,
    createdAt: order.createdAt.toISOString(),
    status: order.status,
    etaDays: order.shippingMethod === "express" ? "2-3" : "3-5",
    total: order.totalMinor / 100,
    items: order.items.map((item) => ({
      id: item.productId,
      name: item.name,
      quantity: item.quantity,
      price: item.unitAmountMinor / 100,
      image: item.image ?? undefined,
    })),
  }));

  return NextResponse.json({ orders: payload }, { status: 200 });
}
