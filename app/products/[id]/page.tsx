import { getProductById } from "../../../lib/products";
import React, { Suspense } from "react";
import Image from "next/image";
import AddToCart from "../../../components/AddToCart";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { RelatedProducts } from "../../../components/RelatedProducts";
import { ProductReviews } from "../../../components/ProductReviews";
import { ProductRating } from "../../../components/ProductRating";

type Props = { params: Promise<{ id: string }> };

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product)
    return (
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-2xl font-semibold">Product not found</h1>
        <p className="mt-2 text-zinc-600">The product you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    );

  const inStock = product.stock > 0;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="mx-auto max-w-4xl">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: product.name, href: `/products/${product.id}` },
          ]}
        />

        <div className="rounded-lg bg-gray-800 text-white p-6 shadow-lg">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-zinc-200 bg-gray-900 p-2">
              {product.image && (
                <div className="relative h-80 w-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>
              )}
            </div>

            <div>
              <h1 className="text-2xl font-semibold">{product.name}</h1>

              <div className="mt-3">
                <ProductRating rating={product.rating} reviews={product.reviews} />
              </div>

              <p className="mt-4 text-lg text-zinc-300">${product.price.toFixed(2)}</p>

              <div className="mt-3 text-sm">
                {inStock ? (
                  <span className="text-green-400">In Stock ({product.stock} available)</span>
                ) : (
                  <span className="text-red-400">Out of Stock</span>
                )}
              </div>

              <p className="mt-4 text-sm text-zinc-400">{product.description}</p>

              <div className="mt-6">
                <AddToCart product={product} />
              </div>

              <div className="mt-6 space-y-2 border-t pt-4 text-sm text-zinc-400">
                <div>✓ Free shipping on orders over $50</div>
                <div>✓ 30-day money-back guarantee</div>
                <div>✓ Secure checkout</div>
              </div>
            </div>
          </div>
        </div>

        <RelatedProducts productId={product.id} />
        <ProductReviews rating={product.rating} reviews={product.reviews} />
      </div>
    </Suspense>
  );
}
