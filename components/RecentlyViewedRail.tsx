"use client";

import Link from "next/link";
import React from "react";
import { formatNgn } from "../lib/currency";
import { getProductById } from "../lib/products";

const STORAGE_KEY = "myshop_recently_viewed_v1";
const LIMIT = 6;
const listeners = new Set<() => void>();
let cache: string[] = [];
let rawCache: string | null = null;

function readSnapshot(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === rawCache) return cache;
    rawCache = raw;
    cache = raw ? (JSON.parse(raw) as string[]) : [];
    return cache;
  } catch {
    rawCache = null;
    cache = [];
    return [];
  }
}

function writeSnapshot(next: string[]) {
  if (typeof window === "undefined") return;
  cache = next;
  rawCache = JSON.stringify(next);
  try {
    localStorage.setItem(STORAGE_KEY, rawCache);
  } catch {}
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function RecentlyViewedRail({ currentId }: { currentId: string }) {
  const ids = React.useSyncExternalStore(subscribe, readSnapshot, () => []);

  React.useEffect(() => {
    const next = [currentId, ...readSnapshot().filter((id) => id !== currentId)].slice(0, LIMIT);
    writeSnapshot(next);
  }, [currentId]);

  const products = ids
    .filter((id) => id !== currentId)
    .map((id) => getProductById(id))
    .filter((product): product is NonNullable<ReturnType<typeof getProductById>> => Boolean(product))
    .slice(0, 4);

  if (products.length === 0) return null;

  return (
    <section className="surface-card mt-8 p-5 sm:p-6">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-600)]">Keep browsing</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">Recently viewed</h2>
          <p className="mt-2 text-sm leading-6 text-muted">Jump back into items you checked earlier without searching again.</p>
        </div>
        <Link href="/products" className="btn-ghost focus-ring w-fit px-3 py-2 text-sm font-semibold text-[var(--brand-600)]">
          Browse all
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="surface-soft p-4 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{product.category}</p>
            <p className="mt-2 line-clamp-2 text-base font-semibold tracking-tight text-zinc-900 dark:text-white">{product.name}</p>
            <p className="mt-4 text-sm font-semibold text-zinc-900 dark:text-white">{formatNgn(product.price)}</p>
            <p className="mt-2 text-sm text-[var(--brand-600)]">View product →</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
