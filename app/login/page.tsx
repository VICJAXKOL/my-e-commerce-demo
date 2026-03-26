"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { AuthNotice, AuthShell } from "../../components/AuthShell";

export default function LoginPage() {
  const { login } = useAuth();
  const searchParams = useSearchParams();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [requiresVerification, setRequiresVerification] = React.useState(false);
  const [isResending, setIsResending] = React.useState(false);
  const [notice, setNotice] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setNotice(null);
    setPreviewUrl(null);
    setRequiresVerification(false);
    setIsSubmitting(true);
    const result = await login(email, password);
    setIsSubmitting(false);
    if (!result.ok) {
      setError(result.error ?? "Unable to sign in.");
      setPreviewUrl(result.previewUrl ?? null);
      setRequiresVerification(Boolean(result.requiresVerification));
      return;
    }
    const next = searchParams.get("next") || "/";
    window.location.assign(next);
  };

  const handleResendVerification = async () => {
    setNotice(null);
    setPreviewUrl(null);
    setIsResending(true);
    try {
      const response = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json()) as { error?: string; previewUrl?: string };
      if (!response.ok) {
        setError(data.error ?? "Unable to resend verification email.");
        return;
      }
      setNotice("Verification email sent. Check your inbox.");
      setPreviewUrl(data.previewUrl ?? null);
    } catch {
      setError("Unable to resend verification email.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <AuthShell
      eyebrow="Sign in"
      title="Welcome back to MyShop"
      description="Access your account, review orders, and continue shopping with a calmer, more guided sign-in flow."
      supportLabel="Need help before you sign in?"
      supportHref="/contact"
      supportText="Contact support"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-600)]">Account access</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">Sign in to continue</h2>
      <p className="mt-3 text-sm leading-7 text-muted">
        Use the email address you registered with. If your password or verification status needs attention, we&apos;ll guide you from here.
      </p>

      <div className="mt-6 space-y-4">
        {error && <AuthNotice tone="error">{error}</AuthNotice>}
        {notice && <AuthNotice tone="success">{notice}</AuthNotice>}
        {previewUrl && (
          <AuthNotice tone="warning">
            Email delivery isn&apos;t configured here yet. Use{" "}
            <a href={previewUrl} className="font-semibold underline underline-offset-2">
              this link
            </a>
            .
          </AuthNotice>
        )}
      </div>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login-email" className="block text-sm font-semibold text-zinc-900 dark:text-white">
            Email address
          </label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            className="input-control focus-ring mt-2 px-4 py-3 text-sm"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div>
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="login-password" className="block text-sm font-semibold text-zinc-900 dark:text-white">
              Password
            </label>
            <Link href="/forgot-password" className="text-sm font-semibold text-[var(--brand-600)] hover:text-[var(--brand-700)]">
              Forgot password?
            </Link>
          </div>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="Enter your password"
            className="input-control focus-ring mt-2 px-4 py-3 text-sm"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary focus-ring w-full px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {requiresVerification && (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleResendVerification}
            disabled={isResending || !email.trim()}
            className="btn-outline focus-ring px-4 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isResending ? "Sending..." : "Resend verification email"}
          </button>
        </div>
      )}

      <p className="mt-6 text-sm text-muted">
        New here?{" "}
        <Link href="/register" className="font-semibold text-[var(--brand-600)] hover:text-[var(--brand-700)]">
          Create an account
        </Link>
      </p>
    </AuthShell>
  );
}
