import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/db";

function authorized(request: NextRequest) {
  const token = request.headers.get("x-admin-key");
  return !!process.env.ADMIN_API_KEY && token === process.env.ADMIN_API_KEY;
}

export async function GET(request: NextRequest) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [users, orders, carts, cartItems] = await Promise.all([
    prisma.user.count(),
    prisma.order.count(),
    prisma.cart.count(),
    prisma.cartItem.count(),
  ]);

  return NextResponse.json(
    {
      ok: true,
      counts: {
        users,
        orders,
        carts,
        cartItems,
      },
    },
    { status: 200 }
  );
}
