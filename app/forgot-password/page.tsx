"use client";

import React from "react";
import Link from "next/link";
import { AuthNotice, AuthShell } from "../../components/AuthShell";

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
    <AuthShell
      eyebrow="Password recovery"
      title="Reset your password calmly"
      description="Enter your email and we’ll guide you back into your account with a secure reset link."
      supportLabel="Remembered your password?"
      supportHref="/login"
      supportText="Go back to sign in"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-600)]">Account recovery</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">Send a reset link</h2>
      <p className="mt-3 text-sm leading-7 text-muted">
        We’ll email you a secure link if an account exists for that address, so you can choose a new password safely.
      </p>

      <div className="mt-6 space-y-4">
        {error && <AuthNotice tone="error">{error}</AuthNotice>}
        {message && <AuthNotice tone="success">{message}</AuthNotice>}
        {previewUrl && (
          <AuthNotice tone="warning">
            Email delivery isn&apos;t configured here yet. Use{" "}
            <a href={previewUrl} className="font-semibold underline underline-offset-2">
              this reset link
            </a>
            .
          </AuthNotice>
        )}
      </div>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="forgot-email" className="block text-sm font-semibold text-zinc-900 dark:text-white">
            Email address
          </label>
          <input
            id="forgot-email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            className="input-control focus-ring mt-2 px-4 py-3 text-sm"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary focus-ring w-full px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Sending..." : "Send reset link"}
        </button>
      </form>

      <p className="mt-6 text-sm text-muted">
        Need to sign in instead?{" "}
        <Link href="/login" className="font-semibold text-[var(--brand-600)] hover:text-[var(--brand-700)]">
          Back to sign in
        </Link>
      </p>
    </AuthShell>
  );
}
