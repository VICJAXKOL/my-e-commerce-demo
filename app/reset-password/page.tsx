"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AuthNotice, AuthShell } from "../../components/AuthShell";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token")?.trim() ?? "";
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(data.error ?? "Unable to reset password.");
        return;
      }
      setSuccess(true);
    } catch {
      setError("Unable to reset password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell
      eyebrow="Choose a new password"
      title="Set a fresh password for your account"
      description="Use the secure reset link you received to create a new password and get back into your account."
      supportLabel="Need to restart the flow?"
      supportHref="/forgot-password"
      supportText="Request another reset link"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-600)]">Reset password</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">Create your new password</h2>
      <p className="mt-3 text-sm leading-7 text-muted">
        Pick a new password with at least 8 characters. Once updated, you’ll be able to sign in with it immediately.
      </p>

      <div className="mt-6 space-y-4">
        {!token && <AuthNotice tone="error">This password reset link is missing a token.</AuthNotice>}
        {error && <AuthNotice tone="error">{error}</AuthNotice>}
        {success && <AuthNotice tone="success">Password updated. You can sign in with your new password now.</AuthNotice>}
      </div>

      {!success && (
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="reset-password" className="block text-sm font-semibold text-zinc-900 dark:text-white">
              New password
            </label>
            <input
              id="reset-password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              placeholder="At least 8 characters"
              className="input-control focus-ring mt-2 px-4 py-3 text-sm"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !token}
            className="btn-primary focus-ring w-full px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Updating..." : "Update password"}
          </button>
        </form>
      )}

      <p className="mt-6 text-sm text-muted">
        Ready to sign in?{" "}
        <Link href="/login" className="font-semibold text-[var(--brand-600)] hover:text-[var(--brand-700)]">
          Back to sign in
        </Link>
      </p>
    </AuthShell>
  );
}
