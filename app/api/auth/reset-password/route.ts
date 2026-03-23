import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/db";
import { hashPassword } from "../../../../lib/server/auth/crypto";
import { consumeAuthToken } from "../../../../lib/server/auth/tokens";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { token?: string; password?: string };
  const token = body.token?.trim() ?? "";
  const password = body.password ?? "";

  if (!token) {
    return NextResponse.json({ error: "Reset token is required." }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  }

  const record = await consumeAuthToken(token, "password_reset");
  if (!record) {
    return NextResponse.json({ error: "This password reset link is invalid or has expired." }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: record.userId },
    data: { passwordHash: hashPassword(password) },
  });

  await prisma.authSession.deleteMany({ where: { userId: record.userId } });
  await prisma.authToken.deleteMany({
    where: {
      userId: record.userId,
      type: "password_reset",
    },
  });

  return NextResponse.json({ ok: true });
}
