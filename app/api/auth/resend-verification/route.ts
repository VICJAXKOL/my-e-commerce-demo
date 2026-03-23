import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/db";
import { issueAuthToken } from "../../../../lib/server/auth/tokens";
import { sendVerificationEmail } from "../../../../lib/server/auth/mailer";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { email?: string };
  const email = body.email?.trim().toLowerCase() ?? "";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.emailVerifiedAt) {
    return NextResponse.json({ ok: true });
  }

  const { token } = await issueAuthToken(user.id, "email_verification");
  const mail = await sendVerificationEmail(user.email, token);

  return NextResponse.json({ ok: true, previewUrl: mail.previewUrl });
}
