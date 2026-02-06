export function ProductRating({ rating, reviews }: { rating: number; reviews: number }) {
  const stars = Math.round(rating);
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < stars ? "text-yellow-400" : "text-gray-300"}>
            ★
          </span>
        ))}
      </div>
      <span className="text-sm text-slate-400">
        {rating} ({reviews} reviews)
      </span>
    </div>
  );
}
