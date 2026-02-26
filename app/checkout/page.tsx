"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useCart } from "../../context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCart();

  const [shippingMethod, setShippingMethod] = React.useState<"standard" | "express">("standard");
  const [promoCode, setPromoCode] = React.useState("");
  const [promoApplied, setPromoApplied] = React.useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = items.length === 0 ? 0 : shippingMethod === "express" ? 14.99 : subtotal >= 50 ? 0 : 6.99;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = Math.max(0, subtotal + shipping - discount);

  const applyPromo = () => {
    setPromoApplied(promoCode.trim().toUpperCase() === "WELCOME10");
  };

  const placeOrder = () => {
    const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;
    clearCart();
    router.push(
      `/confirmation?order=${orderNumber}&total=${total.toFixed(2)}&eta=${shippingMethod === "express" ? "2-3" : "3-5"}`
    );
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-4xl pt-20">
        <section className="surface-card rounded-2xl p-8 text-center">
          <h1 className="text-2xl font-semibold text-zinc-900">Checkout</h1>
          <p className="mt-2 text-sm text-zinc-600">Your cart is empty. Add products before checkout.</p>
          <Link href="/products" className="btn-primary mt-5 inline-flex px-5 py-2.5 text-sm font-semibold">
            Browse Products
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl pt-20">
      <section className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-8 text-white shadow-lg">
        <p className="text-xs uppercase tracking-widest text-sky-300">Checkout Flow</p>
        <h1 className="mt-2 text-3xl font-semibold">Secure Checkout</h1>
        <div className="mt-4 grid gap-2 text-xs sm:grid-cols-3">
          <div className="rounded-md border border-sky-400/50 bg-sky-500/10 px-3 py-2">1. Cart Reviewed</div>
          <div className="rounded-md border border-sky-400/50 bg-sky-500/10 px-3 py-2">2. Shipping & Payment</div>
          <div className="rounded-md border border-white/20 bg-white/5 px-3 py-2">3. Confirmation</div>
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="surface-card rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-zinc-900">Contact Information</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <input className="focus-ring rounded-lg border border-zinc-300 px-3 py-2" placeholder="First name" />
              <input className="focus-ring rounded-lg border border-zinc-300 px-3 py-2" placeholder="Last name" />
              <input className="focus-ring rounded-lg border border-zinc-300 px-3 py-2 sm:col-span-2" placeholder="Email address" />
              <input className="focus-ring rounded-lg border border-zinc-300 px-3 py-2 sm:col-span-2" placeholder="Phone number" />
            </div>
          </div>

          <div className="surface-card rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-zinc-900">Shipping Details</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <input className="focus-ring rounded-lg border border-zinc-300 px-3 py-2 sm:col-span-2" placeholder="Street address" />
              <input className="focus-ring rounded-lg border border-zinc-300 px-3 py-2" placeholder="City" />
              <input className="focus-ring rounded-lg border border-zinc-300 px-3 py-2" placeholder="State" />
              <input className="focus-ring rounded-lg border border-zinc-300 px-3 py-2" placeholder="ZIP code" />
              <select
                value={shippingMethod}
                onChange={(e) => setShippingMethod(e.target.value as "standard" | "express")}
                className="focus-ring rounded-lg border border-zinc-300 px-3 py-2"
              >
                <option value="standard">Standard (3-5 days)</option>
                <option value="express">Express (2-3 days)</option>
              </select>
            </div>
          </div>

          <div className="surface-card rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-zinc-900">Payment</h2>
            <div className="mt-4 grid gap-4">
              <input className="focus-ring rounded-lg border border-zinc-300 px-3 py-2" placeholder="Cardholder name" />
              <input className="focus-ring rounded-lg border border-zinc-300 px-3 py-2" placeholder="Card number" />
              <div className="grid gap-4 sm:grid-cols-2">
                <input className="focus-ring rounded-lg border border-zinc-300 px-3 py-2" placeholder="MM/YY" />
                <input className="focus-ring rounded-lg border border-zinc-300 px-3 py-2" placeholder="CVC" />
              </div>
            </div>
          </div>
        </div>

        <aside className="surface-card h-fit rounded-2xl p-5 lg:sticky lg:top-24">
          <h2 className="text-lg font-semibold text-zinc-900">Order Summary</h2>

          <div className="mt-4 max-h-44 space-y-2 overflow-auto pr-1 text-sm">
            {items.map((item) => (
              <div key={item.id} className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-zinc-900">{item.name}</p>
                  <p className="text-xs text-zinc-500">Qty {item.quantity}</p>
                </div>
                <p className="font-medium text-zinc-700">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <input
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Promo code"
              className="focus-ring w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
            />
            <button type="button" onClick={applyPromo} className="btn-outline px-3 py-2 text-sm">
              Apply
            </button>
          </div>
          {promoApplied && <p className="mt-2 text-xs text-emerald-700">Promo applied: 10% off</p>}

          <div className="mt-4 space-y-2 border-t border-zinc-200 pt-3 text-sm">
            <div className="flex justify-between text-zinc-700">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-zinc-700">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-zinc-700">
              <span>Discount</span>
              <span>- ${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-zinc-200 pt-2 text-base font-semibold text-zinc-900">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button onClick={placeOrder} className="btn-primary mt-4 w-full px-4 py-2.5 text-sm font-semibold">
            Place Order
          </button>
          <p className="mt-2 text-center text-xs text-zinc-500">Demo checkout: no real payment is processed.</p>
        </aside>
      </section>
    </div>
  );
}
