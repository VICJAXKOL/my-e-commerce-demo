"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "../lib/products";
import { useCart } from "../context/CartContext";
import { ProductRating } from "./ProductRating";
import { ProductBadge } from "./ProductBadge";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const inStock = product.stock > 0;

  return (
    <div className="relative flex flex-col h-96 rounded-lg border border-slate-700 bg-slate-800 p-4 shadow-sm transition hover:shadow-lg">
      <ProductBadge badge={product.badge} />
      
      {product.image && (
        <div className="relative h-40 w-full rounded bg-slate-700 flex-shrink-0">
          <Image src={product.image} alt={product.name} fill className="object-contain p-2" />
        </div>
      )}
      
      <h3 className="mt-4 text-base font-semibold text-white line-clamp-2">{product.name}</h3>
      
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
        <Link
          href={`/products/${product.id}`}
          className="rounded border border-slate-600 px-3 py-1 text-sm text-slate-200 transition hover:bg-slate-700"
        >
          View
        </Link>
        <button
          onClick={() => inStock && addToCart(product)}
          disabled={!inStock}
          className="ml-auto rounded bg-emerald-600 px-3 py-1 text-sm text-white transition hover:bg-emerald-700 disabled:opacity-50"
        >
          Add
        </button>
      </div>
    </div>
  );
}
