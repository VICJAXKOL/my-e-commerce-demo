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
  const wasCanceled = searchParams.get("canceled") === "1" || searchParams.get("status") === "cancelled";

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
        <section className="surface-card p-8 text-center sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-600)]">Checkout</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">Your cart is empty</h1>
          <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
            Add products before checkout so we can calculate shipping, discounts, and your secure payment summary.
          </p>
          <Link href="/products" className="btn-primary focus-ring mt-6 inline-flex px-5 py-3 text-sm font-semibold">
            Browse products
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 pt-20">
      <section className="surface-card overflow-hidden p-6 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-600)]">Secure checkout</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              Enter your details and pay with confidence
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base">
              We&apos;ve grouped the information you need so checkout feels easier to complete and easier to trust.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="surface-soft p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Step 1</p>
              <p className="mt-2 text-sm font-semibold text-zinc-900 dark:text-white">Cart reviewed</p>
              <p className="mt-2 text-sm leading-6 text-muted">Products and totals are already confirmed.</p>
            </div>
            <div className="surface-soft border border-[var(--brand-500)] bg-[color:color-mix(in_srgb,var(--brand-500)_10%,white)] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-700)]">Step 2</p>
              <p className="mt-2 text-sm font-semibold text-zinc-900 dark:text-white">Shipping & payment</p>
              <p className="mt-2 text-sm leading-6 text-muted">Enter your contact details and confirm delivery options.</p>
            </div>
            <div className="surface-soft p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Step 3</p>
              <p className="mt-2 text-sm font-semibold text-zinc-900 dark:text-white">Confirmation</p>
              <p className="mt-2 text-sm leading-6 text-muted">You’ll finish payment securely with Paystack.</p>
            </div>
          </div>
        </div>
      </section>

      {wasCanceled && (
        <section className="rounded-2xl border border-amber-300 bg-amber-50 px-5 py-4 text-sm text-amber-800">
          Payment was canceled. Your cart is still available, so you can pick up where you left off.
        </section>
      )}

      {paymentError && (
        <section className="rounded-2xl border border-rose-300 bg-rose-50 px-5 py-4 text-sm text-rose-700">
          {paymentError}
        </section>
      )}

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <div className="surface-card p-6 sm:p-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-600)]">Section 1</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">Contact information</h2>
              </div>
              <p className="text-sm text-muted">We’ll use this for updates and delivery coordination.</p>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <input
                id="first-name"
                name="firstName"
                autoComplete="given-name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                className="input-control focus-ring px-4 py-3 text-sm"
                placeholder="First name"
              />
              <input
                id="last-name"
                name="lastName"
                autoComplete="family-name"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                className="input-control focus-ring px-4 py-3 text-sm"
                placeholder="Last name"
              />
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                className="input-control focus-ring px-4 py-3 text-sm sm:col-span-2"
                placeholder="Email address"
                required
              />
              <input
                id="phone"
                name="phone"
                autoComplete="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="input-control focus-ring px-4 py-3 text-sm sm:col-span-2"
                placeholder="Phone number (e.g. +234 801 234 5678)"
              />
            </div>
          </div>

          <div className="surface-card p-6 sm:p-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-600)]">Section 2</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">Shipping details</h2>
              </div>
              <p className="text-sm text-muted">Enter where you want your order delivered.</p>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <input
                id="street-address"
                name="streetAddress"
                autoComplete="street-address"
                value={streetAddress}
                onChange={(event) => setStreetAddress(event.target.value)}
                className="input-control focus-ring px-4 py-3 text-sm sm:col-span-2"
                placeholder="Street address"
              />
              <input
                id="city"
                name="city"
                autoComplete="address-level2"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                className="input-control focus-ring px-4 py-3 text-sm"
                placeholder="City / Town"
              />
              <input
                id="state"
                name="state"
                autoComplete="address-level1"
                value={state}
                onChange={(event) => setState(event.target.value)}
                className="input-control focus-ring px-4 py-3 text-sm"
                placeholder="State (e.g. Lagos)"
              />
              <input
                id="lga"
                name="lga"
                autoComplete="off"
                value={lga}
                onChange={(event) => setLga(event.target.value)}
                className="input-control focus-ring px-4 py-3 text-sm"
                placeholder="Local Government Area (LGA)"
              />
              <input
                id="landmark"
                name="landmark"
                autoComplete="address-line2"
                value={landmark}
                onChange={(event) => setLandmark(event.target.value)}
                className="input-control focus-ring px-4 py-3 text-sm"
                placeholder="Landmark (optional)"
              />
            </div>
          </div>

          <div className="surface-card p-6 sm:p-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-600)]">Section 3</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">Delivery and payment</h2>
              </div>
              <p className="text-sm text-muted">Choose a shipping speed, then continue to secure payment.</p>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setShippingMethod("standard")}
                className={`focus-ring rounded-2xl border p-4 text-left transition ${
                  shippingMethod === "standard"
                    ? "border-[var(--brand-500)] bg-[color:color-mix(in_srgb,var(--brand-500)_10%,white)]"
                    : "border-[var(--border-subtle)] bg-[var(--surface-1)] hover:bg-[var(--surface-2)]"
                }`}
              >
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">Standard delivery</p>
                <p className="mt-2 text-sm text-muted">3–5 business days · {subtotal >= 50000 ? "Free" : formatNgn(3500)}</p>
              </button>

              <button
                type="button"
                onClick={() => setShippingMethod("express")}
                className={`focus-ring rounded-2xl border p-4 text-left transition ${
                  shippingMethod === "express"
                    ? "border-[var(--brand-500)] bg-[color:color-mix(in_srgb,var(--brand-500)_10%,white)]"
                    : "border-[var(--border-subtle)] bg-[var(--surface-1)] hover:bg-[var(--surface-2)]"
                }`}
              >
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">Express delivery</p>
                <p className="mt-2 text-sm text-muted">2–3 business days · {formatNgn(8000)}</p>
              </button>
            </div>

            <div className="surface-soft mt-5 p-4 text-sm leading-6 text-zinc-700 dark:text-slate-200">
              You’ll be redirected to a secure Paystack-hosted payment page after review. Your cart stays available if payment is canceled.
            </div>
          </div>
        </div>

        <aside className="space-y-4 xl:sticky xl:top-24">
          <section className="surface-card p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-600)]">Order summary</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">What you’re paying today</h2>

            <div className="mt-5 max-h-52 space-y-3 overflow-auto pr-1">
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

            <div className="mt-5 flex gap-2">
              <input
                id="promo-code"
                name="promoCode"
                autoComplete="off"
                value={promoCode}
                onChange={(event) => setPromoCode(event.target.value)}
                placeholder="Promo code"
                className="input-control focus-ring px-4 py-3 text-sm"
              />
              <button type="button" onClick={applyPromo} className="btn-outline focus-ring px-4 py-3 text-sm font-semibold">
                Apply
              </button>
            </div>
            {promoApplied && (
              <p className="mt-3 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
                Promo applied: 10% off with WELCOME10
              </p>
            )}

            <div className="mt-5 space-y-3 border-t border-[var(--border-subtle)] pt-5 text-sm">
              <div className="flex justify-between text-zinc-700 dark:text-slate-200">
                <span>Subtotal</span>
                <span>{formatNgn(subtotal)}</span>
              </div>
              <div className="flex justify-between text-zinc-700 dark:text-slate-200">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : formatNgn(shipping)}</span>
              </div>
              <div className="flex justify-between text-zinc-700 dark:text-slate-200">
                <span>Discount</span>
                <span>- {formatNgn(discount)}</span>
              </div>
              <div className="flex justify-between border-t border-[var(--border-subtle)] pt-3 text-base font-semibold text-zinc-900 dark:text-white">
                <span>Total</span>
                <span>{formatNgn(total)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={startSecurePayment}
              disabled={isRedirecting}
              className="btn-primary focus-ring mt-5 w-full px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isRedirecting ? "Redirecting to secure payment..." : "Continue to secure payment"}
            </button>
            <p className="mt-3 text-center text-xs text-muted">Payments are processed securely by Paystack.</p>
          </section>

          <section className="surface-card p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-600)]">Checkout reassurance</p>
            <div className="mt-4 grid gap-3">
              <div className="surface-soft px-4 py-3 text-sm text-zinc-700 dark:text-slate-200">
                Your cart remains available if you cancel or need to retry payment.
              </div>
              <div className="surface-soft px-4 py-3 text-sm text-zinc-700 dark:text-slate-200">
                Contact and shipping details are grouped to reduce form fatigue.
              </div>
              <div className="surface-soft px-4 py-3 text-sm text-zinc-700 dark:text-slate-200">
                Shipping updates are based on your selected delivery method and order total.
              </div>
              <Link href="/cart" className="btn-outline focus-ring px-4 py-3 text-center text-sm font-semibold">
                Back to cart
              </Link>
            </div>
          </section>
        </aside>
      </section>
    </div>
  );
}
