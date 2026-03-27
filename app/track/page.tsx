"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import PageIntro from "../../components/PageIntro";

function getMockStatus(orderNumber: string) {
  const steps = [
    { key: "confirmed", label: "Order confirmed", desc: "We received your order and payment." },
    { key: "packed", label: "Packed", desc: "Your items are packed and ready for dispatch." },
    { key: "shipped", label: "Shipped", desc: "Package is on the way to your delivery address." },
    { key: "out", label: "Out for delivery", desc: "Courier is on route with your order." },
    { key: "delivered", label: "Delivered", desc: "Order completed successfully." },
  ];

  const hash = orderNumber.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const activeIndex = Math.min(4, hash % 5);

  return { steps, activeIndex };
}

export default function TrackOrderPage() {
  const searchParams = useSearchParams();
  const initialOrder = searchParams.get("order") ?? "";
  const [orderNumber, setOrderNumber] = React.useState(initialOrder);
  const [submittedOrder, setSubmittedOrder] = React.useState(initialOrder);

  const hasOrder = submittedOrder.trim().length > 0;
  const status = hasOrder ? getMockStatus(submittedOrder.trim()) : null;

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 pt-20 sm:px-6">
      <PageIntro
        eyebrow="Order tracking"
        title="Follow your delivery progress"
        description="Enter your order number to check the current shipment stage and understand what happens next."
        highlights={[
          { title: "Status visibility", text: "See where your order is in the delivery journey." },
          { title: "Track quickly", text: "Use the order number from confirmation emails or your orders page." },
          { title: "Support nearby", text: "Contact help quickly if something looks unusual." },
        ]}
      />

      <section className="surface-card p-6 sm:p-8">
        <form
          className="flex flex-col gap-3 sm:flex-row"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmittedOrder(orderNumber);
          }}
        >
          <input
            id="track-order-number"
            name="orderNumber"
            value={orderNumber}
            onChange={(event) => setOrderNumber(event.target.value)}
            autoComplete="off"
            placeholder="Enter order number (e.g. ORD-123456)"
            className="input-control focus-ring px-4 py-3 text-sm"
          />
          <button type="submit" className="btn-primary focus-ring px-5 py-3 text-sm font-semibold">
            Track order
          </button>
        </form>

        {!hasOrder ? (
          <p className="mt-4 text-sm leading-7 text-muted">
            Need an order number? Check your confirmation email or visit your orders page once you&apos;re signed in.
          </p>
        ) : (
          <div className="mt-6 space-y-4">
            <div className="surface-soft p-4 text-sm">
              <span className="text-muted">Tracking order:</span>{" "}
              <span className="font-semibold text-zinc-900 dark:text-white">{submittedOrder}</span>
            </div>

            {status?.steps.map((step, index) => {
              const complete = index <= status.activeIndex;
              const current = index === status.activeIndex;
              return (
                <div
                  key={step.key}
                  className={`rounded-2xl border p-4 ${
                    current
                      ? "border-[var(--brand-500)] bg-[color:color-mix(in_srgb,var(--brand-500)_10%,white)]"
                      : complete
                        ? "border-emerald-200 bg-emerald-50 dark:border-emerald-400/20 dark:bg-emerald-500/10"
                        : "border-[var(--border-subtle)] bg-[var(--surface-1)]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-base font-semibold text-zinc-900 dark:text-white">{step.label}</h2>
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                      {current ? "Current" : complete ? "Done" : "Pending"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted">{step.desc}</p>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/contact" className="btn-outline focus-ring px-4 py-3 text-sm font-semibold">
            Contact support
          </Link>
          <Link href="/products" className="btn-outline focus-ring px-4 py-3 text-sm font-semibold">
            Continue shopping
          </Link>
        </div>
      </section>
    </div>
  );
}
