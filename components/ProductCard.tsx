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
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const inStock = product.stock > 0;
  const liked = isInWishlist(product.id);

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

      <p className="mt-2 text-sm font-medium text-zinc-900">${product.price.toFixed(2)}</p>

      <div className="mt-2 text-xs">
        {inStock ? (
          <span className="text-emerald-700">In Stock ({product.stock})</span>
        ) : (
          <span className="text-rose-600">Out of Stock</span>
        )}
      </div>

      <div className="mt-auto grid grid-cols-3 gap-2 pt-3">
        <button
          type="button"
          onClick={() => setQuickViewOpen(true)}
          className="btn-outline h-9 rounded-md px-3 text-sm font-medium"
        >
          Quick View
        </button>

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

      {quickViewOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4">
          <div className="surface-card w-full max-w-2xl rounded-2xl p-5">
            <div className="mb-3 flex items-start justify-between">
              <h4 className="text-lg font-semibold text-zinc-900">{product.name}</h4>
              <button
                type="button"
                onClick={() => setQuickViewOpen(false)}
                className="btn-outline px-2 py-1 text-xs"
              >
                Close
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="surface-soft relative h-56 overflow-hidden rounded-xl">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                ) : null}
              </div>
              <div>
                <ProductRating rating={product.rating} reviews={product.reviews} />
                <p className="mt-3 text-sm leading-6 text-zinc-600">{product.description}</p>
                <p className="mt-3 text-xl font-semibold text-zinc-900">${product.price.toFixed(2)}</p>
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleAddToCart();
                      setQuickViewOpen(false);
                    }}
                    disabled={!inStock}
                    className="btn-primary rounded-md px-4 py-2 text-sm font-semibold text-white"
                  >
                    {inStock ? "Add to Cart" : "Out of Stock"}
                  </button>
                  <Link href={`/products/${product.id}`} className="btn-outline rounded-md px-4 py-2 text-sm">
                    Full Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
