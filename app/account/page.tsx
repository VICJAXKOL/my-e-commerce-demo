"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import PageIntro from "../../components/PageIntro";

export default function AccountPage() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl pt-20">
        <section className="surface-card p-8 text-center text-sm text-muted">Loading account...</section>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-6xl space-y-6 pt-20">
        <PageIntro
          eyebrow="Account"
          title="Sign in to access your account"
          description="View orders, keep your shopping details in one place, and jump back into the store with less friction."
          highlights={[
            { title: "Track orders", text: "Review purchase history and keep tabs on current deliveries." },
            { title: "Faster checkout", text: "Reuse account details instead of starting from scratch every time." },
            { title: "Stay connected", text: "Keep authentication, verification, and recovery flows easier to manage." },
          ]}
          actions={
            <>
              <Link href="/login" className="btn-primary focus-ring px-5 py-3 text-sm font-semibold">
                Sign in
              </Link>
              <Link href="/register" className="btn-outline focus-ring px-5 py-3 text-sm font-semibold">
                Create account
              </Link>
            </>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 pt-20">
      <PageIntro
        eyebrow="My account"
        title="Welcome back"
        description={`Signed in as ${user.email}. From here you can review orders, return to shopping, or manage your session.`}
        highlights={[
          { title: "Account status", text: user.emailVerifiedAt ? "Email verified and ready for checkout updates." : "Email verification is still pending." },
          { title: "Order access", text: "Visit your order center to review recent purchases and delivery updates." },
          { title: "Shopping continuity", text: "Jump back to products or cart without losing momentum." },
        ]}
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Link href="/products" className="surface-card p-5 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]">
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">Explore products</p>
          <p className="mt-2 text-sm leading-6 text-muted">Browse the catalog and discover new items.</p>
        </Link>
        <Link href="/orders" className="surface-card p-5 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]">
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">View orders</p>
          <p className="mt-2 text-sm leading-6 text-muted">Check statuses, totals, and delivery progress.</p>
        </Link>
        <Link href="/wishlist" className="surface-card p-5 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]">
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">Open wishlist</p>
          <p className="mt-2 text-sm leading-6 text-muted">Return to saved items and compare before buying.</p>
        </Link>
        <button
          type="button"
          onClick={async () => {
            await logout();
            window.location.assign("/");
          }}
          className="surface-card p-5 text-left transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]"
        >
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">Sign out</p>
          <p className="mt-2 text-sm leading-6 text-muted">End your session and return to the storefront.</p>
        </button>
      </section>
    </div>
  );
}
