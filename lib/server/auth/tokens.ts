import { prisma } from "../../db";
import { createOpaqueToken, hashOpaqueToken } from "./crypto";

const TOKEN_TTL_MS = {
  email_verification: 1000 * 60 * 60 * 24,
  password_reset: 1000 * 60 * 30,
} as const;

type AuthTokenType = keyof typeof TOKEN_TTL_MS;

export async function issueAuthToken(userId: number, type: AuthTokenType) {
  const token = createOpaqueToken();
  const tokenHash = hashOpaqueToken(token);
  const expiresAt = new Date(Date.now() + TOKEN_TTL_MS[type]);

  await prisma.authToken.deleteMany({
    where: {
      userId,
      type,
      consumedAt: null,
    },
  });

  await prisma.authToken.create({
    data: {
      userId,
      type,
      tokenHash,
      expiresAt,
    },
  });

  return { token, expiresAt };
}

export async function consumeAuthToken(token: string, type: AuthTokenType) {
  const tokenHash = hashOpaqueToken(token);
  const record = await prisma.authToken.findUnique({
    where: { tokenHash },
    include: { user: true },
  });

  if (!record || record.type !== type) return null;
  if (record.consumedAt) return null;
  if (record.expiresAt.getTime() < Date.now()) return null;

  await prisma.authToken.update({
    where: { id: record.id },
    data: { consumedAt: new Date() },
  });

  return record;
}

export async function findUserByValidToken(token: string, type: AuthTokenType) {
  const tokenHash = hashOpaqueToken(token);
  const record = await prisma.authToken.findUnique({
    where: { tokenHash },
    include: { user: true },
  });

  if (!record || record.type !== type) return null;
  if (record.consumedAt) return null;
  if (record.expiresAt.getTime() < Date.now()) return null;
  return record.user;
}
