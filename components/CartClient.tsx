"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { formatNgn } from "../lib/currency";
import { useCart } from "../context/CartContext";
import { QuantitySelector } from "./QuantitySelector";

export default function CartClient() {
  const { items, updateQuantity, removeFromCart, clearCart } = useCart();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 50000 || items.length === 0 ? 0 : 3500;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <section className="surface-card p-8 text-center sm:p-10">
        <div className="mx-auto max-w-lg">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-600)]">Your cart</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">Your cart is empty right now</h2>
          <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
            Looks like you haven&apos;t added anything yet. Browse the catalog, save a few favorites, and come back when you&apos;re ready.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/products" className="btn-primary focus-ring px-5 py-3 text-sm font-semibold">
              Browse products
            </Link>
            <Link href="/products?badge=Popular" className="btn-outline focus-ring px-5 py-3 text-sm font-semibold">
              View popular picks
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <div className="space-y-4">
        {items.map((item) => (
          <article
            key={item.id}
            className="surface-card flex flex-col gap-5 p-4 sm:flex-row sm:items-center sm:gap-6 sm:p-5"
          >
            <div className="surface-soft relative h-28 w-full overflow-hidden rounded-[1.25rem] sm:h-28 sm:w-28">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 112px"
                  className="object-cover"
                />
              ) : null}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">{item.name}</h3>
                  <p className="mt-1 text-sm text-muted">Unit price: {formatNgn(item.price)}</p>
                </div>
                <span className="rounded-full bg-[var(--surface-2)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-700 dark:text-white">
                  Qty {item.quantity}
                </span>
              </div>

              <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Item subtotal</p>
                  <p className="mt-2 text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                    {formatNgn(item.price * item.quantity)}
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <QuantitySelector quantity={item.quantity} onQuantityChange={(newQty) => updateQuantity(item.id, newQty)} />
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="btn-outline focus-ring px-4 py-3 text-sm font-semibold text-rose-600 dark:text-rose-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}

        <section className="surface-card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-white">Want to reset your cart?</p>
            <p className="mt-1 text-sm text-muted">You can clear everything and start over anytime.</p>
          </div>
          <button
            type="button"
            onClick={clearCart}
            className="btn-outline focus-ring px-4 py-3 text-sm font-semibold text-rose-600 dark:text-rose-200"
          >
            Clear cart
          </button>
        </section>
      </div>

      <aside className="space-y-4 xl:sticky xl:top-24">
        <section className="surface-card p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-600)]">Order summary</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">Your total before checkout</h2>

          <div className="mt-5 max-h-56 space-y-3 overflow-auto pr-1">
            {items.map((item) => (
              <div key={item.id} className="surface-soft flex items-start justify-between gap-3 p-4">
                <div className="min-w-0">
                  <p className="font-medium text-zinc-900 dark:text-white">{item.name}</p>
                  <p className="mt-1 text-sm text-muted">Qty {item.quantity}</p>
                </div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">{formatNgn(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-3 border-t border-[var(--border-subtle)] pt-5 text-sm">
            <div className="flex justify-between text-zinc-700 dark:text-slate-200">
              <span>Subtotal</span>
              <span>{formatNgn(subtotal)}</span>
            </div>
            <div className="flex justify-between text-zinc-700 dark:text-slate-200">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : formatNgn(shipping)}</span>
            </div>
            <div className="flex justify-between border-t border-[var(--border-subtle)] pt-3 text-base font-semibold text-zinc-900 dark:text-white">
              <span>Total</span>
              <span>{formatNgn(total)}</span>
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            <Link href="/checkout" className="btn-primary focus-ring px-4 py-3 text-center text-sm font-semibold">
              Proceed to checkout
            </Link>
            <Link href="/products" className="btn-outline focus-ring px-4 py-3 text-center text-sm font-semibold">
              Continue shopping
            </Link>
          </div>
        </section>

        <section className="surface-card p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-600)]">Before you pay</p>
          <div className="mt-4 grid gap-3">
            <div className="surface-soft px-4 py-3 text-sm text-zinc-700 dark:text-slate-200">
              Free shipping applies automatically on orders over NGN 50,000.
            </div>
            <div className="surface-soft px-4 py-3 text-sm text-zinc-700 dark:text-slate-200">
              Final shipping and payment details are confirmed in checkout.
            </div>
            <div className="surface-soft px-4 py-3 text-sm text-zinc-700 dark:text-slate-200">
              Payments are processed securely and your cart remains available if you cancel.
            </div>
          </div>
        </section>
      </aside>
    </div>
  );
}
