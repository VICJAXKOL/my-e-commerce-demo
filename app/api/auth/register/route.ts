import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/db";
import { hashPassword } from "../../../../lib/server/auth/crypto";
import { mergeGuestCartToUser } from "../../../../lib/server/commerce";
import { createSession, sessionCookieName } from "../../../../lib/server/auth/session";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { email?: string; password?: string };
  const email = body.email?.trim().toLowerCase() ?? "";
  const password = body.password ?? "";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Email is already registered." }, { status: 409 });
  }

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: hashPassword(password),
    },
  });

  const guestId = request.cookies.get("myshop_guest_id")?.value;
  if (guestId) {
    await mergeGuestCartToUser(guestId, user.id);
  }

  const { token, expiresAt } = await createSession(user.id);
  const response = NextResponse.json({
    user: { id: user.id, email: user.email },
  });
  response.cookies.set(sessionCookieName(), token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });
  return response;
}
