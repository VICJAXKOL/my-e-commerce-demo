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
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) listener();
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
    .filter((p): p is NonNullable<ReturnType<typeof getProductById>> => Boolean(p))
    .slice(0, 4);

  if (products.length === 0) return null;

  return (
    <section className="mt-8">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-900">Recently Viewed</h2>
        <Link href="/products" className="text-sm text-zinc-600 hover:text-zinc-900">
          Browse all
        </Link>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/products/${p.id}`}
            className="rounded-xl border border-zinc-200 bg-white p-3 transition hover:border-zinc-300 hover:shadow-sm"
          >
            <p className="line-clamp-1 text-sm font-semibold text-zinc-900">{p.name}</p>
            <p className="mt-1 text-xs text-zinc-500">{p.category}</p>
            <p className="mt-2 text-sm font-medium text-zinc-800">{formatNgn(p.price)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
