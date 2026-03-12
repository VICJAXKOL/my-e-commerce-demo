"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const searchParams = useSearchParams();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    const result = await register(email, password);
    setIsSubmitting(false);
    if (!result.ok) {
      setError(result.error ?? "Unable to create account.");
      return;
    }
    const next = searchParams.get("next") || "/";
    window.location.assign(next);
  };

  return (
    <div className="mx-auto max-w-xl pt-20">
      <section className="surface-card rounded-2xl p-8">
        <h1 className="text-2xl font-semibold text-zinc-900">Create Account</h1>
        <p className="mt-2 text-sm text-zinc-600">Save your details and track orders in one place.</p>

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
            autoComplete="new-password"
            required
            placeholder="Password (min 8 chars)"
            className="focus-ring w-full rounded-lg border border-zinc-300 px-4 py-2"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full rounded-lg px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-5 text-sm text-zinc-600">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-sky-700 hover:text-sky-900">
            Sign in
          </Link>
        </p>
      </section>
    </div>
  );
}
