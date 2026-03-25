import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--border-subtle)] bg-[linear-gradient(180deg,#0f172a_0%,#020617_100%)] py-14 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-[1.2fr_repeat(3,1fr)]">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-sm font-bold text-white ring-1 ring-white/12">
                M
              </span>
              <div>
                <p className="text-base font-semibold tracking-tight">MyShop</p>
                <p className="text-sm text-slate-400">Curated everyday essentials</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-7 text-slate-300">
              A modern storefront built for fast product discovery, confident decisions, and a calmer checkout experience.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-xs text-slate-400">
              <span className="rounded-full border border-white/10 px-3 py-1.5">Secure checkout</span>
              <span className="rounded-full border border-white/10 px-3 py-1.5">Fast dispatch</span>
              <span className="rounded-full border border-white/10 px-3 py-1.5">Easy returns</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-200">Shop</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>
                <Link href="/products" className="transition hover:text-white">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="transition hover:text-white">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/products?badge=Sale" className="transition hover:text-white">
                  Sale Items
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-200">Support</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>
                <Link href="/contact" className="transition hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="transition hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/returns" className="transition hover:text-white">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/track" className="transition hover:text-white">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-200">Stay Updated</h3>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              Get product drops, offers, and useful store updates without the noise.
            </p>
            <input
              id="newsletter-email"
              name="newsletterEmail"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              className="input-control focus-ring mt-4 border-white/10 bg-white/5 px-4 py-3 text-sm text-white shadow-none placeholder:text-slate-400"
            />
            <button className="btn-primary mt-3 w-full px-4 py-3 text-sm font-semibold">Subscribe</button>
            <div className="mt-6">
              <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-200">Company</h4>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                <li>
                  <Link href="/about" className="transition hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <a href="#" className="transition hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:text-white">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 MyShop. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/returns" className="transition hover:text-white">
              Returns
            </Link>
            <Link href="/contact" className="transition hover:text-white">
              Support
            </Link>
            <Link href="/faq" className="transition hover:text-white">
              FAQs
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
