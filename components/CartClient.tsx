"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { formatNgn } from "../lib/currency";
import { useCart } from "../context/CartContext";
import { QuantitySelector } from "./QuantitySelector";

export default function CartClient() {
  const { items, updateQuantity, removeFromCart, clearCart } = useCart();
  const subtotal = items.reduce((s, it) => s + it.price * it.quantity, 0);
  const shipping = subtotal >= 50000 || items.length === 0 ? 0 : 3500;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <section className="surface-card rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-semibold text-zinc-900">Your cart is empty</h2>
        <p className="mt-2 text-sm text-zinc-600">
          Looks like you have not added anything yet. Explore products and come back here anytime.
        </p>
        <Link href="/products" className="btn-primary mt-5 inline-flex px-5 py-2.5 text-sm font-semibold">
          Browse Products
        </Link>
      </section>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        {items.map((it) => (
          <article
            key={it.id}
            className="surface-card flex flex-col gap-4 rounded-2xl p-4 sm:flex-row sm:items-center"
          >
            <div className="surface-soft relative h-24 w-full overflow-hidden rounded-xl sm:w-24">
              {it.image ? (
                <Image
                  src={it.image}
                  alt={it.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 96px"
                  className="object-cover"
                />
              ) : null}
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-zinc-900">{it.name}</h3>
              <p className="mt-1 text-sm text-zinc-600">Price: {formatNgn(it.price)}</p>
              <p className="mt-1 text-sm font-medium text-zinc-800">
                Item subtotal: {formatNgn(it.price * it.quantity)}
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:items-end">
              <QuantitySelector
                quantity={it.quantity}
                onQuantityChange={(newQty) => updateQuantity(it.id, newQty)}
              />
              <button
                onClick={() => removeFromCart(it.id)}
                className="rounded-md border border-rose-200 px-3 py-1 text-sm text-rose-600 hover:bg-rose-50"
              >
                Remove
              </button>
            </div>
          </article>
        ))}

        <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-4">
          <p className="text-sm text-zinc-600">Need to start over?</p>
          <button onClick={clearCart} className="rounded-md bg-rose-600 px-3 py-1.5 text-sm text-white">
            Clear Cart
          </button>
        </div>
      </div>

      <aside className="surface-card h-fit rounded-2xl p-5 lg:sticky lg:top-24">
        <h2 className="text-lg font-semibold text-zinc-900">Order Summary</h2>
        <div className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between text-zinc-700">
            <span>Subtotal</span>
            <span>{formatNgn(subtotal)}</span>
          </div>
          <div className="flex justify-between text-zinc-700">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : formatNgn(shipping)}</span>
          </div>
          <div className="border-t border-zinc-200 pt-3">
            <div className="flex justify-between text-base font-semibold text-zinc-900">
              <span>Total</span>
              <span>{formatNgn(total)}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-lg bg-zinc-50 p-3 text-xs text-zinc-600">
          Shipping and taxes are finalized at checkout.
        </div>

        <div className="mt-4 space-y-2">
          <Link href="/checkout" className="btn-primary block rounded-md px-4 py-2.5 text-center text-sm font-semibold">
            Proceed to Checkout
          </Link>
          <Link href="/products" className="btn-outline block rounded-md px-4 py-2.5 text-center text-sm">
            Continue Shopping
          </Link>
        </div>
      </aside>
    </div>
  );
}
