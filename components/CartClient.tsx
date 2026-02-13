"use client";

import React from "react";
import { useCart } from "../context/CartContext";
import { QuantitySelector } from "./QuantitySelector";

export default function CartClient() {
  const { items, updateQuantity, removeFromCart, clearCart } = useCart();

  if (items.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div className="space-y-4">
      {items.map((it) => (
        <div key={it.id} className="flex items-center gap-4 rounded border p-4">
          <div className="flex-1">
            <div className="font-semibold">{it.name}</div>
            <div className="text-sm text-zinc-600">Price: ${it.price.toFixed(2)}</div>
            <div className="text-sm text-zinc-600">Subtotal: ${(it.price * it.quantity).toFixed(2)}</div>
          </div>
          <div className="flex flex-col gap-2">
            <QuantitySelector
              quantity={it.quantity}
              onQuantityChange={(newQty) => updateQuantity(it.id, newQty)}
            />
            <button
              onClick={() => removeFromCart(it.id)}
              className="rounded border px-3 py-1 text-sm text-red-600 hover:bg-red-50"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <div className="flex items-center justify-between border-t pt-4">
        <div>
          <button onClick={clearCart} className="rounded bg-red-600 px-3 py-1 text-white">
            Clear Cart
          </button>
        </div>
        <div className="text-right">
          <div className="text-sm text-zinc-600">Subtotal</div>
          <div className="text-2xl font-semibold">
            ${items.reduce((s, it) => s + it.price * it.quantity, 0).toFixed(2)}
          </div>
          <div className="mt-2 text-sm text-zinc-600">Shipping & taxes calculated at checkout</div>
        </div>
      </div>
    </div>
  );
}
