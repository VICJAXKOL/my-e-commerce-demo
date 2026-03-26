"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AuthNotice, AuthShell } from "../../components/AuthShell";

type VerificationState = "idle" | "verifying" | "success" | "error";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token")?.trim() ?? "";
  const [state, setState] = React.useState<VerificationState>(token ? "verifying" : "error");
  const [error, setError] = React.useState<string | null>(token ? null : "This verification link is missing a token.");

  React.useEffect(() => {
    if (!token) return;

    let cancelled = false;

    const verify = async () => {
      setState("verifying");
      setError(null);

      try {
        const response = await fetch("/api/auth/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const data = (await response.json()) as { error?: string };
        if (!response.ok) {
          if (!cancelled) {
            setState("error");
            setError(data.error ?? "Unable to verify email.");
          }
          return;
        }
        if (!cancelled) {
          setState("success");
          window.setTimeout(() => {
            window.location.assign("/account");
          }, 1200);
        }
      } catch {
        if (!cancelled) {
          setState("error");
          setError("Unable to verify email.");
        }
      }
    };

    void verify();

    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <AuthShell
      eyebrow="Email verification"
      title="Confirm your email and finish setup"
      description="We’re validating your email so your account can be trusted for sign-in, order updates, and account recovery."
      supportLabel="Need a new account instead?"
      supportHref="/register"
      supportText="Create account"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-600)]">Verification status</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">Checking your verification link</h2>

      <div className="mt-6 space-y-4">
        {state === "verifying" && (
          <AuthNotice tone="info">We&apos;re verifying your email now. This should only take a moment.</AuthNotice>
        )}
        {state === "success" && (
          <AuthNotice tone="success">Email verified. Redirecting you to your account.</AuthNotice>
        )}
        {state === "error" && error && <AuthNotice tone="error">{error}</AuthNotice>}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/login" className="btn-primary focus-ring px-5 py-3 text-sm font-semibold">
          Go to sign in
        </Link>
        <Link href="/register" className="btn-outline focus-ring px-5 py-3 text-sm font-semibold">
          Create account
        </Link>
      </div>
    </AuthShell>
  );
}
