"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "../lib/products";
import { formatNgn } from "../lib/currency";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { ProductRating } from "./ProductRating";
import { ProductBadge } from "./ProductBadge";

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [justAdded, setJustAdded] = useState(false);
  const inStock = product.stock > 0;
  const liked = isInWishlist(product.id);
  const detailsHref = `/products/${product.id}`;
  const shouldPrefetch = process.env.NODE_ENV === "production";

  const handleAddToCart = () => {
    if (!inStock) return;
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <div className="surface-card group relative flex min-h-[25.5rem] flex-col overflow-hidden p-4 transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] sm:p-5">
      <ProductBadge badge={product.badge} />

      {product.image && (
        <Link
          href={detailsHref}
          prefetch={false}
          onMouseEnter={shouldPrefetch ? () => router.prefetch(detailsHref) : undefined}
          onFocus={shouldPrefetch ? () => router.prefetch(detailsHref) : undefined}
          className="surface-soft relative z-0 block h-44 w-full flex-shrink-0 overflow-hidden rounded-2xl sm:h-48"
        >
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950/14 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </Link>
      )}

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{product.category}</p>
          <h3 className="mt-1.5 line-clamp-2 text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
            {product.name}
          </h3>
        </div>
        <button
          type="button"
          aria-label="Add or remove from wishlist"
          onClick={() => (liked ? removeFromWishlist(product.id) : addToWishlist(product))}
          className={`focus-ring inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl border text-sm shadow-[var(--shadow-soft)] ${
            liked
              ? "border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-400/30 dark:bg-rose-500/10 dark:text-rose-200"
              : "border-[var(--border-subtle)] bg-[var(--surface-1)] text-zinc-700 hover:bg-[var(--surface-2)] dark:text-white"
          }`}
        >
          {liked ? "♥" : "♡"}
        </button>
      </div>

      <div className="mt-2.5">
        <ProductRating rating={product.rating} reviews={product.reviews} />
      </div>

      <p className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
        {formatNgn(product.price)}
      </p>

      <p className="mt-2.5 line-clamp-2 text-sm leading-6 text-muted">{product.description}</p>

      <div className="mt-3.5 flex items-center gap-2 text-xs">
        {inStock ? (
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 font-semibold text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-200">
            In stock ({product.stock})
          </span>
        ) : (
          <span className="rounded-full bg-rose-50 px-2.5 py-1 font-semibold text-rose-600 ring-1 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-200">
            Out of stock
          </span>
        )}
        {inStock && product.stock <= 10 && (
          <span className="rounded-full bg-amber-50 px-2.5 py-1 font-semibold text-amber-700 ring-1 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-200">
            Low stock
          </span>
        )}
      </div>

      <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
        <Link
          href={detailsHref}
          prefetch={false}
          onMouseEnter={shouldPrefetch ? () => router.prefetch(detailsHref) : undefined}
          onFocus={shouldPrefetch ? () => router.prefetch(detailsHref) : undefined}
          className="btn-outline focus-ring flex h-11 items-center justify-center px-4 text-sm font-semibold"
        >
          View Details
        </Link>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!inStock}
          className={`focus-ring h-11 px-4 text-sm font-semibold text-white ${
            justAdded ? "rounded-[var(--radius-sm)] bg-[var(--success-500)]" : "btn-primary"
          } ${!inStock ? "cursor-not-allowed opacity-60" : ""}`}
        >
          {justAdded ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
