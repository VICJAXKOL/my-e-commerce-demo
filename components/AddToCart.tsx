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
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
        <button
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => (liked ? removeFromWishlist(product.id) : addToWishlist(product))}
          className={`rounded px-3 py-2 text-sm transition ${liked ? "text-pink-400" : "text-slate-700 hover:text-pink-400"}`}
        >
          {liked ? "♥ Saved" : "♡ Wishlist"}
        </button>
      </div>
      <button
        onClick={handleAddToCart}
        disabled={!inStock}
        className={`w-full rounded px-4 py-2 text-white transition ${
          justAdded
            ? "bg-green-500 ring-2 ring-green-300 scale-105"
            : "bg-black/90 hover:bg-black disabled:opacity-50"
        }`}
      >
        {justAdded ? "✓ Added to Cart" : inStock ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
}
