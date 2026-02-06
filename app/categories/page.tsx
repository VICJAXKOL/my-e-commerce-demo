import Link from "next/link";
import { products } from "../../lib/products";
import ProductCard from "../../components/ProductCard";

export default function CategoriesPage() {
  const categories = ["Apparel", "Footwear", "Home", "Electronics", "Sports & Fitness", "Beauty & Personal Care", "Accessories", "Books & Entertainment"] as const;

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="mb-6 text-2xl font-semibold">Shop by Category</h1>

      {categories.map((category) => {
        const categoryProducts = products.filter((p) => p.category === category);
        return (
          <section key={category} className="mt-8">
            <h2 className="mb-4 text-xl font-semibold text-zinc-800">{category}</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {categoryProducts.map((p) => (
                <div key={p.id}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
