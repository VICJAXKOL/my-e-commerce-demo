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
      <div className="mx-auto max-w-xl pt-20">
        <section className="surface-card rounded-2xl p-8">
          <h1 className="text-2xl font-semibold text-zinc-900">Verify Your Email</h1>
          <p className="mt-2 text-sm text-zinc-600">
            We sent a verification link to <span className="font-medium text-zinc-900">{verificationSentTo}</span>.
          </p>
          <p className="mt-3 text-sm text-zinc-600">
            You need to verify your email before you can sign in.
          </p>

          {previewUrl && (
            <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              Email delivery is not configured here yet. Use{" "}
              <a href={previewUrl} className="font-semibold underline underline-offset-2">
                this verification link
              </a>
              .
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/login" className="btn-primary rounded-lg px-4 py-2 text-sm font-semibold">
              Go to Sign In
            </Link>
            <Link href="/forgot-password" className="btn-outline rounded-lg px-4 py-2 text-sm">
              Reset Password
            </Link>
          </div>
        </section>
      </div>
    );
  }

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
