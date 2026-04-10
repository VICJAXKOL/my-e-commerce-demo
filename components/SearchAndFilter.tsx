"use client";

import React from "react";
import { filterProducts, products, type Product } from "../lib/products";
import ProductCard from "./ProductCard";

const BADGES = ["All", "Popular", "New", "Sale"] as const;
type BadgeFilter = (typeof BADGES)[number];
type SortOption = "price-asc" | "price-desc" | "rating" | "newest";

const ALL_CATEGORIES = ["All", ...Array.from(new Set(products.map((product) => product.category)))];
const MIN_AVAILABLE_PRICE = Math.min(...products.map((product) => product.price));
const MAX_AVAILABLE_PRICE = Math.max(...products.map((product) => product.price));

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
    if (term.length <= 2) return words.some((word) => word.startsWith(term));
    return words.some((word) => word.includes(term) || levenshtein(word, term) <= 1);
  });
}

function isBadgeFilter(value: string): value is BadgeFilter {
  return BADGES.includes(value as BadgeFilter);
}

type SearchAndFilterProps = {
  initialQuery?: string;
  initialCategory?: string;
  initialBadge?: string;
};

export function SearchAndFilter({
  initialQuery = "",
  initialCategory = "All",
  initialBadge = "All",
}: SearchAndFilterProps) {
  const [query, setQuery] = React.useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = React.useState(initialQuery.trim());
  const [category, setCategory] = React.useState(
    ALL_CATEGORIES.includes(initialCategory) ? initialCategory : "All"
  );
  const [sortBy, setSortBy] = React.useState<SortOption>("newest");
  const [badge, setBadge] = React.useState<BadgeFilter>(isBadgeFilter(initialBadge) ? initialBadge : "All");
  const [minPrice, setMinPrice] = React.useState(MIN_AVAILABLE_PRICE);
  const [maxPrice, setMaxPrice] = React.useState(MAX_AVAILABLE_PRICE);

  React.useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQuery(query.trim()), 220);
    return () => window.clearTimeout(timer);
  }, [query]);

  const baseResults = React.useMemo(
    () => filterProducts(category === "All" ? undefined : category, minPrice, maxPrice, sortBy),
    [category, minPrice, maxPrice, sortBy]
  );

  const results = React.useMemo(() => {
    let next = baseResults;

    if (badge !== "All") {
      next = next.filter((product) => product.badge === badge);
    }

    if (debouncedQuery.length > 0) {
      next = next.filter((product) => matchesQuery(product, debouncedQuery));
    }

    return next;
  }, [baseResults, badge, debouncedQuery]);

  const activeFilterCount = [
    category !== "All",
    badge !== "All",
    sortBy !== "newest",
    minPrice !== MIN_AVAILABLE_PRICE,
    maxPrice !== MAX_AVAILABLE_PRICE,
    debouncedQuery.length > 0,
  ].filter(Boolean).length;

  const clearFilters = () => {
    setQuery("");
    setCategory("All");
    setSortBy("newest");
    setBadge("All");
    setMinPrice(MIN_AVAILABLE_PRICE);
    setMaxPrice(MAX_AVAILABLE_PRICE);
  };

  return (
    <div className="space-y-6">
      <section className="surface-card p-5 sm:p-6">
        <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                id="search-products"
                name="search"
                type="text"
                placeholder="Search products, categories, or keywords"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="input-control focus-ring px-4 py-3 text-sm"
              />
              <button type="button" onClick={clearFilters} className="btn-outline focus-ring px-4 py-3 text-sm font-semibold">
                Reset all
              </button>
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Browse by category</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {ALL_CATEGORIES.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setCategory(chip)}
                    className={`focus-ring rounded-full border px-4 py-2 text-xs font-semibold transition ${
                      category === chip
                        ? "border-[var(--brand-500)] bg-[color:color-mix(in_srgb,var(--brand-500)_10%,white)] text-[var(--brand-700)]"
                        : "border-[var(--border-strong)] bg-[var(--surface-1)] text-zinc-700 hover:bg-[var(--surface-2)] dark:text-white"
                    }`}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            <article className="surface-soft p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Products</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">{results.length}</p>
              <p className="mt-1 text-sm text-muted">Matching your current view</p>
            </article>
            <article className="surface-soft p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Active filters</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">{activeFilterCount}</p>
              <p className="mt-1 text-sm text-muted">Search, sort, category, badge, and price</p>
            </article>
            <article className="surface-soft p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Price window</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                ₦{minPrice.toLocaleString()}–₦{maxPrice.toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-muted">Adjust the range to narrow the catalog</p>
            </article>
          </div>
        </div>
      </section>

      <section className="surface-card p-5 sm:p-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <div>
            <label htmlFor="filter-category" className="block text-sm font-semibold text-zinc-900 dark:text-white">
              Category
            </label>
            <select
              id="filter-category"
              name="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="input-control focus-ring mt-2 px-4 py-3 text-sm"
            >
              {ALL_CATEGORIES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filter-sort" className="block text-sm font-semibold text-zinc-900 dark:text-white">
              Sort by
            </label>
            <select
              id="filter-sort"
              name="sortBy"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortOption)}
              className="input-control focus-ring mt-2 px-4 py-3 text-sm"
            >
              <option value="newest">Newest arrivals</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="rating">Highest rated</option>
            </select>
          </div>

          <div>
            <label htmlFor="filter-badge" className="block text-sm font-semibold text-zinc-900 dark:text-white">
              Badge
            </label>
            <select
              id="filter-badge"
              name="badge"
              value={badge}
              onChange={(event) => setBadge(event.target.value as BadgeFilter)}
              className="input-control focus-ring mt-2 px-4 py-3 text-sm"
            >
              {BADGES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filter-min-price" className="block text-sm font-semibold text-zinc-900 dark:text-white">
              Min price
            </label>
            <input
              id="filter-min-price"
              name="minPrice"
              type="number"
              value={minPrice}
              min={MIN_AVAILABLE_PRICE}
              max={maxPrice}
              onChange={(event) => setMinPrice(Number(event.target.value))}
              className="input-control focus-ring mt-2 px-4 py-3 text-sm"
            />
          </div>

          <div>
            <label htmlFor="filter-max-price" className="block text-sm font-semibold text-zinc-900 dark:text-white">
              Max price
            </label>
            <input
              id="filter-max-price"
              name="maxPrice"
              type="number"
              value={maxPrice}
              min={minPrice}
              max={MAX_AVAILABLE_PRICE}
              onChange={(event) => setMaxPrice(Number(event.target.value))}
              className="input-control focus-ring mt-2 px-4 py-3 text-sm"
            />
          </div>
        </div>

        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Quick badge filters</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {BADGES.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setBadge(option)}
                className={`focus-ring rounded-full border px-4 py-2 text-xs font-semibold transition ${
                  badge === option
                    ? "border-[var(--brand-500)] bg-[color:color-mix(in_srgb,var(--brand-500)_10%,white)] text-[var(--brand-700)]"
                    : "border-[var(--border-strong)] bg-[var(--surface-1)] text-zinc-700 hover:bg-[var(--surface-2)] dark:text-white"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">Browse results</h2>
            <p className="mt-1 text-sm text-muted">
              {results.length} products found{debouncedQuery ? ` for "${debouncedQuery}"` : ""}.
            </p>
          </div>
          <p className="text-sm text-muted">
            {activeFilterCount > 0 ? `${activeFilterCount} filters active` : "Showing the full catalog"}
          </p>
        </div>

        {results.length === 0 ? (
          <div className="surface-card p-10 text-center">
            <div className="mx-auto max-w-md">
              <p className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">No products match your filters yet</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Try widening your price range, clearing filters, or using fewer words in search.
              </p>
              <button type="button" onClick={clearFilters} className="btn-primary focus-ring mt-5 px-5 py-3 text-sm font-semibold">
                Clear filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
