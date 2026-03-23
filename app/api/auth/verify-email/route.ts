import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/db";
import { mergeGuestCartToUser } from "../../../../lib/server/commerce";
import { consumeAuthToken } from "../../../../lib/server/auth/tokens";
import { createSession, setSessionCookie } from "../../../../lib/server/auth/session";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { token?: string };
  const token = body.token?.trim() ?? "";

  if (!token) {
    return NextResponse.json({ error: "Verification token is required." }, { status: 400 });
  }

  const record = await consumeAuthToken(token, "email_verification");
  if (!record) {
    return NextResponse.json({ error: "This verification link is invalid or has expired." }, { status: 400 });
  }

  const user = record.user.emailVerifiedAt
    ? record.user
    : await prisma.user.update({
        where: { id: record.userId },
        data: { emailVerifiedAt: new Date() },
      });

  await prisma.authToken.deleteMany({
    where: {
      userId: user.id,
      type: "email_verification",
    },
  });

  const guestId = request.cookies.get("myshop_guest_id")?.value;
  if (guestId) {
    await mergeGuestCartToUser(guestId, user.id);
  }

  const session = await createSession(user.id);
  const response = NextResponse.json({
    ok: true,
    user: { id: user.id, email: user.email, emailVerifiedAt: user.emailVerifiedAt },
  });
  setSessionCookie(response, session.token, session.expiresAt);
  return response;
}
