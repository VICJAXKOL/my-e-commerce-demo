import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/db";

function authorized(request: NextRequest) {
  const token = request.headers.get("x-admin-key");
  return !!process.env.ADMIN_API_KEY && token === process.env.ADMIN_API_KEY;
}

export async function GET(request: NextRequest) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [users, orders] = await Promise.all([
    prisma.user.findMany({
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
    prisma.order.findMany({
      select: {
        id: true,
        orderNumber: true,
        status: true,
        totalMinor: true,
        createdAt: true,
        userId: true,
        guestId: true,
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
  ]);

  return NextResponse.json(
    {
      ok: true,
      users,
      orders: orders.map((order) => ({
        ...order,
        total: order.totalMinor / 100,
      })),
    },
    { status: 200 }
  );
}
