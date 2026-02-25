export function ProductBadge({ badge }: { badge?: string }) {
  if (!badge) return null;
  const colors = {
    Sale: "bg-rose-600",
    New: "bg-sky-600",
    Popular: "bg-emerald-600",
  };
  return (
    <span
      className={`absolute left-3 top-3 z-30 rounded-md px-2.5 py-1 text-xs font-semibold text-white shadow-md ring-1 ring-white/30 ${
        colors[badge as keyof typeof colors] || "bg-gray-500"
      }`}
    >
      {badge}
    </span>
  );
}
