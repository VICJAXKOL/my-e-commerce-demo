"use client";

import Image from "next/image";
import React from "react";

type View = {
  key: string;
  label: string;
  className: string;
};

const views: View[] = [
  { key: "main", label: "Main", className: "object-contain p-6" },
  { key: "zoom", label: "Zoom", className: "object-cover scale-110" },
  { key: "detail", label: "Detail", className: "object-cover object-top scale-125" },
];

export function ProductMediaGallery({
  image,
  name,
}: {
  image?: string;
  name: string;
}) {
  const [active, setActive] = React.useState<View>(views[0]);

  if (!image) {
    return (
      <div className="surface-soft flex h-[26rem] items-center justify-center rounded-2xl border border-zinc-200">
        <p className="text-sm text-muted">No image available</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="surface-card relative h-[26rem] overflow-hidden rounded-2xl p-2">
        <div className="surface-soft relative h-full w-full overflow-hidden rounded-xl">
          <Image
            src={image}
            alt={name}
            fill
            className={`transition duration-300 ${active.className}`}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {views.map((view) => (
          <button
            key={view.key}
            type="button"
            onClick={() => setActive(view)}
            className={`focus-ring rounded-lg border px-3 py-2 text-sm ${
              active.key === view.key
                ? "border-sky-500 bg-sky-50 text-sky-800"
                : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
            }`}
          >
            {view.label}
          </button>
        ))}
      </div>
    </div>
  );
}
