"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { AuthNotice, AuthShell } from "../../components/AuthShell";

export default function RegisterPage() {
  const { register } = useAuth();
  const searchParams = useSearchParams();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [verificationSentTo, setVerificationSentTo] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setPreviewUrl(null);
    setIsSubmitting(true);
    const result = await register(email, password);
    setIsSubmitting(false);
    if (!result.ok) {
      setError(result.error ?? "Unable to create account.");
      return;
    }
    if (result.requiresVerification) {
      setVerificationSentTo(email.trim());
      setPreviewUrl(result.previewUrl ?? null);
      return;
    }
    const next = searchParams.get("next") || "/";
    window.location.assign(next);
  };

  if (verificationSentTo) {
    return (
      <AuthShell
        eyebrow="Verify email"
        title="Almost there — confirm your email"
        description="We’ve sent a verification link so you can activate your account and keep shopping without interruptions."
        supportLabel="Need a different route?"
        supportHref="/forgot-password"
        supportText="Reset your password"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-600)]">Verification required</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">Check your inbox</h2>
        <p className="mt-3 text-sm leading-7 text-muted">
          We sent a verification link to <span className="font-semibold text-zinc-900 dark:text-white">{verificationSentTo}</span>. Once you verify, you’ll be able to sign in and access your account.
        </p>

        {previewUrl && (
          <div className="mt-6">
            <AuthNotice tone="warning">
              Email delivery isn&apos;t configured here yet. Use{" "}
              <a href={previewUrl} className="font-semibold underline underline-offset-2">
                this verification link
              </a>
              .
            </AuthNotice>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/login" className="btn-primary focus-ring px-5 py-3 text-sm font-semibold">
            Go to sign in
          </Link>
          <Link href="/forgot-password" className="btn-outline focus-ring px-5 py-3 text-sm font-semibold">
            Reset password
          </Link>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      eyebrow="Create account"
      title="Set up your MyShop account"
      description="Create your account to save details, track orders, and move through checkout with less friction."
      supportLabel="Already have an account?"
      supportHref="/login"
      supportText="Sign in instead"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-600)]">Registration</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">Create your account</h2>
      <p className="mt-3 text-sm leading-7 text-muted">
        We’ll ask for just enough to get you started. Email verification helps protect your account and keeps recovery simple.
      </p>

      {error && (
        <div className="mt-6">
          <AuthNotice tone="error">{error}</AuthNotice>
        </div>
      )}

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="register-email" className="block text-sm font-semibold text-zinc-900 dark:text-white">
            Email address
          </label>
          <input
            id="register-email"
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
          <label htmlFor="register-password" className="block text-sm font-semibold text-zinc-900 dark:text-white">
            Password
          </label>
          <input
            id="register-password"
            type="password"
            autoComplete="new-password"
            required
            placeholder="At least 8 characters"
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
          {isSubmitting ? "Creating account..." : "Create account"}
        </button>
      </form>
    </AuthShell>
  );
}
