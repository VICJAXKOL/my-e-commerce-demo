import Link from "next/link";
import { ReactNode } from "react";

type AuthShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  supportLabel: string;
  supportHref: string;
  supportText: string;
  children: ReactNode;
};

type AuthNoticeProps = {
  tone?: "error" | "success" | "warning" | "info";
  children: ReactNode;
};

const toneClasses: Record<NonNullable<AuthNoticeProps["tone"]>, string> = {
  error: "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-400/20 dark:bg-rose-500/10 dark:text-rose-200",
  success:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:text-emerald-200",
  warning:
    "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-amber-200",
  info: "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-400/20 dark:bg-sky-500/10 dark:text-sky-200",
};

export function AuthShell({
  eyebrow,
  title,
  description,
  supportLabel,
  supportHref,
  supportText,
  children,
}: AuthShellProps) {
  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 pt-20 sm:px-6 xl:grid-cols-[0.9fr_1.1fr]">
      <section className="surface-spotlight order-2 p-6 text-white sm:p-8 xl:order-1 xl:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-200">{eyebrow}</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">{description}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
          <div className="surface-spotlight-soft p-4">
            <p className="text-sm font-semibold text-white">Faster account access</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">Sign in, register, or recover access without guessing what happens next.</p>
          </div>
          <div className="surface-spotlight-soft p-4">
            <p className="text-sm font-semibold text-white">Clear status messaging</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">Verification, reset, and success states stay visible and easier to trust.</p>
          </div>
          <div className="surface-spotlight-soft p-4">
            <p className="text-sm font-semibold text-white">Shopping continuity</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">Your auth flow still connects smoothly back into products, cart, and account.</p>
          </div>
        </div>

        <div className="mt-8 rounded-[var(--radius-md)] border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
          <p className="text-sm text-slate-300">
            {supportLabel}{" "}
            <Link href={supportHref} className="font-semibold text-sky-200 hover:text-white">
              {supportText}
            </Link>
          </p>
        </div>
      </section>

      <section className="surface-card order-1 p-6 sm:p-8 xl:order-2 xl:p-10">{children}</section>
    </div>
  );
}

export function AuthNotice({ tone = "info", children }: AuthNoticeProps) {
  return <div className={`rounded-2xl border px-4 py-3 text-sm ${toneClasses[tone]}`}>{children}</div>;
}
