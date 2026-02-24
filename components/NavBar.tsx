"use client";

import Link from "next/link";
import React from "react";
import { useCart } from "../context/CartContext";

export default function NavBar() {
  const { items } = useCart();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const count = items.reduce((s, i) => s + i.quantity, 0);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-black/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-lg font-bold tracking-tight text-zinc-900">
            MyShop
          </Link>
          <div className="hidden items-center gap-6 md:flex">
            <Link href="/products" className="text-sm text-muted hover:text-zinc-900">
              Products
            </Link>
            <Link href="/categories" className="text-sm text-muted hover:text-zinc-900">
              Categories
            </Link>
            <Link href="/about" className="text-sm text-muted hover:text-zinc-900">
              About
            </Link>
          </div>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <Link href="/faq" className="text-sm text-muted hover:text-zinc-900">
            Help
          </Link>
          <Link href="/contact" className="text-sm text-muted hover:text-zinc-900">
            Contact
          </Link>
          <Link href="/cart" className="focus-ring rounded-md px-2 py-1 text-sm font-medium text-zinc-900">
            Cart ({count})
          </Link>
        </div>

        <button
          type="button"
          className="focus-ring inline-flex items-center justify-center rounded-md border border-zinc-300 p-2 text-zinc-700 hover:bg-zinc-100 md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="fade-in-up border-t border-black/10 bg-white px-4 pb-4 pt-3 md:hidden">
          <div className="flex flex-col gap-3 text-sm">
            <Link href="/products" onClick={closeMenu} className="text-muted hover:text-zinc-900">
              Products
            </Link>
            <Link href="/categories" onClick={closeMenu} className="text-muted hover:text-zinc-900">
              Categories
            </Link>
            <Link href="/about" onClick={closeMenu} className="text-muted hover:text-zinc-900">
              About
            </Link>
            <Link href="/faq" onClick={closeMenu} className="text-muted hover:text-zinc-900">
              Help
            </Link>
            <Link href="/contact" onClick={closeMenu} className="text-muted hover:text-zinc-900">
              Contact
            </Link>
            <Link href="/cart" onClick={closeMenu} className="btn-outline w-fit px-3 py-1.5 font-medium text-zinc-900">
              Cart ({count})
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
