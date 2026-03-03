"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getRelatedProducts, Product } from "../lib/products";
import { formatNgn } from "../lib/currency";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { ProductRating } from "./ProductRating";
import { ProductBadge } from "./ProductBadge";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [justAdded, setJustAdded] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const inStock = product.stock > 0;
  const liked = isInWishlist(product.id);
  const activeProduct = quickViewProduct ?? product;
  const activeInStock = activeProduct.stock > 0;
  const relatedProducts = getRelatedProducts(activeProduct.id, 4);

  const handleAddToCart = (selectedProduct: Product = product) => {
    if (selectedProduct.stock <= 0) return;
    addToCart(selectedProduct);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const openQuickView = (selectedProduct: Product) => {
    setQuickViewProduct(selectedProduct);
    setQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  useEffect(() => {
    if (!quickViewOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeQuickView();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [quickViewOpen]);

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
        <button
          type="button"
          onClick={() => openQuickView(product)}
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
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4"
          onClick={closeQuickView}
        >
          <div
            className="surface-card max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl p-5 sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between">
              <h4 className="text-xl font-semibold text-zinc-900">{activeProduct.name}</h4>
              <button
                type="button"
                onClick={closeQuickView}
                className="btn-outline px-2 py-1 text-xs"
              >
                Close
              </button>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-3">
                <div className="surface-soft relative h-72 overflow-hidden rounded-xl sm:h-96">
                {activeProduct.image ? (
                  <Image
                    src={activeProduct.image}
                    alt={activeProduct.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                ) : null}
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs text-zinc-600">
                  <div className="rounded-lg border border-zinc-200 bg-white px-2 py-2">Fast Dispatch</div>
                  <div className="rounded-lg border border-zinc-200 bg-white px-2 py-2">Easy Returns</div>
                  <div className="rounded-lg border border-zinc-200 bg-white px-2 py-2">Buyer Protection</div>
                </div>
              </div>
              <div>
                <div className="inline-flex rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold text-zinc-700">
                  {activeProduct.category}
                </div>
                <ProductRating rating={activeProduct.rating} reviews={activeProduct.reviews} />
                <p className="mt-3 text-sm leading-6 text-zinc-600">{activeProduct.description}</p>
                <p className="mt-3 text-xl font-semibold text-zinc-900">{formatNgn(activeProduct.price)}</p>
                <div className="mt-2 text-sm">
                  {activeInStock ? (
                    <span className="font-medium text-emerald-700">In Stock ({activeProduct.stock} available)</span>
                  ) : (
                    <span className="font-medium text-rose-600">Out of Stock</span>
                  )}
                </div>
                {activeInStock && activeProduct.stock <= 10 ? (
                  <p className="mt-1 text-xs font-medium text-rose-600">Low stock: only {activeProduct.stock} left</p>
                ) : null}
                <div className="mt-4 grid gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-700">
                  <div>Free shipping on orders over NGN 50,000</div>
                  <div>Estimated delivery: 3-5 business days</div>
                  <div>Secure checkout and encrypted payments</div>
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleAddToCart(activeProduct);
                      closeQuickView();
                    }}
                    disabled={!activeInStock}
                    className="btn-primary rounded-md px-4 py-2 text-sm font-semibold text-white"
                  >
                    {activeInStock ? "Add to Cart" : "Out of Stock"}
                  </button>
                  <Link href={`/products/${activeProduct.id}`} className="btn-outline rounded-md px-4 py-2 text-sm">
                    Full Details
                  </Link>
                </div>
              </div>
            </div>

            {relatedProducts.length > 0 ? (
              <section className="mt-8">
                <h5 className="text-lg font-semibold text-zinc-900">Related Products</h5>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {relatedProducts.map((related) => (
                    <article key={related.id} className="rounded-xl border border-zinc-200 bg-white p-3">
                      <div className="surface-soft relative h-28 overflow-hidden rounded-lg">
                        {related.image ? (
                          <Image
                            src={related.image}
                            alt={related.name}
                            fill
                            sizes="(max-width: 640px) 100vw, 25vw"
                            className="object-cover"
                          />
                        ) : null}
                      </div>
                      <p className="mt-2 line-clamp-2 text-sm font-semibold text-zinc-900">{related.name}</p>
                      <p className="mt-1 text-sm text-zinc-700">{formatNgn(related.price)}</p>
                      <div className="mt-3 flex gap-2">
                        <button
                          type="button"
                          onClick={() => openQuickView(related)}
                          className="btn-outline rounded-md px-3 py-1.5 text-xs"
                        >
                          Quick View
                        </button>
                        <Link href={`/products/${related.id}`} className="btn-outline rounded-md px-3 py-1.5 text-xs">
                          Full Details
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
