import { SearchAndFilter } from "../../components/SearchAndFilter";

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="mb-2 text-2xl font-semibold">Shop All Products</h1>
      <p className="mb-6 text-sm text-zinc-600">Discover our complete collection of quality items.</p>
      <SearchAndFilter />
    </div>
  );
}
