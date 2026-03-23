import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/db";
import { hashPassword } from "../../../../lib/server/auth/crypto";
import { issueAuthToken } from "../../../../lib/server/auth/tokens";
import { sendVerificationEmail } from "../../../../lib/server/auth/mailer";

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

  const { token } = await issueAuthToken(user.id, "email_verification");
  const mail = await sendVerificationEmail(user.email, token);

  return NextResponse.json(
    {
      ok: true,
      requiresVerification: true,
      previewUrl: mail.previewUrl,
      user: { id: user.id, email: user.email, emailVerifiedAt: null },
    },
    { status: 201 }
  );
}
