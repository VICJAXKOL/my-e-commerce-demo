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
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-zinc-900 sm:text-2xl">What To Expect</h2>
          <p className="text-sm text-zinc-600">A quick visual preview of the experience in MyShop.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIndex((prev) => (prev - 1 + slides.length) % slides.length)}
            className="rounded-md border border-zinc-300 px-3 py-1 text-sm text-zinc-700 hover:bg-zinc-100"
            aria-label="Previous slide"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => setIndex((prev) => (prev + 1) % slides.length)}
            className="rounded-md border border-zinc-300 px-3 py-1 text-sm text-zinc-700 hover:bg-zinc-100"
            aria-label="Next slide"
          >
            Next
          </button>
        </div>
      </div>

      <div className="grid gap-4 rounded-xl bg-zinc-50 p-4 md:grid-cols-2 md:items-center">
        <div className="relative h-56 overflow-hidden rounded-lg bg-white sm:h-64">
          <Image
            src={current.image}
            alt={current.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-6"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-zinc-900">{current.title}</h3>
          <p className="mt-2 text-sm leading-6 text-zinc-600">{current.description}</p>
          <div className="mt-4 flex items-center gap-2">
            {slides.map((slide, slideIndex) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => setIndex(slideIndex)}
                className={`h-2.5 rounded-full transition-all ${
                  slideIndex === index ? "w-8 bg-zinc-900" : "w-2.5 bg-zinc-300 hover:bg-zinc-400"
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

