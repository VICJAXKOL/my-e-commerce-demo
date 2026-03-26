"use client";

import Image from "next/image";
import React from "react";

type View = {
  key: string;
  label: string;
  className: string;
  helper: string;
};

const views: View[] = [
  { key: "main", label: "Studio", className: "object-contain p-8", helper: "Clean full-product view" },
  { key: "zoom", label: "Close-up", className: "object-cover scale-110", helper: "Material and texture focus" },
  { key: "detail", label: "Detail", className: "object-cover object-top scale-125", helper: "A sharper product crop" },
];

export function ProductMediaGallery({ image, name }: { image?: string; name: string }) {
  const [active, setActive] = React.useState<View>(views[0]);

  if (!image) {
    return (
      <div className="surface-soft flex h-[30rem] items-center justify-center rounded-[1.75rem] p-6 text-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">Product media</p>
          <p className="mt-3 text-base text-muted">No image is available for this product yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="surface-card overflow-hidden p-3 sm:p-4">
        <div className="surface-soft relative h-[30rem] overflow-hidden rounded-[1.5rem] bg-[radial-gradient(circle_at_top,#ffffff,transparent_60%)]">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-4">
            <span className="rounded-full bg-white/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-700 backdrop-blur dark:bg-slate-900/80 dark:text-white">
              {active.label}
            </span>
            <span className="rounded-full bg-white/75 px-3 py-1 text-xs text-muted backdrop-blur dark:bg-slate-900/70 dark:text-slate-300">
              {active.helper}
            </span>
          </div>

          <Image
            src={image}
            alt={name}
            fill
            className={`transition duration-500 ${active.className}`}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {views.map((view) => (
          <button
            key={view.key}
            type="button"
            onClick={() => setActive(view)}
            className={`focus-ring rounded-2xl border px-4 py-3 text-left transition ${
              active.key === view.key
                ? "border-[var(--brand-500)] bg-[color:color-mix(in_srgb,var(--brand-500)_10%,white)] text-[var(--brand-700)]"
                : "border-[var(--border-subtle)] bg-[var(--surface-1)] text-zinc-700 hover:bg-[var(--surface-2)] dark:text-white"
            }`}
          >
            <p className="text-sm font-semibold">{view.label}</p>
            <p className="mt-1 text-xs text-muted">{view.helper}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
