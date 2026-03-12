"use client";

import React from "react";
import type { Product } from "../lib/products";

type CartItem = Product & { quantity: number };

type CartContextValue = {
  items: CartItem[];
  addToCart: (product: Product, qty?: number) => void;
  updateQuantity: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

const CartContext = React.createContext<CartContextValue | undefined>(undefined);
const CART_STORAGE_KEY = "myshop_cart_v1";
const cartListeners = new Set<() => void>();
const EMPTY_CART: CartItem[] = [];
let cartCache: CartItem[] = EMPTY_CART;
let cartRawCache: string | null = null;

function readCartSnapshot(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (raw === cartRawCache) {
      return cartCache;
    }

    cartRawCache = raw;
    cartCache = raw ? (JSON.parse(raw) as CartItem[]) : EMPTY_CART;
    return cartCache;
  } catch {
    cartRawCache = null;
    cartCache = EMPTY_CART;
    return EMPTY_CART;
  }
}

function getServerCartSnapshot(): CartItem[] {
  return EMPTY_CART;
}

function writeCartSnapshot(next: CartItem[]) {
  if (typeof window === "undefined") return;
  const nextRaw = JSON.stringify(next);
  if (nextRaw === cartRawCache) return;

  cartCache = next;
  cartRawCache = nextRaw;
  try {
    localStorage.setItem(CART_STORAGE_KEY, cartRawCache);
  } catch {}
  cartListeners.forEach((listener) => listener());
}

function subscribeCart(listener: () => void) {
  cartListeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === CART_STORAGE_KEY) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    cartListeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = React.useSyncExternalStore(subscribeCart, readCartSnapshot, getServerCartSnapshot);
  const hydratedRef = React.useRef(false);

  const fetchServerCart = React.useCallback(async () => {
    try {
      const response = await fetch("/api/cart", { cache: "no-store" });
      if (!response.ok) return EMPTY_CART;
      const data = (await response.json()) as { items?: CartItem[] };
      return Array.isArray(data.items) ? data.items : EMPTY_CART;
    } catch {
      return EMPTY_CART;
    }
  }, []);

  const persistServerCart = React.useCallback(async (nextItems: CartItem[]) => {
    try {
      await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: nextItems.map((item) => ({ id: item.id, quantity: item.quantity })),
        }),
      });
    } catch {}
  }, []);
  const setItems = React.useCallback((updater: (prev: CartItem[]) => CartItem[]) => {
    const current = readCartSnapshot();
    writeCartSnapshot(updater(current));
  }, []);

  const addToCart = React.useCallback((product: Product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
  }, [setItems]);

  const updateQuantity = React.useCallback((id: string, qty: number) => {
    const nextQty = Math.max(1, qty);
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: nextQty } : i)));
  }, [setItems]);

  const removeFromCart = React.useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, [setItems]);

  const clearCart = React.useCallback(() => {
    writeCartSnapshot(EMPTY_CART);
  }, []);

  React.useEffect(() => {
    let active = true;
    const load = async () => {
      const localItems = readCartSnapshot();
      const serverItems = await fetchServerCart();
      if (!active) return;
      if (serverItems.length > 0) {
        writeCartSnapshot(serverItems);
      } else if (localItems.length > 0) {
        await persistServerCart(localItems);
      }
    };
    void load().finally(() => {
      if (active) hydratedRef.current = true;
    });
    return () => {
      active = false;
    };
  }, [fetchServerCart, persistServerCart]);

  React.useEffect(() => {
    if (!hydratedRef.current) return;
    const timeoutId = window.setTimeout(() => {
      void persistServerCart(items);
    }, 300);
    return () => window.clearTimeout(timeoutId);
  }, [items, persistServerCart]);

  const value = React.useMemo<CartContextValue>(
    () => ({
      items,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    }),
    [items, addToCart, updateQuantity, removeFromCart, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
