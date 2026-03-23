import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/db";
import { sendPasswordResetEmail } from "../../../../lib/server/auth/mailer";
import { issueAuthToken } from "../../../../lib/server/auth/tokens";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { email?: string };
  const email = body.email?.trim().toLowerCase() ?? "";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({
      ok: true,
      message: "If an account exists for that email, a password reset link has been sent.",
    });
  }

  const { token } = await issueAuthToken(user.id, "password_reset");
  const mail = await sendPasswordResetEmail(user.email, token);

  return NextResponse.json({
    ok: true,
    message: "If an account exists for that email, a password reset link has been sent.",
    previewUrl: mail.previewUrl,
  });
}
