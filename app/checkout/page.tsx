"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { formatNgn } from "../../lib/currency";
import { useCart } from "../../context/CartContext";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const { items } = useCart();

  const [shippingMethod, setShippingMethod] = React.useState<"standard" | "express">("standard");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [streetAddress, setStreetAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [lga, setLga] = React.useState("");
  const [landmark, setLandmark] = React.useState("");
  const [promoCode, setPromoCode] = React.useState("");
  const [promoApplied, setPromoApplied] = React.useState(false);
  const [isRedirecting, setIsRedirecting] = React.useState(false);
  const [paymentError, setPaymentError] = React.useState<string | null>(null);
  const wasCanceled =
    searchParams.get("canceled") === "1" ||
    searchParams.get("status") === "cancelled";

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = items.length === 0 ? 0 : shippingMethod === "express" ? 8000 : subtotal >= 50000 ? 0 : 3500;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = Math.max(0, subtotal + shipping - discount);

  const applyPromo = () => {
    setPromoApplied(promoCode.trim().toUpperCase() === "WELCOME10");
  };

  const startSecurePayment = async () => {
    const normalizedEmail = email.trim();
    const normalizedPhone = phone.trim().replace(/\s+/g, "");
    if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setPaymentError("Please enter a valid email address before payment.");
      return;
    }
    if (!firstName.trim() || !lastName.trim()) {
      setPaymentError("Please enter your first and last name.");
      return;
    }
    if (!/^(\+234|0)\d{10}$/.test(normalizedPhone)) {
      setPaymentError("Please enter a valid Nigerian phone number.");
      return;
    }
    if (!streetAddress.trim() || !city.trim() || !state.trim() || !lga.trim()) {
      setPaymentError("Please complete your shipping address.");
      return;
    }

    setPaymentError(null);
    setIsRedirecting(true);
    const idemKey =
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `${Date.now()}_${Math.random().toString(36).slice(2)}`;
    try {
      const response = await fetch("/api/checkout/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": idemKey,
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
          shippingMethod,
          promoCode: promoApplied ? promoCode : "",
          email: normalizedEmail,
          contact: {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            phone: normalizedPhone,
          },
          shippingAddress: {
            streetAddress: streetAddress.trim(),
            city: city.trim(),
            state: state.trim(),
            lga: lga.trim(),
            landmark: landmark.trim(),
          },
        }),
      });

      const raw = await response.text();
      const data = (raw ? JSON.parse(raw) : {}) as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        throw new Error(data.error || "Unable to start secure payment.");
      }

      window.location.assign(data.url);
    } catch (error) {
      setIsRedirecting(false);
      if (error instanceof SyntaxError) {
        setPaymentError("Checkout service returned an invalid response. Please try again.");
        return;
      }
      setPaymentError(error instanceof Error ? error.message : "Unable to start secure payment.");
    }
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
      {wasCanceled && (
        <section className="mt-4 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Payment was canceled. Your cart is still available for checkout.
        </section>
      )}
      {paymentError && (
        <section className="mt-4 rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {paymentError}
        </section>
      )}

      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="surface-card rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-zinc-900">Contact Information</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <input id="first-name" name="firstName" autoComplete="given-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="focus-ring rounded-lg border border-zinc-300 px-3 py-2" placeholder="First name" />
              <input id="last-name" name="lastName" autoComplete="family-name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="focus-ring rounded-lg border border-zinc-300 px-3 py-2" placeholder="Last name" />
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="focus-ring rounded-lg border border-zinc-300 px-3 py-2 sm:col-span-2"
                placeholder="Email address"
                required
              />
              <input id="phone" name="phone" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="focus-ring rounded-lg border border-zinc-300 px-3 py-2 sm:col-span-2" placeholder="Phone number (e.g. +234 801 234 5678)" />
            </div>
          </div>

          <div className="surface-card rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-zinc-900">Shipping Details</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <input id="street-address" name="streetAddress" autoComplete="street-address" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} className="focus-ring rounded-lg border border-zinc-300 px-3 py-2 sm:col-span-2" placeholder="Street address" />
              <input id="city" name="city" autoComplete="address-level2" value={city} onChange={(e) => setCity(e.target.value)} className="focus-ring rounded-lg border border-zinc-300 px-3 py-2" placeholder="City / Town" />
              <input id="state" name="state" autoComplete="address-level1" value={state} onChange={(e) => setState(e.target.value)} className="focus-ring rounded-lg border border-zinc-300 px-3 py-2" placeholder="State (e.g. Lagos)" />
              <input id="lga" name="lga" autoComplete="off" value={lga} onChange={(e) => setLga(e.target.value)} className="focus-ring rounded-lg border border-zinc-300 px-3 py-2" placeholder="Local Government Area (LGA)" />
              <input id="landmark" name="landmark" autoComplete="address-line2" value={landmark} onChange={(e) => setLandmark(e.target.value)} className="focus-ring rounded-lg border border-zinc-300 px-3 py-2" placeholder="Landmark (optional)" />
              <select
                id="shipping-method"
                name="shippingMethod"
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
            <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
              You will be redirected to a secure Paystack-hosted payment page to complete your purchase.
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
                <p className="font-medium text-zinc-700">{formatNgn(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <input
              id="promo-code"
              name="promoCode"
              autoComplete="off"
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
              <span>{formatNgn(subtotal)}</span>
            </div>
            <div className="flex justify-between text-zinc-700">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : formatNgn(shipping)}</span>
            </div>
            <div className="flex justify-between text-zinc-700">
              <span>Discount</span>
              <span>- {formatNgn(discount)}</span>
            </div>
            <div className="flex justify-between border-t border-zinc-200 pt-2 text-base font-semibold text-zinc-900">
              <span>Total</span>
              <span>{formatNgn(total)}</span>
            </div>
          </div>

          <button
            onClick={startSecurePayment}
            disabled={isRedirecting}
            className="btn-primary mt-4 w-full px-4 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isRedirecting ? "Redirecting to Secure Payment..." : "Continue to Secure Payment"}
          </button>
          <p className="mt-2 text-center text-xs text-zinc-500">Payments are processed securely by Paystack.</p>
        </aside>
      </section>
    </div>
  );
}
