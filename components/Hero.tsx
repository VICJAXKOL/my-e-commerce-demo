import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl text-center">
        <div className="mb-6 inline-block rounded-full border border-slate-700 bg-slate-800/70 px-4 py-1.5 text-sm font-medium text-slate-200">
          Discover curated essentials for everyday life
        </div>

        <h1 className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
          Shop Premium
          <span className="block bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
            Products
          </span>
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-300 sm:text-xl">
          Browse a modern storefront designed for fast discovery, trusted quality, and smooth checkout.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/products" className="btn-primary inline-flex items-center justify-center px-8 py-3 font-semibold">
            Shop Now
          </Link>
          <Link href="/categories" className="btn-outline inline-flex items-center justify-center px-8 py-3 font-semibold text-slate-100">
            Browse Categories
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 sm:gap-12">
          <div className="border-l border-slate-700 pl-6 text-left">
            <div className="text-3xl font-bold text-cyan-300">32+</div>
            <p className="text-sm text-slate-400">Premium Products</p>
          </div>
          <div className="border-l border-slate-700 pl-6 text-left">
            <div className="text-3xl font-bold text-cyan-300">8</div>
            <p className="text-sm text-slate-400">Categories</p>
          </div>
          <div className="border-l border-slate-700 pl-6 text-left">
            <div className="text-3xl font-bold text-cyan-300">4.5</div>
            <p className="text-sm text-slate-400">Average Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}
