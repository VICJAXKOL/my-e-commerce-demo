"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

function getMockStatus(orderNumber: string) {
  const steps = [
    { key: "confirmed", label: "Order Confirmed", desc: "We received your order and payment." },
    { key: "packed", label: "Packed", desc: "Your items are packed and ready for dispatch." },
    { key: "shipped", label: "Shipped", desc: "Package is on the way to your delivery address." },
    { key: "out", label: "Out for Delivery", desc: "Courier is on route with your order." },
    { key: "delivered", label: "Delivered", desc: "Order completed successfully." },
  ];

  const hash = orderNumber
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
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
    <div className="mx-auto max-w-4xl pt-20">
      <section className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-8 text-white shadow-lg">
        <p className="text-xs uppercase tracking-widest text-sky-300">Order Tracking</p>
        <h1 className="mt-2 text-3xl font-semibold">Track Your Order</h1>
        <p className="mt-2 text-sm text-slate-300">
          Enter your order number to check the current delivery status and next step.
        </p>
      </section>

      <section className="surface-card mt-6 rounded-2xl p-6">
        <form
          className="flex flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmittedOrder(orderNumber);
          }}
        >
          <input
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            placeholder="Enter order number (e.g. ORD-123456)"
            className="focus-ring w-full rounded-lg border border-zinc-300 px-3 py-2"
          />
          <button type="submit" className="btn-primary rounded-md px-5 py-2.5 text-sm font-semibold">
            Track
          </button>
        </form>

        {!hasOrder ? (
          <p className="mt-4 text-sm text-zinc-600">
            Need an order number? Check your confirmation email or visit your latest order confirmation page.
          </p>
        ) : (
          <div className="mt-6 space-y-4">
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm">
              <span className="text-zinc-500">Tracking order:</span>{" "}
              <span className="font-semibold text-zinc-900">{submittedOrder}</span>
            </div>

            {status?.steps.map((step, index) => {
              const complete = index <= status.activeIndex;
              const current = index === status.activeIndex;
              return (
                <div
                  key={step.key}
                  className={`rounded-lg border p-4 ${
                    current
                      ? "border-sky-300 bg-sky-50"
                      : complete
                      ? "border-emerald-200 bg-emerald-50"
                      : "border-zinc-200 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-zinc-900">{step.label}</h2>
                    <span className="text-xs font-medium text-zinc-600">
                      {current ? "Current" : complete ? "Done" : "Pending"}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-zinc-600">{step.desc}</p>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/contact" className="btn-outline rounded-md px-4 py-2 text-sm">
            Contact Support
          </Link>
          <Link href="/products" className="btn-outline rounded-md px-4 py-2 text-sm">
            Continue Shopping
          </Link>
        </div>
      </section>
    </div>
  );
}

