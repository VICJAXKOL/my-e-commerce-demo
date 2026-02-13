"use client";

import Image from "next/image";
import React from "react";

const slides = [
  {
    title: "Curated Collections",
    text: "We focus on practical, stylish, and reliable choices across everyday categories.",
    image: "/products/hoodie.svg",
  },
  {
    title: "Smart Shopping Experience",
    text: "Browse quickly, compare with confidence, and keep checkout simple.",
    image: "/products/headphones.svg",
  },
  {
    title: "Lifestyle-Ready Picks",
    text: "From home to fitness and fashion, everything is selected for daily use.",
    image: "/products/yogamat.svg",
  },
  {
    title: "Quality-First Standards",
    text: "Every product type is reviewed for comfort, durability, and value.",
    image: "/products/sneakers.svg",
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
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-zinc-900 sm:text-2xl">Inside MyShop</h2>
          <p className="text-sm text-zinc-600">A quick visual story of what defines our store.</p>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            onClick={() => setActive((prev) => (prev - 1 + slides.length) % slides.length)}
            className="rounded-md border border-zinc-300 px-3 py-1 text-sm text-zinc-700 hover:bg-zinc-100"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => setActive((prev) => (prev + 1) % slides.length)}
            className="rounded-md border border-zinc-300 px-3 py-1 text-sm text-zinc-700 hover:bg-zinc-100"
          >
            Next
          </button>
        </div>
      </div>

      <div className="grid gap-5 rounded-xl bg-zinc-50 p-4 md:grid-cols-2 md:items-center">
        <div className="relative h-56 overflow-hidden rounded-lg bg-white sm:h-64">
          <Image src={current.image} alt={current.title} fill className="object-contain p-6" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-zinc-900">{current.title}</h3>
          <p className="mt-2 text-sm leading-7 text-zinc-600">{current.text}</p>
          <div className="mt-5 flex items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  index === active ? "w-8 bg-zinc-900" : "w-2.5 bg-zinc-300 hover:bg-zinc-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
