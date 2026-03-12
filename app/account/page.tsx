"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

export default function AccountPage() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl pt-20">
        <section className="surface-card rounded-2xl p-8 text-center text-sm text-zinc-600">
          Loading account...
        </section>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl pt-20">
        <section className="surface-card rounded-2xl p-8 text-center">
          <h1 className="text-2xl font-semibold text-zinc-900">Account</h1>
          <p className="mt-2 text-sm text-zinc-600">Sign in to view your orders and saved details.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="/login" className="btn-primary rounded-md px-4 py-2.5 text-sm font-semibold">
              Sign In
            </Link>
            <Link href="/register" className="btn-outline rounded-md px-4 py-2.5 text-sm">
              Create Account
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl pt-20">
      <section className="surface-card rounded-2xl p-8">
        <h1 className="text-2xl font-semibold text-zinc-900">Welcome back</h1>
        <p className="mt-2 text-sm text-zinc-600">Signed in as {user.email}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link href="/products" className="btn-primary rounded-md px-4 py-2.5 text-center text-sm font-semibold">
            Explore Products
          </Link>
          <Link href="/orders" className="btn-outline rounded-md px-4 py-2.5 text-center text-sm">
            View Orders
          </Link>
          <Link href="/" className="btn-outline rounded-md px-4 py-2.5 text-center text-sm">
            Go to Home
          </Link>
          <button
            type="button"
            onClick={async () => {
              await logout();
              window.location.assign("/");
            }}
            className="btn-outline rounded-md px-4 py-2.5 text-sm"
          >
            Sign Out
          </button>
        </div>
      </section>
    </div>
  );
}
