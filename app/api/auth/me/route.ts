import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "../../../../lib/server/auth/session";

export async function GET(request: NextRequest) {
  const user = await getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ user: null }, { status: 200 });
  }
  return NextResponse.json(
    { user: { id: user.id, email: user.email, emailVerifiedAt: user.emailVerifiedAt } },
    { status: 200 }
  );
}
