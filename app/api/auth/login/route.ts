import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/db";
import { verifyPassword } from "../../../../lib/server/auth/crypto";
import { mergeGuestCartToUser } from "../../../../lib/server/commerce";
import { createSession, setSessionCookie } from "../../../../lib/server/auth/session";
import { issueAuthToken } from "../../../../lib/server/auth/tokens";
import { sendVerificationEmail } from "../../../../lib/server/auth/mailer";

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

  if (!user.emailVerifiedAt) {
    const { token } = await issueAuthToken(user.id, "email_verification");
    const mail = await sendVerificationEmail(user.email, token);
    return NextResponse.json(
      {
        error: "Please verify your email before signing in.",
        requiresVerification: true,
        previewUrl: mail.previewUrl,
      },
      { status: 403 }
    );
  }

  const guestId = request.cookies.get("myshop_guest_id")?.value;
  if (guestId) {
    await mergeGuestCartToUser(guestId, user.id);
  }

  const { token, expiresAt } = await createSession(user.id);
  const response = NextResponse.json({
    user: { id: user.id, email: user.email, emailVerifiedAt: user.emailVerifiedAt },
  });
  setSessionCookie(response, token, expiresAt);
  return response;
}
