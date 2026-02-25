"use client";

import React from "react";
import { filterProducts, products, type Product } from "../lib/products";
import ProductCard from "./ProductCard";

const CATEGORY_CHIPS: Array<"Apparel" | "Footwear" | "Electronics" | "Home"> = [
  "Apparel",
  "Footwear",
  "Electronics",
  "Home",
];

const BADGES = ["All", "Popular", "New", "Sale"] as const;
type BadgeFilter = (typeof BADGES)[number];

function normalize(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function levenshtein(a: string, b: string) {
  const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i += 1) dp[i][0] = i;
  for (let j = 0; j <= b.length; j += 1) dp[0][j] = j;
  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[a.length][b.length];
}

function matchesQuery(product: Product, rawQuery: string) {
  const query = normalize(rawQuery);
  if (!query) return true;

  const haystack = normalize(`${product.name} ${product.description} ${product.category}`);
  if (haystack.includes(query)) return true;

  const queryTerms = query.split(" ").filter(Boolean);
  const words = normalize(product.name).split(" ").filter(Boolean);

  return queryTerms.every((term) => {
    if (term.length <= 2) return words.some((w) => w.startsWith(term));
    return words.some((w) => w.includes(term) || levenshtein(w, term) <= 1);
  });
}

export function SearchAndFilter() {
  const [query, setQuery] = React.useState("");
  const [debouncedQuery, setDebouncedQuery] = React.useState("");
  const [category, setCategory] = React.useState("All");
  const [sortBy, setSortBy] = React.useState("newest");
  const [badge, setBadge] = React.useState<BadgeFilter>("All");
  const [minPrice, setMinPrice] = React.useState(0);
  const [maxPrice, setMaxPrice] = React.useState(200);

  const categories = React.useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.category)))],
    []
  );

  React.useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQuery(query.trim()), 220);
    return () => window.clearTimeout(timer);
  }, [query]);

  const baseResults = React.useMemo(
    () =>
      filterProducts(
        category === "All" ? undefined : category,
        minPrice,
        maxPrice,
        sortBy as "price-asc" | "price-desc" | "rating" | "newest"
      ),
    [category, minPrice, maxPrice, sortBy]
  );

  const results = React.useMemo(() => {
    let next = baseResults;

    if (badge !== "All") {
      next = next.filter((p) => p.badge === badge);
    }

    if (debouncedQuery.length > 0) {
      next = next.filter((p) => matchesQuery(p, debouncedQuery));
    }

    return next;
  }, [baseResults, badge, debouncedQuery]);

  const clearFilters = () => {
    setQuery("");
    setCategory("All");
    setSortBy("newest");
    setBadge("All");
    setMinPrice(0);
    setMaxPrice(200);
  };

  return (
    <div className="space-y-6">
      <div className="surface-card p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            id="search-products"
            name="search"
            type="text"
            placeholder="Search products (e.g. 'snakers' still works)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="focus-ring w-full rounded-lg border border-zinc-300 px-4 py-2"
          />
          <button type="button" onClick={clearFilters} className="btn-outline px-4 py-2 text-sm">
            Clear
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {CATEGORY_CHIPS.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => setCategory(chip)}
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                category === chip
                  ? "border-sky-500 bg-sky-50 text-sky-700"
                  : "border-zinc-300 bg-white text-zinc-700"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 rounded-xl border border-zinc-200 bg-white p-4 sm:grid-cols-5">
        <div>
          <label htmlFor="filter-category" className="block text-sm font-semibold">Category</label>
          <select
            id="filter-category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full rounded border px-3 py-2 text-sm"
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filter-sort" className="block text-sm font-semibold">Sort By</label>
          <select
            id="filter-sort"
            name="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="mt-1 w-full rounded border px-3 py-2 text-sm"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        <div>
          <label htmlFor="filter-badge" className="block text-sm font-semibold">Badge</label>
          <select
            id="filter-badge"
            name="badge"
            value={badge}
            onChange={(e) => setBadge(e.target.value as BadgeFilter)}
            className="mt-1 w-full rounded border px-3 py-2 text-sm"
          >
            {BADGES.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filter-min-price" className="block text-sm font-semibold">Min Price</label>
          <input
            id="filter-min-price"
            name="minPrice"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="mt-1 w-full rounded border px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label htmlFor="filter-max-price" className="block text-sm font-semibold">Max Price</label>
          <input
            id="filter-max-price"
            name="maxPrice"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="mt-1 w-full rounded border px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <p className="mb-4 text-sm text-zinc-600">
          {results.length} products found{debouncedQuery ? ` for "${debouncedQuery}"` : ""}
        </p>

        {results.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-8 text-center">
            <p className="text-base font-semibold text-zinc-900">No products match your filters.</p>
            <p className="mt-1 text-sm text-zinc-600">Try clearing filters or using fewer words in search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {results.map((p) => (
              <div key={p.id}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
