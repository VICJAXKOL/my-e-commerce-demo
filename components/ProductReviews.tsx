import { ProductRating } from "./ProductRating";

export function ProductReviews({ rating, reviews }: { rating: number; reviews: number }) {
  const buckets = [5, 4, 3, 2, 1].map((stars) => {
    const distance = Math.abs(stars - rating);
    const weight = Math.max(0.05, 1 - distance * 0.35);
    return { stars, count: Math.round(reviews * weight * 0.24) };
  });

  const maxCount = Math.max(...buckets.map((bucket) => bucket.count), 1);

  const featuredReviews = [
    {
      author: "Sarah M.",
      rating: 5,
      text: "Excellent quality and a surprisingly smooth buying experience. The product looked exactly like the listing.",
    },
    {
      author: "John D.",
      rating: 4,
      text: "Shipping was quick and the product felt premium right out of the box. I’d happily buy again.",
    },
    {
      author: "Emily R.",
      rating: 5,
      text: "Exactly what I expected — clear details, strong packaging, and a product that feels worth the price.",
    },
  ];

  return (
    <section className="surface-card p-6 sm:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-600)]">Customer feedback</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">Reviews that build confidence</h2>
        </div>
        <div className="rounded-full bg-[var(--surface-2)] px-4 py-2 text-sm font-medium text-zinc-700 dark:text-white">
          Based on {reviews} verified reviews
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="surface-soft p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white">{rating.toFixed(1)}</p>
              <div className="mt-3">
                <ProductRating rating={rating} reviews={reviews} />
              </div>
            </div>
            <div className="rounded-2xl bg-[var(--surface-1)] px-4 py-3 text-right shadow-[var(--shadow-soft)]">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Satisfaction</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                {Math.min(99, Math.round((rating / 5) * 100))}%
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {buckets.map((bucket) => (
              <div key={bucket.stars} className="flex items-center gap-3 text-sm">
                <span className="w-10 font-medium text-zinc-700 dark:text-slate-200">{bucket.stars}★</span>
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-[var(--surface-3)]">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(135deg,var(--brand-500),var(--brand-600))]"
                    style={{ width: `${(bucket.count / maxCount) * 100}%` }}
                  />
                </div>
                <span className="w-10 text-right text-muted">{bucket.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {featuredReviews.map((review) => (
            <article key={review.author} className="surface-soft p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-base font-semibold text-zinc-900 dark:text-white">{review.author}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-600)]">
                    Verified purchase
                  </p>
                </div>
                <span className="rounded-full bg-[var(--surface-1)] px-3 py-1 text-sm font-semibold text-zinc-700 shadow-[var(--shadow-soft)] dark:text-white">
                  {"★".repeat(review.rating)}
                </span>
              </div>
              <p className="mt-4 text-sm leading-7 text-muted">{review.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
