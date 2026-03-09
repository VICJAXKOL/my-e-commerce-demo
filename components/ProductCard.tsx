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
    <div className="surface-card relative flex h-96 flex-col p-4 transition hover:-translate-y-0.5">
      <ProductBadge badge={product.badge} />

      {product.image && (
        <div className="surface-soft relative z-0 h-40 w-full flex-shrink-0 overflow-hidden rounded-xl">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover"
          />
        </div>
      )}

      <h3 className="mt-4 line-clamp-2 text-base font-semibold text-zinc-900">{product.name}</h3>

      <div className="mt-1">
        <ProductRating rating={product.rating} reviews={product.reviews} />
      </div>

      <p className="mt-2 text-sm font-medium text-zinc-900">{formatNgn(product.price)}</p>

      <div className="mt-2 text-xs">
        {inStock ? (
          <span className="text-emerald-700">In Stock ({product.stock})</span>
        ) : (
          <span className="text-rose-600">Out of Stock</span>
        )}
      </div>

      <div className="mt-auto grid grid-cols-3 gap-2 pt-3">
        <Link
          href={detailsHref}
          prefetch={false}
          onMouseEnter={shouldPrefetch ? () => router.prefetch(detailsHref) : undefined}
          onFocus={shouldPrefetch ? () => router.prefetch(detailsHref) : undefined}
          className="btn-outline flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium"
        >
          Quick View
        </Link>

        <button
          type="button"
          aria-label="Add or remove from wishlist"
          onClick={() => (liked ? removeFromWishlist(product.id) : addToWishlist(product))}
          className="btn-outline h-9 rounded-md px-3 text-sm font-medium"
        >
          {liked ? "Saved" : "Save"}
        </button>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!inStock}
          className={`h-9 rounded-md px-3 text-sm font-medium text-white transition ${
            justAdded ? "bg-emerald-600" : "btn-primary"
          } ${!inStock ? "cursor-not-allowed opacity-60" : ""}`}
        >
          {justAdded ? "Added" : "Add"}
        </button>
      </div>
    </div>
  );
}
