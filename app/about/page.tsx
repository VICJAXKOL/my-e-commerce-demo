import Link from "next/link";
import AboutShowcase from "../../components/AboutShowcase";
import PageIntro from "../../components/PageIntro";

const pillars = [
  {
    title: "Carefully curated",
    text: "We choose products that balance quality, style, and everyday usefulness rather than overwhelming shoppers with noise.",
  },
  {
    title: "Customer-first flow",
    text: "From browsing to checkout, we aim for an experience that feels clear, fast, and less mentally heavy.",
  },
  {
    title: "Reliable support",
    text: "Policies, contact options, and help content stay visible so customers aren’t left guessing.",
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 pb-10 pt-20 sm:px-6">
      <PageIntro
        eyebrow="About MyShop"
        title="We’re building a calmer, more curated shopping experience"
        description="MyShop is designed to make online shopping feel modern, reliable, and less overwhelming — with better product discovery, clearer information, and smoother checkout."
        highlights={[
          { title: "8 curated categories", text: "A focused catalog across fashion, home, tech, fitness, beauty, and more." },
          { title: "Confidence-first design", text: "Pages are structured to reduce hesitation and improve shopping clarity." },
          { title: "Support you can find", text: "FAQ, tracking, returns, and contact paths remain easy to reach." },
        ]}
        actions={
          <>
            <Link href="/products" className="btn-primary focus-ring px-5 py-3 text-sm font-semibold">
              View products
            </Link>
            <Link href="/contact" className="btn-outline focus-ring px-5 py-3 text-sm font-semibold">
              Contact us
            </Link>
          </>
        }
      />

      <section className="grid gap-4 md:grid-cols-3">
        {pillars.map((pillar) => (
          <article key={pillar.title} className="surface-card p-6">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">{pillar.title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted">{pillar.text}</p>
          </article>
        ))}
      </section>

      <AboutShowcase />
    </main>
  );
}
