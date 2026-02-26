"use client";

import React, { createContext, useContext } from "react";
import type { Product } from "../lib/products";

type WishlistContextValue = {
  wishlist: string[];
  addToWishlist: (p: Product) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
};

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);
const WISHLIST_STORAGE_KEY = "myshop_wishlist_v1";
const wishlistListeners = new Set<() => void>();
const EMPTY_WISHLIST: string[] = [];
let wishlistCache: string[] = EMPTY_WISHLIST;
let wishlistRawCache: string | null = null;

function readWishlistSnapshot(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (raw === wishlistRawCache) {
      return wishlistCache;
    }

    wishlistRawCache = raw;
    wishlistCache = raw ? (JSON.parse(raw) as string[]) : EMPTY_WISHLIST;
    return wishlistCache;
  } catch {
    wishlistRawCache = null;
    wishlistCache = EMPTY_WISHLIST;
    return EMPTY_WISHLIST;
  }
}

function getServerWishlistSnapshot(): string[] {
  return EMPTY_WISHLIST;
}

function writeWishlistSnapshot(next: string[]) {
  if (typeof window === "undefined") return;
  wishlistCache = next;
  wishlistRawCache = JSON.stringify(next);
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, wishlistRawCache);
  } catch {}
  wishlistListeners.forEach((listener) => listener());
}

function subscribeWishlist(listener: () => void) {
  wishlistListeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === WISHLIST_STORAGE_KEY) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    wishlistListeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const wishlist = React.useSyncExternalStore(
    subscribeWishlist,
    readWishlistSnapshot,
    getServerWishlistSnapshot
  );
  const setWishlist = React.useCallback((updater: (prev: string[]) => string[]) => {
    const current = readWishlistSnapshot();
    writeWishlistSnapshot(updater(current));
  }, []);

  const addToWishlist = (p: Product) => {
    setWishlist((prev) => (prev.includes(p.id) ? prev : [...prev, p.id]));
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((i) => i !== id));
  };

  const isInWishlist = (id: string) => wishlist.includes(id);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
