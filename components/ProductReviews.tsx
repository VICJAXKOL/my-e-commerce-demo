export function ProductReviews({
  rating,
  reviews,
}: {
  rating: number;
  reviews: number;
}) {
  const buckets = [5, 4, 3, 2, 1].map((stars) => {
    const distance = Math.abs(stars - rating);
    const weight = Math.max(0.05, 1 - distance * 0.35);
    return { stars, count: Math.round(reviews * weight * 0.24) };
  });

  const maxCount = Math.max(...buckets.map((b) => b.count), 1);

  return (
    <section className="mt-8 border-t pt-6">
      <h2 className="text-lg font-semibold">Customer Reviews</h2>

      <div className="mt-4 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold">{rating.toFixed(1)}</span>
            <div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"}>
                    *
                  </span>
                ))}
              </div>
              <p className="text-sm text-zinc-600">Based on {reviews} verified reviews</p>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {buckets.map((bucket) => (
              <div key={bucket.stars} className="flex items-center gap-2 text-xs">
                <span className="w-8 text-zinc-700">{bucket.stars}*</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-200">
                  <div
                    className="h-full rounded-full bg-emerald-500"
                    style={{ width: `${(bucket.count / maxCount) * 100}%` }}
                  />
                </div>
                <span className="w-8 text-right text-zinc-600">{bucket.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3 text-sm">
          {[
            { author: "Sarah M.", rating: 5, text: "Excellent quality! Very satisfied with my purchase." },
            { author: "John D.", rating: 4, text: "Good product, fast shipping. Highly recommend." },
            { author: "Emily R.", rating: 5, text: "Perfect! Exactly as described." },
          ].map((review, i) => (
            <div key={i} className="rounded-xl border border-zinc-200 bg-white p-3">
              <div className="flex items-center justify-between">
                <strong>{review.author}</strong>
                <div className="text-right">
                  <span className="text-yellow-500">{"*".repeat(review.rating)}</span>
                  <p className="text-[10px] text-zinc-500">Verified Purchase</p>
                </div>
              </div>
              <p className="mt-1 text-zinc-600">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
