import { getRelatedProducts } from "../lib/products";
import ProductCard from "./ProductCard";

export function RelatedProducts({ productId }: { productId: string }) {
  const related = getRelatedProducts(productId, 4);

  if (related.length === 0) return null;

  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold">Related Products</h2>
      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((p) => (
          <div key={p.id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
