import { createHmac, randomBytes, timingSafeEqual } from "crypto";

const HASH_SECRET = process.env.AUTH_HASH_SECRET || "dev-auth-secret-change-me";

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const digest = createHmac("sha256", HASH_SECRET).update(`${salt}:${password}`).digest("hex");
  return `${salt}:${digest}`;
}

export function verifyPassword(password: string, stored: string) {
  const [salt, digest] = stored.split(":");
  if (!salt || !digest) return false;
  const current = createHmac("sha256", HASH_SECRET).update(`${salt}:${password}`).digest("hex");
  const a = Buffer.from(digest, "hex");
  const b = Buffer.from(current, "hex");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function createSessionToken() {
  return randomBytes(32).toString("hex");
}

export function hashSessionToken(token: string) {
  return createHmac("sha256", HASH_SECRET).update(`session:${token}`).digest("hex");
}

export function createOpaqueToken() {
  return randomBytes(32).toString("hex");
}

export function hashOpaqueToken(token: string) {
  return createHmac("sha256", HASH_SECRET).update(`auth:${token}`).digest("hex");
}
