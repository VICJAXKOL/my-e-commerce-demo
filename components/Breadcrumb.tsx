import Link from "next/link";

export function Breadcrumb({ items }: { items: { label: string; href: string }[] }) {
  return (
    <nav className="flex flex-wrap items-center gap-2 text-sm text-muted">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          {i > 0 && <span className="text-[10px] text-soft">●</span>}
          <Link
            href={item.href}
            className={`transition hover:text-zinc-900 dark:hover:text-white ${i === items.length - 1 ? "font-medium text-zinc-900 dark:text-white" : ""}`}
          >
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}
