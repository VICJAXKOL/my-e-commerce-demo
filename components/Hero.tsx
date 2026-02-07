import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-slate-700 opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-slate-700 opacity-20 blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-5xl text-center">
        {/* Badge */}
        <div className="mb-6 inline-block">
          <span className="rounded-full bg-slate-700 px-4 py-1.5 text-sm font-medium text-slate-200">
            ✨ Discover Our Latest Collection
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
          Shop Premium
          <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Products
          </span>
        </h1>

        {/* Subheading */}
        <p className="mb-8 text-lg text-slate-300 sm:text-xl max-w-2xl mx-auto">
          Explore our curated selection of high-quality products across 8 categories. From fashion to electronics, find everything you need.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-lg bg-cyan-500 px-8 py-4 font-semibold text-slate-900 transition-all duration-200 hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/50 transform hover:-translate-y-1"
          >
            Shop Now
            <svg
              className="ml-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
          <Link
            href="/categories"
            className="inline-flex items-center justify-center rounded-lg border-2 border-slate-500 px-8 py-4 font-semibold text-slate-200 transition-all duration-200 hover:border-slate-300 hover:bg-slate-700/50 hover:shadow-lg transform hover:-translate-y-1"
          >
            Browse Categories
          </Link>
        </div>

        {/* Stats/Trust signals */}
        <div className="mt-16 grid grid-cols-3 gap-8 sm:gap-12">
          <div className="border-l border-slate-600 pl-6 text-left">
            <div className="text-3xl font-bold text-cyan-400">32+</div>
            <p className="text-sm text-slate-400">Premium Products</p>
          </div>
          <div className="border-l border-slate-600 pl-6 text-left">
            <div className="text-3xl font-bold text-cyan-400">8</div>
            <p className="text-sm text-slate-400">Categories</p>
          </div>
          <div className="border-l border-slate-600 pl-6 text-left">
            <div className="text-3xl font-bold text-cyan-400">4.5★</div>
            <p className="text-sm text-slate-400">Avg Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}
