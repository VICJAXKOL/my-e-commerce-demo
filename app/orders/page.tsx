"use client";

import Link from "next/link";
import React from "react";
import { formatNgn } from "../../lib/currency";
import PageIntro from "../../components/PageIntro";

type ApiOrder = {
  orderNumber: string;
  createdAt: string;
  status: "pending" | "paid" | "failed" | "canceled";
  etaDays: string;
  total: number;
  items: Array<{ id: string; name: string; quantity: number }>;
};

const STATUS_LABELS: Record<ApiOrder["status"], string> = {
  pending: "Payment pending",
  paid: "Paid",
  failed: "Payment failed",
  canceled: "Canceled",
};

const STATUS_CLASSES: Record<ApiOrder["status"], string> = {
  pending: "bg-amber-50 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-200",
  paid: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-200",
  failed: "bg-rose-50 text-rose-700 ring-1 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-200",
  canceled: "bg-slate-100 text-slate-700 ring-1 ring-slate-200 dark:bg-slate-500/10 dark:text-slate-200",
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
    <div className="mx-auto max-w-6xl space-y-6 pt-20">
      <PageIntro
        eyebrow="Order center"
        title="Review your recent purchases"
        description="Track payment status, delivery windows, and the next best action for each order without digging around."
        highlights={[
          { title: "Tracking ready", text: "Jump directly into order tracking from each purchase card." },
          { title: "Totals at a glance", text: "See item count, order totals, and estimated delivery windows quickly." },
          { title: "Buy again faster", text: "Return to the catalog when you want to reorder or keep shopping." },
        ]}
      />

      {loading ? (
        <section className="surface-card p-8 text-center">
          <p className="text-sm text-muted">Loading orders...</p>
        </section>
      ) : orders.length === 0 ? (
        <section className="surface-card p-8 text-center sm:p-10">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">No orders yet</h2>
          <p className="mt-3 text-sm leading-7 text-muted">When you place your first order, it will show up here with payment and delivery details.</p>
          <Link href="/products" className="btn-primary focus-ring mt-6 inline-flex px-5 py-3 text-sm font-semibold">
            Start shopping
          </Link>
        </section>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <article key={order.orderNumber} className="surface-card p-5 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Order number</p>
                  <p className="mt-2 text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">{order.orderNumber}</p>
                  <p className="mt-2 text-sm text-muted">
                    Placed on {new Date(order.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${STATUS_CLASSES[order.status]}`}>
                  {STATUS_LABELS[order.status]}
                </span>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <div className="surface-soft p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Items</p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                    {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                  </p>
                </div>
                <div className="surface-soft p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Total</p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">{formatNgn(order.total)}</p>
                </div>
                <div className="surface-soft p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Estimated delivery</p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">{order.etaDays} days</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={`/track?order=${encodeURIComponent(order.orderNumber)}`}
                  className="btn-primary focus-ring px-4 py-3 text-sm font-semibold"
                >
                  Track order
                </Link>
                <Link href="/products" className="btn-outline focus-ring px-4 py-3 text-sm font-semibold">
                  Buy again
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
