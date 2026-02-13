"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "../lib/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { ProductRating } from "./ProductRating";
import { ProductBadge } from "./ProductBadge";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [justAdded, setJustAdded] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const inStock = product.stock > 0;
  const liked = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (inStock) {
      addToCart(product);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    }
  };

  return (
    <div
      className={`relative flex h-96 flex-col rounded-lg border border-slate-700 bg-slate-800 p-4 shadow-sm transition hover:shadow-lg ${
        isViewing ? "bg-gray-800 text-white" : "bg-zinc-800"
      }`}
      onMouseEnter={() => setIsViewing(true)}
      onMouseLeave={() => setIsViewing(false)}
    >
      <ProductBadge badge={product.badge} />

      {product.image && (
        <div className="relative h-40 w-full flex-shrink-0 rounded bg-slate-700">
          <Image src={product.image} alt={product.name} fill className="object-contain p-2" />
        </div>
      )}

      <h3 className="mt-4 line-clamp-2 text-base font-semibold text-white">{product.name}</h3>

      <div className="mt-1">
        <ProductRating rating={product.rating} reviews={product.reviews} />
      </div>

      <p className="mt-2 text-sm text-slate-300">${product.price.toFixed(2)}</p>

      <div className="mt-2 text-xs text-slate-400">
        {inStock ? (
          <span className="text-green-400">In Stock ({product.stock})</span>
        ) : (
          <span className="text-red-400">Out of Stock</span>
        )}
      </div>

      <div className="mt-auto flex gap-2 pt-3">
        <button
          aria-label="Add or remove from wishlist"
          onClick={() => (liked ? removeFromWishlist(product.id) : addToWishlist(product))}
          className="rounded px-2 py-1 text-sm text-slate-300 transition hover:text-pink-400"
        >
          {liked ? "Saved" : "Save"}
        </button>
        <Link
          href={`/products/${product.id}`}
          className="rounded border border-slate-600 px-3 py-1 text-sm text-slate-200 transition hover:bg-slate-700"
        >
          View
        </Link>
        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className={`ml-auto rounded px-3 py-1 text-sm text-white transition ${
            justAdded
              ? "bg-green-500 ring-2 ring-green-300 scale-105"
              : "bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50"
          }`}
        >
          {justAdded ? "Added" : "Add"}
        </button>
      </div>
    </div>
  );
}
