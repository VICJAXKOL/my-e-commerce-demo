"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const searchParams = useSearchParams();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    const result = await login(email, password);
    setIsSubmitting(false);
    if (!result.ok) {
      setError(result.error ?? "Unable to sign in.");
      return;
    }
    const next = searchParams.get("next") || "/";
    window.location.assign(next);
  };

  return (
    <div className="mx-auto max-w-xl pt-20">
      <section className="surface-card rounded-2xl p-8">
        <h1 className="text-2xl font-semibold text-zinc-900">Sign In</h1>
        <p className="mt-2 text-sm text-zinc-600">Access your account, orders, and saved details.</p>

        {error && (
          <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            autoComplete="email"
            required
            placeholder="Email address"
            className="focus-ring w-full rounded-lg border border-zinc-300 px-4 py-2"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            autoComplete="current-password"
            required
            placeholder="Password"
            className="focus-ring w-full rounded-lg border border-zinc-300 px-4 py-2"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full rounded-lg px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-5 text-sm text-zinc-600">
          New here?{" "}
          <Link href="/register" className="font-semibold text-sky-700 hover:text-sky-900">
            Create an account
          </Link>
        </p>
      </section>
    </div>
  );
}
