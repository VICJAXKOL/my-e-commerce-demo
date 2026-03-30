import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,rgba(7,17,31,0.82)_0%,rgba(11,25,48,0.92)_48%,rgba(6,12,24,0.96)_100%)] px-4 py-24 shadow-[0_30px_80px_rgba(2,6,23,0.45)] sm:px-6 sm:py-32 lg:py-40">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-28 -top-28 h-72 w-72 rounded-full bg-cyan-400/16 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-blue-500/18 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/16 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-5xl text-center">
        <div className="mb-6 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-slate-200 backdrop-blur">
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

        <div className="flex w-full flex-col items-center gap-3 sm:w-auto">
          <Link href="/products" className="btn-primary focus-ring inline-flex w-full items-center justify-center px-6 py-3 font-semibold sm:w-auto sm:px-8">
            Shop Now
          </Link>
          <Link
            href="/categories"
            className="btn-outline focus-ring inline-flex w-full items-center justify-center border-white/15 bg-white/[0.04] px-6 py-3 font-semibold text-slate-100 hover:bg-white/[0.08] sm:w-auto sm:px-8"
          >
            Browse Categories
          </Link>
        </div>

        <div className="mt-12 grid gap-4 text-left sm:mt-16 sm:grid-cols-3 sm:gap-8 lg:gap-12">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left backdrop-blur">
            <div className="text-3xl font-bold text-cyan-300">32+</div>
            <p className="text-sm text-slate-400">Premium Products</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left backdrop-blur">
            <div className="text-3xl font-bold text-cyan-300">8</div>
            <p className="text-sm text-slate-400">Categories</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left backdrop-blur">
            <div className="text-3xl font-bold text-cyan-300">4.5</div>
            <p className="text-sm text-slate-400">Average Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}
