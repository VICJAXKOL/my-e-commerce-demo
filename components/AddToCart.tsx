"use client";

import React, { useState } from "react";
import { Product } from "../lib/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { QuantitySelector } from "./QuantitySelector";

export default function AddToCart({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const inStock = product.stock > 0;
  const liked = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Quantity</p>
          <div className="mt-2">
            <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
          </div>
        </div>
        <button
          type="button"
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => (liked ? removeFromWishlist(product.id) : addToWishlist(product))}
          className={`focus-ring btn-outline inline-flex h-11 items-center justify-center px-4 text-sm font-semibold ${
            liked ? "border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-400/30 dark:bg-rose-500/10 dark:text-rose-200" : ""
          }`}
        >
          {liked ? "Saved to Wishlist" : "Save to Wishlist"}
        </button>
      </div>
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={!inStock}
        className={`focus-ring w-full px-5 py-3 text-sm font-semibold text-white ${
          justAdded
            ? "rounded-[var(--radius-sm)] bg-[var(--success-500)] ring-2 ring-emerald-200 dark:ring-emerald-400/25"
            : "btn-primary disabled:opacity-50"
        }`}
      >
        {justAdded ? "Added to Cart" : inStock ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
}
