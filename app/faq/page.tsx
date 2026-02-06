export default function FAQPage() {
  const faqs = [
    { q: "What is your return policy?", a: "We offer 30-day returns on all items in original condition." },
    { q: "Do you offer free shipping?", a: "Orders over $50 qualify for free shipping within the US." },
    { q: "How long does delivery take?", a: "Typically 3-5 business days for standard shipping." },
    { q: "Can I change my order?", a: "Yes, within 24 hours of purchase. Contact support immediately." },
    { q: "Do you ship internationally?", a: "We currently ship to North America and Europe." },
    { q: "How do I track my order?", a: "You'll receive a tracking number via email after shipment." },
  ];

  return (
    <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-semibold">Frequently Asked Questions</h1>

      <div className="mt-6 space-y-4">
        {faqs.map((faq, i) => (
          <details key={i} className="border-b pb-4">
            <summary className="cursor-pointer font-semibold text-zinc-900">
              {faq.q}
            </summary>
            <p className="mt-2 text-zinc-600">{faq.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
