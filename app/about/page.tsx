import Link from "next/link";
import AboutShowcase from "../../components/AboutShowcase";

const pillars = [
  {
    title: "Carefully Curated",
    text: "We choose products that balance quality, style, and real-life usefulness.",
  },
  {
    title: "Customer-First Flow",
    text: "From browsing to checkout, every page is designed to stay simple and fast.",
  },
  {
    title: "Reliable Support",
    text: "We keep help accessible with clear FAQs, support contacts, and transparent policies.",
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 pb-10 pt-20">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-6 text-white shadow-lg sm:p-10">
        <div className="absolute -right-16 -top-14 h-44 w-44 rounded-full bg-cyan-400/20 blur-2xl" />
        <div className="absolute -bottom-16 -left-14 h-44 w-44 rounded-full bg-blue-500/20 blur-2xl" />
        <div className="relative">
          <p className="text-sm uppercase tracking-widest text-cyan-300">Our Story</p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-5xl">About MyShop</h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-200 sm:text-base">
            MyShop is built to make online shopping feel clear, modern, and dependable. We focus on
            meaningful product choices, easy navigation, and a consistent checkout journey that saves
            time without reducing quality.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="rounded-md bg-cyan-400 px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-cyan-300"
            >
              View Products
            </Link>
            <Link
              href="/contact"
              className="rounded-md border border-zinc-500 px-4 py-2 text-sm font-semibold text-zinc-100 hover:bg-zinc-700"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {pillars.map((pillar) => (
          <article key={pillar.title} className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900">{pillar.title}</h2>
            <p className="mt-2 text-sm leading-7 text-zinc-600">{pillar.text}</p>
          </article>
        ))}
      </section>

      <section className="mt-8">
        <AboutShowcase />
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <article className="rounded-xl border border-zinc-200 bg-white p-5 text-center shadow-sm">
          <p className="text-3xl font-semibold text-zinc-900">8</p>
          <p className="mt-1 text-sm text-zinc-600">Core Categories</p>
        </article>
        <article className="rounded-xl border border-zinc-200 bg-white p-5 text-center shadow-sm">
          <p className="text-3xl font-semibold text-zinc-900">Fast</p>
          <p className="mt-1 text-sm text-zinc-600">Streamlined Shopping Flow</p>
        </article>
        <article className="rounded-xl border border-zinc-200 bg-white p-5 text-center shadow-sm">
          <p className="text-3xl font-semibold text-zinc-900">24/7</p>
          <p className="mt-1 text-sm text-zinc-600">Always-On Store Access</p>
        </article>
      </section>
    </main>
  );
}
