"use client";

import React, { useState } from "react";
import { Product } from "../lib/products";
import { useCart } from "../context/CartContext";
import { QuantitySelector } from "./QuantitySelector";

export default function AddToCart({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const inStock = product.stock > 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  return (
    <div className="space-y-3">
      <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
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
