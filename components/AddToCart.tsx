"use client";

import React, { useState } from "react";
import { Product } from "../lib/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { QuantitySelector } from "./QuantitySelector";

export default function AddToCart({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const inStock = product.stock > 0;
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const liked = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
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
        className="w-full rounded bg-black/90 px-4 py-2 text-white transition hover:bg-black disabled:opacity-50"
      >
        {inStock ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
}
