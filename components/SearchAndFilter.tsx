"use client";

import React, { useState } from "react";
import { searchProducts, filterProducts } from "../lib/products";
import ProductCard from "./ProductCard";

export function SearchAndFilter() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200);

  const results =
    query.length > 0
      ? searchProducts(query)
      : filterProducts(
          category === "All" ? undefined : category,
          minPrice,
          maxPrice,
          sortBy as "price-asc" | "price-desc" | "rating" | "newest"
        );

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex gap-2">
        <input
          id="search-products"
          name="search"
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 rounded border px-4 py-2"
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div>
          <label htmlFor="filter-category" className="block text-sm font-semibold">Category</label>
          <select
            id="filter-category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full rounded border px-3 py-2 text-sm"
          >
            <option>All</option>
            <option>Apparel</option>
            <option>Footwear</option>
            <option>Home</option>
            <option>Electronics</option>
            <option>Sports & Fitness</option>
            <option>Beauty & Personal Care</option>
            <option>Accessories</option>
            <option>Books & Entertainment</option>
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

      {/* Results */}
      <div>
        <p className="mb-4 text-sm text-zinc-600">{results.length} products found</p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((p) => (
            <div key={p.id}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
