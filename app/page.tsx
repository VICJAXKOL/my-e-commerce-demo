import Link from "next/link";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import ShowcaseSlider from "../components/ShowcaseSlider";
import { products } from "../lib/products";

const shoppingSteps = [
  {
    title: "Discover faster",
    text: "Jump into curated categories, trending products, and search tools that reduce browsing friction.",
  },
  {
    title: "Shop with confidence",
    text: "See pricing, ratings, stock, and delivery reassurance early so decisions feel easier.",
  },
  {
    title: "Checkout with clarity",
    text: "Move from cart to payment through a more guided and trustworthy shopping flow.",
  },
];

const storeMetrics = [
  { label: "Curated products", value: `${products.length}+` },
  { label: "Core categories", value: "8" },
  { label: "Average rating", value: "4.5" },
];

const categoryHighlights = [
  {
    category: "Apparel",
    eyebrow: "Style essentials",
    description: "Modern staples built for comfort, layering, and everyday wear.",
  },
  {
    category: "Electronics",
    eyebrow: "Smart upgrades",
    description: "Reliable tech accessories and devices designed for daily convenience.",
  },
  {
    category: "Home",
    eyebrow: "Home favorites",
    description: "Useful pieces that bring more calm, order, and comfort into your space.",
  },
  {
    category: "Sports & Fitness",
    eyebrow: "Move better",
    description: "Training gear and recovery tools for healthier routines and better momentum.",
  },
];

const quickAnswers = [
  {
    question: "Can I browse without creating an account?",
    answer: "Yes. Explore the full catalog first and sign in only when you are ready to save details or track orders.",
  },
  {
    question: "Where do I see the full product collection?",
    answer: "Use the Products page for the complete catalog, filter tools, and product detail pages.",
  },
  {
    question: "Can I still adjust my cart before checkout?",
    answer: "Yes. The cart is designed to let shoppers review, update, and remove items before payment.",
  },
];

const featuredProducts = products.filter((product) => product.badge === "Popular" || product.badge === "New").slice(0, 4);

function getCategoryPreview(category: string) {
  return products.find((product) => product.category === category);
}

export default function Home() {
  return (
    <>
      <Hero />

      <main className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6">
        <section className="grid gap-4 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="surface-card p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-600)]">New shopping experience</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              A more curated storefront for faster product discovery
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base">
              We are shaping MyShop into a cleaner, more premium shopping experience — one that helps people find
              products quickly, trust what they see, and move into checkout with less hesitation.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/products" className="btn-primary focus-ring px-5 py-3 text-sm font-semibold">
                Shop the collection
              </Link>
              <Link href="/products?badge=Popular" className="btn-outline focus-ring px-5 py-3 text-sm font-semibold">
                Explore popular picks
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {storeMetrics.map((metric) => (
              <article key={metric.label} className="surface-card flex items-center justify-between p-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">{metric.label}</p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">{metric.value}</p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-[linear-gradient(135deg,var(--brand-500),var(--brand-600))] opacity-15" />
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {categoryHighlights.map((item) => {
            const preview = getCategoryPreview(item.category);
            const productCount = products.filter((product) => product.category === item.category).length;
            const backgroundImage = preview?.image
              ? `linear-gradient(180deg, rgba(15, 23, 42, 0.12) 0%, rgba(15, 23, 42, 0.72) 100%), url(${preview.image})`
              : undefined;

            return (
              <Link
                key={item.category}
                href={`/products?category=${encodeURIComponent(item.category)}`}
                className="group surface-card relative min-h-[15rem] overflow-hidden p-5"
                style={backgroundImage ? { backgroundImage, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
              >
                {!backgroundImage && (
                  <div className="absolute inset-0 bg-[linear-gradient(160deg,color-mix(in_srgb,var(--brand-500)_16%,transparent),transparent_58%)]" />
                )}
                <div className="relative flex h-full flex-col justify-between">
                  <div>
                    <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${backgroundImage ? "text-white/80" : "text-[var(--brand-600)]"}`}>
                      {item.eyebrow}
                    </p>
                    <h2 className={`mt-3 text-2xl font-semibold tracking-tight ${backgroundImage ? "text-white" : "text-zinc-900 dark:text-white"}`}>
                      {item.category}
                    </h2>
                    <p className={`mt-3 max-w-xs text-sm leading-6 ${backgroundImage ? "text-white/85" : "text-muted"}`}>
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span className={`text-sm font-medium ${backgroundImage ? "text-white" : "text-zinc-900 dark:text-white"}`}>
                      {productCount} items
                    </span>
                    <span className={`text-sm font-semibold transition group-hover:translate-x-1 ${backgroundImage ? "text-white" : "text-[var(--brand-600)]"}`}>
                      Shop now →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </section>

        <section className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-600)]">Featured now</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">Popular and fresh arrivals</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                A quick entry point into the catalog with products that feel current, relevant, and easy to shop.
              </p>
            </div>
            <Link href="/products" className="btn-outline focus-ring w-fit px-4 py-2 text-sm font-semibold">
              View all products
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="surface-card overflow-hidden p-4 sm:p-6">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-600)]">Store highlights</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">A closer look at the catalog</h2>
            </div>
            <Link href="/categories" className="btn-ghost focus-ring w-fit px-3 py-2 text-sm font-semibold text-[var(--brand-600)]">
              Browse categories
            </Link>
          </div>
          <ShowcaseSlider />
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="surface-card p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-600)]">How it works</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">A calmer shopping flow</h2>
            <div className="mt-6 grid gap-4">
              {shoppingSteps.map((step, index) => (
                <article key={step.title} className="surface-soft flex gap-4 p-4 sm:p-5">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--brand-500),var(--brand-600))] text-sm font-semibold text-white shadow-[0_12px_24px_rgba(37,99,235,0.25)]">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{step.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="surface-card p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-600)]">Need quick answers?</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">Helpful before checkout</h2>
            <div className="mt-6 space-y-4">
              {quickAnswers.map((faq) => (
                <article key={faq.question} className="surface-soft p-4 sm:p-5">
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-white">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{faq.answer}</p>
                </article>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/faq" className="btn-outline focus-ring px-4 py-2 text-sm font-semibold">
                Visit FAQs
              </Link>
              <Link href="/contact" className="btn-ghost focus-ring px-4 py-2 text-sm font-semibold text-[var(--brand-600)]">
                Contact support
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
