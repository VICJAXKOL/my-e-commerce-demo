import Link from "next/link";
import PageIntro from "../../components/PageIntro";

export default function ReturnsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 pt-20 sm:px-6">
      <PageIntro
        eyebrow="Returns and refunds"
        title="A clearer return process when something isn’t right"
        description="We want returns to feel understandable and fair. Here’s what qualifies, how it works, and what to expect after approval."
        highlights={[
          { title: "Returns window", text: "Eligible items can be returned within 30 days of purchase." },
          { title: "Refund timing", text: "Refunds are typically processed within 5–7 business days after inspection." },
          { title: "Support available", text: "Contact support with your order number for faster help." },
        ]}
      />

      <section className="grid gap-4 md:grid-cols-2">
        <article className="surface-card p-6">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">Return policy</h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            Items must be in original, unused condition with packaging and tags intact to qualify for full returns on eligible orders.
          </p>
        </article>
        <article className="surface-card p-6">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">Non-returnable items</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
            <li>Clearance or final sale items</li>
            <li>Items damaged through customer misuse</li>
            <li>Custom or personalized orders</li>
          </ul>
        </article>
      </section>

      <section className="surface-card p-6">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">How to return an item</h2>
        <ol className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Contact support with your order number.",
            "Receive return approval and shipping instructions.",
            "Pack the item securely and send it back.",
            "Wait for inspection and refund confirmation.",
          ].map((step, index) => (
            <li key={step} className="surface-soft p-4 text-sm leading-6 text-muted">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-600)]">Step {index + 1}</p>
              <p className="mt-3">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="surface-card p-5 text-sm text-muted">
        Have questions about your order?{" "}
        <Link href="/contact" className="font-semibold text-[var(--brand-600)] hover:text-[var(--brand-700)]">
          Contact support
        </Link>{" "}
        and include your order number for quicker help.
      </section>
    </div>
  );
}
