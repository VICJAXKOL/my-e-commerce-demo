import Link from "next/link";
import PageIntro from "../../components/PageIntro";

export default function FAQPage() {
  const faqSections = [
    {
      title: "Orders and shipping",
      items: [
        { q: "Do you offer free shipping?", a: "Orders over NGN 50,000 qualify for free shipping within Nigeria." },
        { q: "How long does delivery take?", a: "Standard delivery typically takes 3-5 business days, while express delivery arrives faster." },
        { q: "How do I track my order?", a: "You can use the track page or your orders page once your purchase has been placed." },
      ],
    },
    {
      title: "Changes and returns",
      items: [
        { q: "Can I change my order?", a: "Yes, within 24 hours of purchase. Contact support as soon as possible." },
        { q: "What is your return policy?", a: "We offer 30-day returns on eligible items in original condition." },
        { q: "When do refunds appear?", a: "Refunds are typically processed within 5-10 business days after approval." },
      ],
    },
    {
      title: "Account and payments",
      items: [
        { q: "What payment methods are accepted?", a: "We support major payment options through secure hosted payment flows." },
        { q: "Is checkout secure?", a: "Yes. Transactions are encrypted and processed through secure payment gateways." },
        { q: "Do you ship internationally?", a: "At the moment the flow is optimized for Nigeria-based delivery expectations." },
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6 pt-20">
      <PageIntro
        eyebrow="Support center"
        title="Quick answers for common shopping questions"
        description="Find guidance on shipping, returns, account access, and payments without needing to leave the flow."
        highlights={[
          { title: "Reply time", text: "Most support requests are answered within one business day." },
          { title: "Returns window", text: "Eligible items can be returned within 30 days." },
          { title: "Support access", text: "Tracking, contact, and returns pages stay easy to reach." },
        ]}
      />

      <section className="space-y-6">
        {faqSections.map((section) => (
          <div key={section.title} className="surface-card p-6">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">{section.title}</h2>
            <div className="mt-4 space-y-3">
              {section.items.map((faq) => (
                <details key={faq.q} className="surface-soft rounded-2xl p-4">
                  <summary className="cursor-pointer text-sm font-semibold text-zinc-900 dark:text-white">{faq.q}</summary>
                  <p className="mt-3 text-sm leading-7 text-muted">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="surface-card p-5 text-sm text-muted">
        Need more help? Visit the{" "}
        <Link href="/contact" className="font-semibold text-[var(--brand-600)] hover:text-[var(--brand-700)]">
          contact page
        </Link>{" "}
        for direct support, or use{" "}
        <Link href="/track" className="font-semibold text-[var(--brand-600)] hover:text-[var(--brand-700)]">
          order tracking
        </Link>{" "}
        for delivery updates.
      </section>
    </div>
  );
}
