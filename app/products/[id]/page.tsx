import type { Metadata } from "next";
import AddToCart from "../../../components/AddToCart";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { ProductMediaGallery } from "../../../components/ProductMediaGallery";
import { ProductRating } from "../../../components/ProductRating";
import { ProductReviews } from "../../../components/ProductReviews";
import { RecentlyViewedRail } from "../../../components/RecentlyViewedRail";
import { RelatedProducts } from "../../../components/RelatedProducts";
import { formatNgn } from "../../../lib/currency";
import { getProductById, products } from "../../../lib/products";

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = true;

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const productId = decodeURIComponent(resolvedParams.id);
  const product = getProductById(productId);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "This product is no longer available at MyShop.",
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      type: "website",
      images: product.image ? [{ url: product.image, alt: product.name }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: product.image ? [product.image] : undefined,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const resolvedParams = await Promise.resolve(params);
  const productId = decodeURIComponent(resolvedParams.id);
  const product = getProductById(productId);

  if (!product) {
    return (
      <div className="mx-auto max-w-4xl px-4 pt-20 text-center sm:px-6">
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

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image ? [product.image] : [],
    category: product.category,
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: "MyShop",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "NGN",
      price: product.price.toFixed(2),
      availability: inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviews,
    },
  };

  const productHighlights = [
    {
      title: "Why shoppers pick it",
      text: `A well-rated ${product.category.toLowerCase()} essential designed for everyday ease and dependable value.`,
    },
    {
      title: "Delivery expectation",
      text: `Most orders for this item arrive between ${etaWindow}, with faster dispatch on in-stock items.`,
    },
    {
      title: "Support promise",
      text: "Easy returns, secure checkout, and responsive support if anything feels unclear before or after purchase.",
    },
  ];

  const purchasePromises = [
    "Free shipping on orders over NGN 50,000",
    `Estimated delivery: ${etaWindow}`,
    "30-day money-back guarantee",
    "Secure checkout with encrypted payments",
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 pt-20 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />

      <div className="space-y-4">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: product.name, href: `/products/${product.id}` },
          ]}
        />

        <section className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr] xl:items-start">
          <div className="space-y-6">
            <ProductMediaGallery image={product.image} name={product.name} />

            <div className="surface-card p-6 sm:p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-600)]">Why it stands out</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                    Thoughtful product details at a glance
                  </h2>
                </div>
                <div className="rounded-full bg-[var(--surface-2)] px-4 py-2 text-sm font-medium text-zinc-700 dark:text-white">
                  SKU: {product.id}
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {productHighlights.map((highlight) => (
                  <article key={highlight.title} className="surface-soft p-4 sm:p-5">
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-white">{highlight.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{highlight.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6 xl:sticky xl:top-24">
            <section className="surface-spotlight p-6 text-white sm:p-8">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-200">
                  {product.category}
                </span>
                {product.badge && (
                  <span className="rounded-full bg-[linear-gradient(135deg,var(--brand-500),var(--brand-600))] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white">
                    {product.badge}
                  </span>
                )}
              </div>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{product.name}</h1>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <ProductRating rating={product.rating} reviews={product.reviews} />
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200">
                  {product.reviews} verified reviews
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 border-y border-white/10 py-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm text-slate-400">Price</p>
                  <p className="mt-2 text-4xl font-semibold tracking-tight text-white">{formatNgn(product.price)}</p>
                </div>

                <div className="sm:text-right">
                  <div className="text-sm">
                    {inStock ? (
                      <span className="rounded-full bg-emerald-400/12 px-3 py-1 font-semibold text-emerald-100 ring-1 ring-emerald-300/20">
                        In stock ({product.stock} available)
                      </span>
                    ) : (
                      <span className="rounded-full bg-rose-400/12 px-3 py-1 font-semibold text-rose-100 ring-1 ring-rose-300/20">
                        Out of stock
                      </span>
                    )}
                  </div>
                  {inStock && product.stock <= 10 && (
                    <p className="mt-3 text-xs font-medium uppercase tracking-[0.14em] text-rose-200">
                      Low stock: only {product.stock} left
                    </p>
                  )}
                </div>
              </div>

              <p className="mt-6 text-sm leading-7 text-slate-300 sm:text-base">{product.description}</p>

              <div className="mt-6">
                <AddToCart product={product} />
              </div>

              <div className="mt-6 grid gap-3">
                {purchasePromises.map((promise) => (
                  <div key={promise} className="surface-spotlight-soft flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-200">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--brand-500),var(--brand-600))] text-white">
                      ✓
                    </span>
                    <span>{promise}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="surface-card p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-600)]">Shopping reassurance</p>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3 xl:grid-cols-1">
                <div className="surface-soft px-4 py-3 text-sm font-medium text-zinc-700 dark:text-slate-200">Fast dispatch</div>
                <div className="surface-soft px-4 py-3 text-sm font-medium text-zinc-700 dark:text-slate-200">Easy returns</div>
                <div className="surface-soft px-4 py-3 text-sm font-medium text-zinc-700 dark:text-slate-200">Buyer protection</div>
              </div>
            </section>
          </div>
        </section>
      </div>

      <ProductReviews rating={product.rating} reviews={product.reviews} />
      <RelatedProducts productId={product.id} />
      <RecentlyViewedRail currentId={product.id} />
    </div>
  );
}
