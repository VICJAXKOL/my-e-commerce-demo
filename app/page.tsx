import Link from "next/link";
import Hero from "../components/Hero";
import ShowcaseSlider from "../components/ShowcaseSlider";

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

