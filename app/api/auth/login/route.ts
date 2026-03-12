import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/db";
import { verifyPassword } from "../../../../lib/server/auth/crypto";
import { mergeGuestCartToUser } from "../../../../lib/server/commerce";
import { createSession, sessionCookieName } from "../../../../lib/server/auth/session";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { email?: string; password?: string };
  const email = body.email?.trim().toLowerCase() ?? "";
  const password = body.password ?? "";

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

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
