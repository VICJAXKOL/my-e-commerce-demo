export function ProductReviews({
  rating,
  reviews,
}: {
  rating: number;
  reviews: number;
}) {
  return (
    <section className="mt-8 border-t pt-6">
      <h2 className="text-lg font-semibold">Customer Reviews</h2>
      <div className="mt-4 space-y-4">
        <div className="text-sm">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{rating}</span>
            <div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"}>
                    ★
                  </span>
                ))}
              </div>
              <p className="text-zinc-600">Based on {reviews} reviews</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          {[
            { author: "Sarah M.", rating: 5, text: "Excellent quality! Very satisfied with my purchase." },
            { author: "John D.", rating: 4, text: "Good product, fast shipping. Highly recommend." },
            { author: "Emily R.", rating: 5, text: "Perfect! Exactly as described." },
          ].map((review, i) => (
            <div key={i} className="rounded border p-3">
              <div className="flex items-center justify-between">
                <strong>{review.author}</strong>
                <span className="text-yellow-400">{"★".repeat(review.rating)}</span>
              </div>
              <p className="mt-1 text-zinc-600">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
