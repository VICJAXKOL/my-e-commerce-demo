import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 border-t bg-white py-8">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
          <div>
            <h3 className="font-semibold">Shop</h3>
            <ul className="mt-2 space-y-1 text-sm text-zinc-600">
              <li>
                <Link href="/products" className="hover:text-black">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-black">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/products?badge=Sale" className="hover:text-black">
                  Sale Items
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Support</h3>
            <ul className="mt-2 space-y-1 text-sm text-zinc-600">
              <li>
                <Link href="/contact" className="hover:text-black">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-black">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-black">
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Company</h3>
            <ul className="mt-2 space-y-1 text-sm text-zinc-600">
              <li>
                <Link href="/about" className="hover:text-black">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Newsletter</h3>
            <p className="mt-2 text-sm text-zinc-600">Subscribe for updates and offers.</p>
            <input
              type="email"
              placeholder="Your email"
              className="mt-2 w-full rounded border px-2 py-1 text-sm"
            />
            <button className="mt-2 w-full rounded bg-black px-2 py-1 text-sm text-white">
              Subscribe
            </button>
          </div>
        </div>
        <div className="mt-6 border-t pt-4 text-center text-sm text-zinc-600">
          <p>&copy; 2026 MyShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
