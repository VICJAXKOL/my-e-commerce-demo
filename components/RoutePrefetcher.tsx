"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ROUTES_TO_PREFETCH = [
  "/products",
  "/categories",
  "/cart",
  "/wishlist",
  "/orders",
  "/faq",
  "/contact",
  "/about",
];

export default function RoutePrefetcher() {
  const router = useRouter();

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;

    const timeoutId = window.setTimeout(() => {
      for (const route of ROUTES_TO_PREFETCH) {
        router.prefetch(route);
      }
    }, 500);

    return () => window.clearTimeout(timeoutId);
  }, [router]);

  return null;
}
