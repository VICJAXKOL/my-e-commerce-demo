"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { formatNgn } from "../lib/currency";
import { getProductById } from "../lib/products";

export default function WishlistClient() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const products = wishlist
    .map((id) => getProductById(id))
    .filter((p): p is NonNullable<ReturnType<typeof getProductById>> => Boolean(p));

  if (products.length === 0) {
    return (
      <section className="surface-card p-8 text-center sm:p-10">
        <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">Your wishlist is empty</h2>
        <p className="mt-3 text-sm leading-7 text-muted">
          Save products you like so you can compare options, revisit favorites, and buy them later.
        </p>
        <Link href="/products" className="btn-primary focus-ring mt-6 inline-flex px-5 py-3 text-sm font-semibold">
          Explore products
        </Link>
      </section>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <article key={product.id} className="surface-card flex flex-col p-4 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]">
          <div className="surface-soft relative h-52 overflow-hidden rounded-2xl">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            ) : null}
          </div>

          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted">{product.category}</p>
          <h3 className="mt-2 line-clamp-2 text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">{product.name}</h3>
          <p className="mt-3 text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">{formatNgn(product.price)}</p>

          <div className="mt-auto flex gap-2 pt-4">
            <Link href={`/products/${product.id}`} className="btn-outline focus-ring px-4 py-3 text-sm font-semibold">
              View
            </Link>
            <button
              type="button"
              onClick={() => addToCart(product)}
              className="btn-primary focus-ring px-4 py-3 text-sm font-semibold"
            >
              Add to cart
            </button>
            <button
              type="button"
              onClick={() => removeFromWishlist(product.id)}
              className="btn-outline focus-ring px-4 py-3 text-sm font-semibold text-rose-600 dark:text-rose-200"
            >
              Remove
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
