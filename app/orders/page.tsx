"use client";

import Link from "next/link";
import React from "react";
import { formatNgn } from "../../lib/currency";

type ApiOrder = {
  orderNumber: string;
  createdAt: string;
  status: "pending" | "paid" | "failed" | "canceled";
  etaDays: string;
  total: number;
  items: Array<{ id: string; name: string; quantity: number }>;
};

const STATUS_LABELS: Record<ApiOrder["status"], string> = {
  pending: "Payment Pending",
  paid: "Paid",
  failed: "Payment Failed",
  canceled: "Canceled",
};

export default function OrdersPage() {
  const [orders, setOrders] = React.useState<ApiOrder[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const response = await fetch("/api/orders", { cache: "no-store" });
        const data = (await response.json()) as { orders?: ApiOrder[] };
        if (active) setOrders(data.orders ?? []);
      } finally {
        if (active) setLoading(false);
      }
    };
    void load();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="mx-auto max-w-5xl pt-20">
      <section className="mb-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-8 text-white shadow-lg">
        <p className="text-xs uppercase tracking-widest text-sky-300">Order Center</p>
        <h1 className="mt-2 text-3xl font-semibold">Your Orders</h1>
        <p className="mt-2 text-sm text-slate-300">
          Review recent purchases, payment status, and delivery timelines.
        </p>
      </section>

      {loading ? (
        <section className="surface-card rounded-2xl p-8 text-center">
          <p className="text-sm text-zinc-600">Loading orders...</p>
        </section>
      ) : orders.length === 0 ? (
        <section className="surface-card rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-zinc-900">No orders yet</h2>
          <p className="mt-2 text-sm text-zinc-600">When you place your first order, it will show up here.</p>
          <Link href="/products" className="btn-primary mt-5 inline-flex px-5 py-2.5 text-sm font-semibold">
            Start Shopping
          </Link>
        </section>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <article key={order.orderNumber} className="surface-card rounded-2xl p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-zinc-500">Order Number</p>
                  <p className="font-semibold text-zinc-900">{order.orderNumber}</p>
                </div>
                <div className="text-sm text-zinc-700">
                  <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs font-semibold">
                    {STATUS_LABELS[order.status]}
                  </span>
                </div>
              </div>

              <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                <div>
                  <p className="text-zinc-500">Items</p>
                  <p className="font-medium text-zinc-900">
                    {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                  </p>
                </div>
                <div>
                  <p className="text-zinc-500">Total</p>
                  <p className="font-medium text-zinc-900">{formatNgn(order.total)}</p>
                </div>
                <div>
                  <p className="text-zinc-500">Estimated Delivery</p>
                  <p className="font-medium text-zinc-900">{order.etaDays} business days</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href={`/track?order=${encodeURIComponent(order.orderNumber)}`}
                  className="btn-primary rounded-md px-4 py-2 text-sm font-semibold"
                >
                  Track Order
                </Link>
                <Link href="/products" className="btn-outline rounded-md px-4 py-2 text-sm">
                  Buy Again
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
