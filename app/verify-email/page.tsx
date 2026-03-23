"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

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
    <div className="mx-auto max-w-xl pt-20">
      <section className="surface-card rounded-2xl p-8">
        <h1 className="text-2xl font-semibold text-zinc-900">Verify Your Email</h1>

        {state === "verifying" && (
          <p className="mt-4 text-sm text-zinc-600">We are verifying your email now.</p>
        )}
        {state === "success" && (
          <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            Email verified. Redirecting you to your account.
          </div>
        )}
        {state === "error" && error && (
          <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/login" className="btn-primary rounded-lg px-4 py-2 text-sm font-semibold">
            Go to Sign In
          </Link>
          <Link href="/register" className="btn-outline rounded-lg px-4 py-2 text-sm">
            Create Account
          </Link>
        </div>
      </section>
    </div>
  );
}
