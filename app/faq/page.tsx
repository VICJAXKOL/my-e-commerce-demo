export default function FAQPage() {
  const faqSections = [
    {
      title: "Orders and Shipping",
      items: [
        { q: "Do you offer free shipping?", a: "Orders over $50 qualify for free shipping within the US." },
        { q: "How long does delivery take?", a: "Standard delivery typically takes 3-5 business days." },
        { q: "How do I track my order?", a: "You receive a tracking link by email once your order ships." },
      ],
    },
    {
      title: "Changes and Returns",
      items: [
        { q: "Can I change my order?", a: "Yes, within 24 hours of purchase. Contact support as soon as possible." },
        { q: "What is your return policy?", a: "We offer 30-day returns on eligible items in original condition." },
        { q: "When do refunds appear?", a: "Refunds are typically processed within 5-10 business days after approval." },
      ],
    },
    {
      title: "Account and Payments",
      items: [
        { q: "What payment methods are accepted?", a: "We support major credit cards and secure digital payment options." },
        { q: "Is checkout secure?", a: "Yes. Transactions are encrypted and processed through secure gateways." },
        { q: "Do you ship internationally?", a: "We currently ship to North America and selected European locations." },
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-4xl pt-20">
      <section className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-10 text-white shadow-lg">
        <p className="text-sm uppercase tracking-widest text-sky-300">Support Center</p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Help and Frequently Asked Questions</h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
          Quick answers for shipping, returns, payments, and account concerns. If you need personalized
          help, our support team is available Monday to Friday, 9am-6pm EST.
        </p>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-3">
        <article className="surface-card p-4">
          <h2 className="text-sm font-semibold text-zinc-900">Average Reply Time</h2>
          <p className="mt-1 text-2xl font-semibold text-zinc-900">Under 24h</p>
          <p className="mt-1 text-xs text-muted">Most requests are resolved within one business day.</p>
        </article>
        <article className="surface-card p-4">
          <h2 className="text-sm font-semibold text-zinc-900">Returns Window</h2>
          <p className="mt-1 text-2xl font-semibold text-zinc-900">30 Days</p>
          <p className="mt-1 text-xs text-muted">Items must be in original condition for full refund.</p>
        </article>
        <article className="surface-card p-4">
          <h2 className="text-sm font-semibold text-zinc-900">Support Availability</h2>
          <p className="mt-1 text-2xl font-semibold text-zinc-900">Mon-Fri</p>
          <p className="mt-1 text-xs text-muted">9am-6pm EST via email and phone support.</p>
        </article>
      </section>

      <section className="mt-6 space-y-6">
        {faqSections.map((section) => (
          <div key={section.title} className="surface-card p-6">
            <h2 className="text-lg font-semibold text-zinc-900">{section.title}</h2>
            <div className="mt-4 space-y-3">
              {section.items.map((faq) => (
                <details key={faq.q} className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                  <summary className="cursor-pointer font-semibold text-zinc-900">{faq.q}</summary>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="mt-6 rounded-xl border border-zinc-200 bg-white p-5 text-sm text-zinc-700 shadow-sm">
        Need more help? Use the contact page for direct support and include your order number for faster assistance.
      </section>
    </div>
  );
}
