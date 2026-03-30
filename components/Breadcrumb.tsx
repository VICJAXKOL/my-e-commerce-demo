import Link from "next/link";

export function Breadcrumb({ items }: { items: { label: string; href: string }[] }) {
  return (
    <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-300">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && (
            <span aria-hidden="true" className="text-[10px] text-slate-500">
              /
            </span>
          )}
          <Link
            href={item.href}
            className={`transition hover:text-white ${index === items.length - 1 ? "font-medium text-white" : ""}`}
          >
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}
