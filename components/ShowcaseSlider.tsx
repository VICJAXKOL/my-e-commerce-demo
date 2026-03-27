"use client";

import Image from "next/image";
import React from "react";

const slides = [
  {
    title: "Style and Apparel",
    description: "Everyday essentials, seasonal looks, and clean fits for work and weekends.",
    image: "/products/hoodie.webp",
  },
  {
    title: "Footwear Picks",
    description: "Comfort-first sneakers, boots, and active shoes for different lifestyles.",
    image: "/products/sneakers.jpg",
  },
  {
    title: "Home and Living",
    description: "Practical home items designed to keep spaces simple and functional.",
    image: "/products/pillow.webp",
  },
  {
    title: "Tech and Gadgets",
    description: "Reliable electronics and accessories selected for daily productivity.",
    image: "/products/headphones.jpg",
  },
  {
    title: "Sports and Fitness",
    description: "Training gear and recovery-focused products to support active routines.",
    image: "/products/yogamat.jpg",
  },
];

export default function ShowcaseSlider() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, []);

  const current = slides[index];

  return (
    <section className="surface-soft overflow-hidden p-5 sm:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-600)]">Visual preview</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">What to expect from the catalog</h2>
          <p className="mt-2 text-sm leading-6 text-muted">A quick visual preview of the experience in MyShop.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIndex((prev) => (prev - 1 + slides.length) % slides.length)}
            className="btn-outline focus-ring px-4 py-2 text-sm font-semibold"
            aria-label="Previous slide"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => setIndex((prev) => (prev + 1) % slides.length)}
            className="btn-outline focus-ring px-4 py-2 text-sm font-semibold"
            aria-label="Next slide"
          >
            Next
          </button>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-[1.05fr_0.95fr] md:items-center">
        <div className="surface-card relative h-64 overflow-hidden rounded-[1.5rem] bg-[radial-gradient(circle_at_top,#ffffff,transparent_65%)] p-4 sm:h-72">
          <Image
            src={current.image}
            alt={current.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-8"
          />
        </div>
        <div className="space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              Slide {index + 1} of {slides.length}
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">{current.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted">{current.description}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="surface-card p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Curated picks</p>
              <p className="mt-2 text-sm leading-6 text-zinc-700 dark:text-slate-200">Focused selections help shoppers scan products without overload.</p>
            </div>
            <div className="surface-card p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Better discovery</p>
              <p className="mt-2 text-sm leading-6 text-zinc-700 dark:text-slate-200">Categories, filters, and product pages work together with less friction.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {slides.map((slide, slideIndex) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => setIndex(slideIndex)}
                aria-pressed={slideIndex === index}
                className={`h-2.5 rounded-full transition-all ${
                  slideIndex === index
                    ? "w-8 bg-[var(--brand-600)]"
                    : "w-2.5 bg-zinc-300 hover:bg-zinc-400 dark:bg-slate-600 dark:hover:bg-slate-500"
                }`}
                aria-label={`Go to slide ${slideIndex + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
