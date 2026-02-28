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
      <section className="surface-card rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-semibold text-zinc-900">Your wishlist is empty</h2>
        <p className="mt-2 text-sm text-zinc-600">
          Save products you like so you can compare and buy them later.
        </p>
        <Link href="/products" className="btn-primary mt-5 inline-flex px-5 py-2.5 text-sm font-semibold">
          Explore Products
        </Link>
      </section>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <article key={product.id} className="surface-card flex flex-col rounded-2xl p-4">
          <div className="surface-soft relative h-44 overflow-hidden rounded-xl">
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

          <h3 className="mt-3 line-clamp-2 text-base font-semibold text-zinc-900">{product.name}</h3>
          <p className="mt-1 text-sm text-zinc-600">{product.category}</p>
          <p className="mt-2 text-sm font-semibold text-zinc-900">{formatNgn(product.price)}</p>

          <div className="mt-auto flex gap-2 pt-4">
            <Link href={`/products/${product.id}`} className="btn-outline px-3 py-1.5 text-sm">
              View
            </Link>
            <button
              type="button"
              onClick={() => addToCart(product)}
              className="btn-primary px-3 py-1.5 text-sm font-semibold"
            >
              Add to Cart
            </button>
            <button
              type="button"
              onClick={() => removeFromWishlist(product.id)}
              className="rounded-md border border-rose-200 px-3 py-1.5 text-sm text-rose-600 hover:bg-rose-50"
            >
              Remove
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
