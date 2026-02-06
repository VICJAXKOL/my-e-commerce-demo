import Image from "next/image";
import Link from "next/link";
import { products, getProductsByCategory } from "../lib/products";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const apparelProducts = getProductsByCategory("Apparel");
  const footwearProducts = getProductsByCategory("Footwear");
  const homeProducts = getProductsByCategory("Home");
  const electronicsProducts = getProductsByCategory("Electronics");
  const sportsProducts = getProductsByCategory("Sports & Fitness");
  const beautyProducts = getProductsByCategory("Beauty & Personal Care");

  return (
    <main className="mx-auto max-w-5xl">
      <section className="rounded-lg bg-white p-8 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold">Welcome to MyShop</h1>
            <p className="mt-2 text-zinc-600">
              A minimal e-commerce demo with routing — browse products, add to cart, and
              checkout.
            </p>
            <div className="mt-4 flex gap-3">
              <Link href="/products" className="rounded bg-black px-4 py-2 text-white">
                Shop Products
              </Link>
              <Link href="/categories" className="rounded border px-4 py-2">
                Browse Categories
              </Link>
            </div>
          </div>
          <div className="w-48">
            <Image src="/products/tshirt.svg" alt="Hero" width={192} height={160} />
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold">Apparel</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {apparelProducts.slice(0, 4).map((p) => (
            <div key={p.id}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold">Footwear</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {footwearProducts.slice(0, 4).map((p) => (
            <div key={p.id}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold">Home & Living</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {homeProducts.slice(0, 4).map((p) => (
            <div key={p.id}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold">Electronics</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {electronicsProducts.slice(0, 4).map((p) => (
            <div key={p.id}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold">Sports & Fitness</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sportsProducts.slice(0, 4).map((p) => (
            <div key={p.id}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold">Beauty & Personal Care</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {beautyProducts.slice(0, 4).map((p) => (
            <div key={p.id}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
