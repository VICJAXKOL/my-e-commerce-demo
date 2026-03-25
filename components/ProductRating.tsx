export function ProductRating({ rating, reviews }: { rating: number; reviews: number }) {
  const stars = Math.round(rating);

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5 text-sm">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            aria-hidden="true"
            className={index < stars ? "text-amber-400" : "text-slate-300 dark:text-slate-600"}
          >
            ★
          </span>
        ))}
      </div>
      <span className="text-sm text-muted">
        {rating.toFixed(1)} · {reviews} reviews
      </span>
    </div>
  );
}
