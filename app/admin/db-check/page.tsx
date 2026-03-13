"use client";

import React from "react";

type Counts = {
  users: number;
  orders: number;
  carts: number;
  cartItems: number;
};

type UserRow = {
  id: number;
  email: string;
  createdAt: string;
};

type OrderRow = {
  id: number;
  orderNumber: string;
  status: string;
  total: number;
  createdAt: string;
  userId: number | null;
  guestId: string | null;
};

export default function AdminDbCheckPage() {
  const [adminKey, setAdminKey] = React.useState("");
  const [counts, setCounts] = React.useState<Counts | null>(null);
  const [users, setUsers] = React.useState<UserRow[]>([]);
  const [orders, setOrders] = React.useState<OrderRow[]>([]);
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

  const fetchDetails = async () => {
    setError(null);
    setLoading(true);
    setUsers([]);
    setOrders([]);
    try {
      const response = await fetch("/api/admin/db-dump", {
        headers: { "x-admin-key": adminKey },
      });
      const data = (await response.json()) as { users?: UserRow[]; orders?: OrderRow[]; error?: string };
      if (!response.ok) {
        setError(data.error ?? "Unable to load details.");
        return;
      }
      setUsers(data.users ?? []);
      setOrders(data.orders ?? []);
    } catch {
      setError("Unable to load details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl pt-20">
      <section className="surface-card rounded-2xl p-8">
        <h1 className="text-2xl font-semibold text-zinc-900">DB Check</h1>
        <p className="mt-2 text-sm text-zinc-600">Enter your admin key to load counts and details.</p>

        <div className="mt-5 flex flex-col gap-3">
          <input
            type="password"
            placeholder="Admin key"
            className="focus-ring w-full rounded-lg border border-zinc-300 px-4 py-2"
            value={adminKey}
            onChange={(event) => setAdminKey(event.target.value)}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={fetchCounts}
              disabled={!adminKey || loading}
              className="btn-primary w-full rounded-lg px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Checking..." : "Check Counts"}
            </button>
            <button
              type="button"
              onClick={fetchDetails}
              disabled={!adminKey || loading}
              className="btn-outline w-full rounded-lg px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Loading..." : "Load Details"}
            </button>
          </div>
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

        {users.length > 0 && (
          <div className="mt-8">
            <h2 className="text-base font-semibold text-zinc-900">Users</h2>
            <div className="mt-3 overflow-x-auto rounded-lg border border-zinc-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-zinc-50 text-xs uppercase text-zinc-500">
                  <tr>
                    <th className="px-3 py-2">ID</th>
                    <th className="px-3 py-2">Email</th>
                    <th className="px-3 py-2">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-t border-zinc-100">
                      <td className="px-3 py-2">{user.id}</td>
                      <td className="px-3 py-2">{user.email}</td>
                      <td className="px-3 py-2">{new Date(user.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {orders.length > 0 && (
          <div className="mt-8">
            <h2 className="text-base font-semibold text-zinc-900">Orders</h2>
            <div className="mt-3 overflow-x-auto rounded-lg border border-zinc-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-zinc-50 text-xs uppercase text-zinc-500">
                  <tr>
                    <th className="px-3 py-2">Order</th>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2">Total</th>
                    <th className="px-3 py-2">User</th>
                    <th className="px-3 py-2">Guest</th>
                    <th className="px-3 py-2">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-t border-zinc-100">
                      <td className="px-3 py-2">{order.orderNumber}</td>
                      <td className="px-3 py-2">{order.status}</td>
                      <td className="px-3 py-2">{order.total}</td>
                      <td className="px-3 py-2">{order.userId ?? "-"}</td>
                      <td className="px-3 py-2">{order.guestId ?? "-"}</td>
                      <td className="px-3 py-2">{new Date(order.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
