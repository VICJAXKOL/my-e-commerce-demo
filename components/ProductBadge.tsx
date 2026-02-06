export function ProductBadge({ badge }: { badge?: string }) {
  if (!badge) return null;
  const colors = {
    Sale: "bg-red-500",
    New: "bg-blue-500",
    Popular: "bg-green-500",
  };
  return (
    <span
      className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold text-white rounded ${
        colors[badge as keyof typeof colors] || "bg-gray-500"
      }`}
    >
      {badge}
    </span>
  );
}
