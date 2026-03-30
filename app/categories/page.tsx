import Link from "next/link";
import PageIntro from "../../components/PageIntro";
import ProductCard from "../../components/ProductCard";
import { products } from "../../lib/products";

const categories = [
  "Apparel",
  "Footwear",
  "Home",
  "Electronics",
  "Sports & Fitness",
  "Beauty & Personal Care",
  "Accessories",
  "Books & Entertainment",
] as const;

const categoryDescriptions: Record<(typeof categories)[number], string> = {
  Apparel: "Everyday wardrobe staples, statement pieces, and easy outfit refreshes.",
  Footwear: "Comfort-first pairs, weekend favorites, and polished everyday options.",
  Home: "Useful upgrades and cozy details for the spaces you live in most.",
  Electronics: "Smart gear and practical tech picks for work, home, and play.",
  "Sports & Fitness": "Training essentials, recovery helpers, and active lifestyle gear.",
  "Beauty & Personal Care": "Self-care staples and beauty picks that fit into a daily routine.",
  Accessories: "The finishing touches that pull a look or daily carry together.",
  "Books & Entertainment": "Relaxing reads and fun picks for downtime and gifting.",
};

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 pt-20 sm:px-6">
      <PageIntro
        eyebrow="Categories"
        title="Shop the catalog by collection"
        description="Browse focused groups of products so it&apos;s easier to jump into the part of the store that matters most to you."
        highlights={[
          { title: "Curated groups", text: "Products are grouped to reduce overwhelm and help shoppers move faster." },
          { title: "Deeper browsing", text: "Each section gives you a quick product preview before going deeper." },
          { title: "Easy entry points", text: "Use categories as a shortcut into the wider product listing experience." },
        ]}
        actions={
          <Link href="/products" className="btn-outline focus-ring px-5 py-3 text-sm font-semibold">
            View all products
          </Link>
        }
      />

      {categories.map((category) => {
        const categoryProducts = products.filter((product) => product.category === category);

        return (
          <section key={category} className="space-y-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-white">{category}</h2>
                <p className="mt-1 text-sm text-slate-300">{categoryDescriptions[category]}</p>
                <p className="mt-1 text-sm text-muted">
                  {categoryProducts.length} curated {category.toLowerCase()} items ready to explore.
                </p>
              </div>
              <Link
                href={`/products?category=${encodeURIComponent(category)}`}
                className="btn-ghost focus-ring w-fit px-3 py-2 text-sm font-semibold text-[var(--brand-600)]"
              >
                View category →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
