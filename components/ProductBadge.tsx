export function ProductBadge({ badge }: { badge?: string }) {
  if (!badge) return null;
  const colors = {
    Sale: "bg-rose-600 text-white",
    New: "bg-sky-600 text-white",
    Popular: "bg-emerald-600 text-white",
  };
  return (
    <span
      className={`absolute left-4 top-4 z-30 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] shadow-md ring-1 ring-white/25 ${
        colors[badge as keyof typeof colors] || "bg-gray-500 text-white"
      }`}
    >
      {badge}
    </span>
  );
}
