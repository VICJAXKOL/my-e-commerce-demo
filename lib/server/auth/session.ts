import { NextRequest } from "next/server";
import { prisma } from "../../db";
import { createSessionToken, hashSessionToken } from "./crypto";

const SESSION_COOKIE = "myshop_session";

export function sessionCookieName() {
  return SESSION_COOKIE;
}

export async function createSession(userId: number) {
  const token = createSessionToken();
  const tokenHash = hashSessionToken(token);
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
  await prisma.authSession.create({
    data: {
      userId,
      tokenHash,
      expiresAt,
    },
  });
  return { token, expiresAt };
}

export async function getUserFromRequest(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const tokenHash = hashSessionToken(token);
  const session = await prisma.authSession.findUnique({
    where: { tokenHash },
    include: { user: true },
  });
  if (!session) return null;
  if (session.expiresAt.getTime() < Date.now()) {
    await prisma.authSession.delete({ where: { tokenHash } }).catch(() => null);
    return null;
  }
  return session.user;
}

export async function deleteSession(token: string) {
  const tokenHash = hashSessionToken(token);
  await prisma.authSession.deleteMany({ where: { tokenHash } });
}
