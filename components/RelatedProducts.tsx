import { getRelatedProducts } from "../lib/products";
import ProductCard from "./ProductCard";

export function RelatedProducts({ productId }: { productId: string }) {
  const related = getRelatedProducts(productId, 4);

  if (related.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-600)]">Keep exploring</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">Related products worth a look</h2>
        </div>
        <p className="text-sm text-muted">More items from the same category to keep your shortlist moving.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {related.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
