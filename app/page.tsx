import Link from "next/link";
import Hero from "../components/Hero";
import ShowcaseSlider from "../components/ShowcaseSlider";

const shoppingSteps = [
  {
    title: "1. Discover",
    text: "Browse categories and use filters to quickly find products that match your needs.",
  },
  {
    title: "2. Compare",
    text: "Review product details, ratings, and related items before you decide.",
  },
  {
    title: "3. Checkout",
    text: "Add to cart, update quantities in one place, and complete checkout in a few steps.",
  },
];

const trustPoints = [
  {
    label: "Clear Product Info",
    description: "Simple descriptions and pricing so you can make confident decisions.",
  },
  {
    label: "Fast Navigation",
    description: "Straightforward pages designed to reduce clicks and speed up shopping.",
  },
  {
    label: "Cart Control",
    description: "Easily adjust cart quantities, remove items, and review totals before checkout.",
  },
  {
    label: "Helpful Support",
    description: "Quick access to FAQ and contact pages whenever you need help.",
  },
];

const quickFaqs = [
  {
    q: "Can I browse before creating an account?",
    a: "Yes. You can explore products and categories first, then proceed when ready.",
  },
  {
    q: "Where should I go for full product details?",
    a: "Use the Products page for the complete catalog, detailed information, and add-to-cart actions.",
  },
  {
    q: "Can I edit my cart before checkout?",
    a: "Yes. You can change item quantity or remove products directly from the cart page.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-zinc-900 sm:text-3xl">Welcome To MyShop</h1>
          <p className="mt-4 text-sm leading-7 text-zinc-600 sm:text-base">
            MyShop is a curated e-commerce experience built for fast browsing, trusted product quality,
            and smooth checkout. Instead of showing the full inventory here, this page gives you a clear
            overview of what the store offers and what kind of shopping experience you can expect.
          </p>
          <p className="mt-3 text-sm leading-7 text-zinc-600 sm:text-base">
            Use the Products page to explore the complete catalog, compare options, and add items to your
            cart when you are ready.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
            >
              View Full Products
            </Link>
            <Link
              href="/categories"
              className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
            >
              Browse Categories
            </Link>
          </div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <article className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
            <h2 className="text-base font-semibold text-zinc-900">Curated Selection</h2>
            <p className="mt-2 text-sm text-zinc-600">
              Focused categories with practical products instead of an overwhelming catalog.
            </p>
          </article>
          <article className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
            <h2 className="text-base font-semibold text-zinc-900">Simple Shopping Flow</h2>
            <p className="mt-2 text-sm text-zinc-600">
              Clean navigation, quick cart management, and a straightforward checkout experience.
            </p>
          </article>
          <article className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
            <h2 className="text-base font-semibold text-zinc-900">Quality First</h2>
            <p className="mt-2 text-sm text-zinc-600">
              Product categories selected around reliability, comfort, and daily usefulness.
            </p>
          </article>
        </section>

        <section className="mt-8">
          <ShowcaseSlider />
        </section>

        <section className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-zinc-900 sm:text-2xl">How Shopping Works</h2>
            <Link href="/products" className="text-sm font-medium text-zinc-700 hover:text-zinc-900">
              Start Browsing
            </Link>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {shoppingSteps.map((step) => (
              <article key={step.title} className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <h3 className="text-base font-semibold text-zinc-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-zinc-900 sm:text-2xl">Why People Use MyShop</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {trustPoints.map((point) => (
              <article key={point.label} className="rounded-xl border border-zinc-200 bg-white p-4">
                <h3 className="text-base font-semibold text-zinc-900">{point.label}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{point.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-zinc-900 sm:text-2xl">Quick Answers</h2>
            <Link href="/faq" className="text-sm font-medium text-zinc-700 hover:text-zinc-900">
              Full FAQ
            </Link>
          </div>
          <div className="mt-5 space-y-4">
            {quickFaqs.map((faq) => (
              <article key={faq.q} className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <h3 className="text-base font-semibold text-zinc-900">{faq.q}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{faq.a}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-900 p-6 text-white">
          <h2 className="text-xl font-semibold sm:text-2xl">Ready To Start Shopping?</h2>
          <p className="mt-3 text-sm text-zinc-300 sm:text-base">
            Jump to the Products page for the full list, details, and add-to-cart options.
          </p>
          <div className="mt-5">
            <Link
              href="/products"
              className="inline-flex rounded-md bg-white px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-100"
            >
              Explore Products
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

