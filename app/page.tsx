import Image from "next/image";
import Link from "next/link";
import { products, getProductsByCategory } from "../lib/products";
import ProductCard from "../components/ProductCard";
import Hero from "../components/Hero";

export default function Home() {
  const apparelProducts = getProductsByCategory("Apparel");
  const footwearProducts = getProductsByCategory("Footwear");
  const homeProducts = getProductsByCategory("Home");
  const electronicsProducts = getProductsByCategory("Electronics");
  const sportsProducts = getProductsByCategory("Sports & Fitness");
  const beautyProducts = getProductsByCategory("Beauty & Personal Care");

  return (
    <>
      <Hero />
      <main className="mx-auto max-w-5xl px-4 py-8">
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
    </>
  );
}
