"use client";

import React from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setPreviewUrl(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json()) as { error?: string; message?: string; previewUrl?: string };
      if (!response.ok) {
        setError(data.error ?? "Unable to send password reset email.");
        return;
      }
      setMessage(data.message ?? "If an account exists for that email, a password reset link has been sent.");
      setPreviewUrl(data.previewUrl ?? null);
    } catch {
      setError("Unable to send password reset email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl pt-20">
      <section className="surface-card rounded-2xl p-8">
        <h1 className="text-2xl font-semibold text-zinc-900">Reset Your Password</h1>
        <p className="mt-2 text-sm text-zinc-600">Enter your email and we will send you a reset link.</p>

        {error && (
          <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}
        {message && (
          <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {message}
          </div>
        )}
        {previewUrl && (
          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Email delivery is not configured here yet. Use{" "}
            <a href={previewUrl} className="font-semibold underline underline-offset-2">
              this reset link
            </a>
            .
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full rounded-lg px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="mt-5 text-sm text-zinc-600">
          Remembered your password?{" "}
          <Link href="/login" className="font-semibold text-sky-700 hover:text-sky-900">
            Back to sign in
          </Link>
        </p>
      </section>
    </div>
  );
}
