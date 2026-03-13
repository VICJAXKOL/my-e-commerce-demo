"use client";

import React from "react";

type Counts = {
  users: number;
  orders: number;
  carts: number;
  cartItems: number;
};

export default function AdminDbCheckPage() {
  const [adminKey, setAdminKey] = React.useState("");
  const [counts, setCounts] = React.useState<Counts | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const fetchCounts = async () => {
    setError(null);
    setLoading(true);
    setCounts(null);
    try {
      const response = await fetch("/api/admin/db-check", {
        headers: { "x-admin-key": adminKey },
      });
      const data = (await response.json()) as { counts?: Counts; error?: string };
      if (!response.ok) {
        setError(data.error ?? "Unable to load counts.");
        return;
      }
      setCounts(data.counts ?? null);
    } catch {
      setError("Unable to load counts.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl pt-20">
      <section className="surface-card rounded-2xl p-8">
        <h1 className="text-2xl font-semibold text-zinc-900">DB Check</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Enter your admin key to verify database counts.
        </p>

        <div className="mt-5 flex flex-col gap-3">
          <input
            type="password"
            placeholder="Admin key"
            className="focus-ring w-full rounded-lg border border-zinc-300 px-4 py-2"
            value={adminKey}
            onChange={(event) => setAdminKey(event.target.value)}
          />
          <button
            type="button"
            onClick={fetchCounts}
            disabled={!adminKey || loading}
            className="btn-primary w-full rounded-lg px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Checking..." : "Check Database"}
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        {counts && (
          <div className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
              <p className="text-zinc-500">Users</p>
              <p className="text-lg font-semibold text-zinc-900">{counts.users}</p>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
              <p className="text-zinc-500">Orders</p>
              <p className="text-lg font-semibold text-zinc-900">{counts.orders}</p>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
              <p className="text-zinc-500">Carts</p>
              <p className="text-lg font-semibold text-zinc-900">{counts.carts}</p>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
              <p className="text-zinc-500">Cart Items</p>
              <p className="text-lg font-semibold text-zinc-900">{counts.cartItems}</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
