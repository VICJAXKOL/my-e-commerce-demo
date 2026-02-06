import Link from "next/link";

export function Breadcrumb({ items }: { items: { label: string; href: string }[] }) {
  return (
    <nav className="mb-4 flex gap-2 text-sm text-zinc-600">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          {i > 0 && <span>/</span>}
          <Link href={item.href} className="hover:text-black">
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}
