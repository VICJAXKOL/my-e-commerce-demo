"use client";

import Image from "next/image";
import React from "react";

const slides = [
  {
    title: "Curated Collections",
    text: "We focus on practical, stylish, and reliable choices across everyday categories.",
    image: "/products/jeans.jpg",
  },
  {
    title: "Smart Shopping Experience",
    text: "Browse quickly, compare with confidence, and keep checkout simple.",
    image: "/products/headphones.jpg",
  },
  {
    title: "Lifestyle-Ready Picks",
    text: "From home to fitness and fashion, everything is selected for daily use.",
    image: "/products/backpack.jpg",
  },
  {
    title: "Quality-First Standards",
    text: "Every product type is reviewed for comfort, durability, and value.",
    image: "/products/sneakers.jpg",
  },
];

export default function AboutShowcase() {
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  const current = slides[active];

  return (
    <section className="surface-card p-5 sm:p-7">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-600)]">Inside MyShop</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-white">A quick visual story of the store</h2>
          <p className="mt-2 text-sm text-muted">See the values shaping our collections and customer experience.</p>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            onClick={() => setActive((prev) => (prev - 1 + slides.length) % slides.length)}
            className="btn-outline focus-ring px-4 py-2 text-sm font-semibold"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => setActive((prev) => (prev + 1) % slides.length)}
            className="btn-outline focus-ring px-4 py-2 text-sm font-semibold"
          >
            Next
          </button>
        </div>
      </div>

      <div className="surface-soft grid gap-5 rounded-[1.5rem] p-4 md:grid-cols-2 md:items-center">
        <div className="relative h-56 overflow-hidden rounded-[1.25rem] bg-white sm:h-64">
          <Image
            src={current.image}
            alt={current.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-6"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">{current.title}</h3>
          <p className="mt-3 text-sm leading-7 text-muted">{current.text}</p>
          <div className="mt-5 flex items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  index === active ? "w-8 bg-[var(--brand-600)]" : "w-2.5 bg-zinc-300 hover:bg-zinc-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

