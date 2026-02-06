"use client";

import Link from "next/link";
import React from "react";
import { useCart } from "../context/CartContext";

export default function NavBar() {
  const { items } = useCart();
  const count = items.reduce((s, i) => s + i.quantity, 0);
  return (
    <nav className="w-full border-b bg-white/80">
      <div className="mx-auto max-w-5xl flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-lg font-bold">
            MyShop
          </Link>
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
        <div className="flex items-center gap-4">
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
      </div>
    </nav>
  );
}
