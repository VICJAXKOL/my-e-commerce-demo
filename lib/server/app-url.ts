export function getAppUrl() {
  const explicit =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.APP_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL;

  if (!explicit) return "http://localhost:3000";
  if (explicit.startsWith("http://") || explicit.startsWith("https://")) return explicit;
  return `https://${explicit}`;
}
