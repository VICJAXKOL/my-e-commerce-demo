"use client";

type OrderStatus = "confirmed" | "packed" | "shipped" | "out_for_delivery" | "delivered";

export type StoredOrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

export type StoredOrder = {
  orderNumber: string;
  createdAt: string;
  total: number;
  etaDays: string;
  status: OrderStatus;
  items: StoredOrderItem[];
};

const STORAGE_KEY = "myshop_orders_v1";
const listeners = new Set<() => void>();
const EMPTY_ORDERS: StoredOrder[] = [];
let cache: StoredOrder[] = EMPTY_ORDERS;
let rawCache: string | null = null;

export function readOrdersSnapshot(): StoredOrder[] {
  if (typeof window === "undefined") return EMPTY_ORDERS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === rawCache) return cache;
    rawCache = raw;
    cache = raw ? (JSON.parse(raw) as StoredOrder[]) : EMPTY_ORDERS;
    return cache;
  } catch {
    rawCache = null;
    cache = EMPTY_ORDERS;
    return EMPTY_ORDERS;
  }
}

export function getServerOrdersSnapshot(): StoredOrder[] {
  return EMPTY_ORDERS;
}

function writeOrdersSnapshot(next: StoredOrder[]) {
  if (typeof window === "undefined") return;
  cache = next;
  rawCache = JSON.stringify(next);
  try {
    localStorage.setItem(STORAGE_KEY, rawCache);
  } catch {}
  listeners.forEach((listener) => listener());
}

export function saveOrder(order: StoredOrder) {
  const current = readOrdersSnapshot();
  writeOrdersSnapshot([order, ...current.filter((o) => o.orderNumber !== order.orderNumber)].slice(0, 20));
}

export function subscribeOrders(listener: () => void) {
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

