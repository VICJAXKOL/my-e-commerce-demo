import { getProductById, products } from "../../../lib/products";
import AddToCart from "../../../components/AddToCart";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { RelatedProducts } from "../../../components/RelatedProducts";
import { ProductReviews } from "../../../components/ProductReviews";
import { ProductRating } from "../../../components/ProductRating";
import { ProductMediaGallery } from "../../../components/ProductMediaGallery";

type Props = { params: { id: string } };
export const dynamicParams = true;

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export default function ProductPage({ params }: Props) {
  const { id } = params;
  const product = getProductById(id);

  if (!product) {
    return (
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-2xl font-semibold">Product not found</h1>
        <p className="mt-2 text-zinc-600">The product you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    );
  }

  const inStock = product.stock > 0;
  const etaStart = new Date();
  etaStart.setDate(etaStart.getDate() + 3);
  const etaEnd = new Date();
  etaEnd.setDate(etaEnd.getDate() + 5);
  const dateFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });
  const etaWindow = `${dateFormat.format(etaStart)} - ${dateFormat.format(etaEnd)}`;

  return (
    <div className="mx-auto max-w-4xl">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: product.name, href: `/products/${product.id}` },
        ]}
      />

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ProductMediaGallery image={product.image} name={product.name} />

        <div className="surface-card rounded-2xl p-6 lg:sticky lg:top-24">
          <div className="inline-flex rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold text-zinc-700">
            {product.category}
          </div>

          <h1 className="mt-3 text-3xl font-semibold text-zinc-900">{product.name}</h1>

          <div className="mt-3">
            <ProductRating rating={product.rating} reviews={product.reviews} />
          </div>

          <p className="mt-4 text-2xl font-semibold text-zinc-900">${product.price.toFixed(2)}</p>

            <div className="mt-2 text-sm">
              {inStock ? (
                <span className="font-medium text-emerald-700">In Stock ({product.stock} available)</span>
              ) : (
                <span className="font-medium text-rose-600">Out of Stock</span>
              )}
            </div>
            {inStock && product.stock <= 10 && (
              <p className="mt-1 text-xs font-medium text-rose-600">Low stock: only {product.stock} left</p>
            )}

          <p className="mt-4 text-sm leading-7 text-muted">{product.description}</p>

            <div className="mt-6">
              <AddToCart product={product} />
            </div>

            <div className="mt-6 grid gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-700">
              <div>Free shipping on orders over $50</div>
              <div>Estimated delivery: {etaWindow}</div>
              <div>30-day money-back guarantee</div>
              <div>Secure checkout and encrypted payments</div>
            </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-zinc-600">
            <div className="rounded-lg border border-zinc-200 bg-white px-2 py-2">Fast Dispatch</div>
            <div className="rounded-lg border border-zinc-200 bg-white px-2 py-2">Easy Returns</div>
            <div className="rounded-lg border border-zinc-200 bg-white px-2 py-2">Buyer Protection</div>
          </div>
        </div>
      </section>

      <RelatedProducts productId={product.id} />
      <ProductReviews rating={product.rating} reviews={product.reviews} />
    </div>
  );
}
