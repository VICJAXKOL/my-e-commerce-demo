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
    <nav className="w-full border-b bg-white fixed top-0 left-0 z-50">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-lg font-bold">
            MyShop
          </Link>
          <div className="hidden items-center gap-6 md:flex">
            <Link href="/products" className="text-sm text-zinc-600 hover:text-zinc-900">
              Products
            </Link>
            <Link href="/categories" className="text-sm text-zinc-600 hover:text-zinc-900">
              Categories
            </Link>
            <Link href="/about" className="text-sm text-zinc-600 hover:text-zinc-900">
              About
            </Link>
          </div>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <Link href="/faq" className="text-sm text-zinc-600 hover:text-zinc-900">
            Help
          </Link>
          <Link href="/contact" className="text-sm text-zinc-600 hover:text-zinc-900">
            Contact
          </Link>
          <Link href="/cart" className="text-sm font-medium">
            Cart ({count})
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-zinc-300 p-2 text-zinc-700 hover:bg-zinc-100 md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span className="text-lg leading-none">{menuOpen ? "X" : "☰"}</span>
        </button>
      </div>

      {menuOpen && (
        <div className="border-t bg-white px-4 pb-4 pt-3 md:hidden">
          <div className="flex flex-col gap-3 text-sm">
            <Link href="/products" onClick={closeMenu} className="text-zinc-700 hover:text-zinc-900">
              Products
            </Link>
            <Link href="/categories" onClick={closeMenu} className="text-zinc-700 hover:text-zinc-900">
              Categories
            </Link>
            <Link href="/about" onClick={closeMenu} className="text-zinc-700 hover:text-zinc-900">
              About
            </Link>
            <Link href="/faq" onClick={closeMenu} className="text-zinc-700 hover:text-zinc-900">
              Help
            </Link>
            <Link href="/contact" onClick={closeMenu} className="text-zinc-700 hover:text-zinc-900">
              Contact
            </Link>
            <Link href="/cart" onClick={closeMenu} className="font-medium text-zinc-900">
              Cart ({count})
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
