import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-black/10 bg-slate-950 py-10 text-white">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-semibold">Shop</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>
                <Link href="/products" className="hover:text-white">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-white">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/products?badge=Sale" className="hover:text-white">
                  Sale Items
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Support</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white">
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Company</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Newsletter</h3>
            <p className="mt-3 text-sm text-slate-300">Subscribe for updates and offers.</p>
            <input
              id="newsletter-email"
              name="newsletterEmail"
              type="email"
              placeholder="Your email"
              autoComplete="email"
              className="focus-ring mt-3 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white"
            />
            <button className="btn-primary mt-3 w-full px-3 py-2 text-sm font-semibold">Subscribe</button>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-800 pt-5 text-center text-sm text-slate-400">
          <p>&copy; 2026 MyShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
