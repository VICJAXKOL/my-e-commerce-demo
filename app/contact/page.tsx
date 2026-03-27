import PageIntro from "../../components/PageIntro";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 pt-20 sm:px-6">
      <PageIntro
        eyebrow="Contact support"
        title="We’re here to help with orders, returns, and account issues"
        description="Reach out for shipping updates, order support, returns, or account questions. Including your order number helps us respond faster."
        highlights={[
          { title: "Email support", text: "support@myshop.com" },
          { title: "Phone support", text: "1-800-MYSHOP-1 · Monday to Friday" },
          { title: "Typical response", text: "Most requests are answered within 24 business hours." },
        ]}
      />

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          <article className="surface-card p-5">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">What to include</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
              <li>Your full name and preferred reply email</li>
              <li>Order number if your question is order-related</li>
              <li>A short description of what you need help with</li>
            </ul>
          </article>

          <article className="surface-card p-5">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">Best reasons to contact us</h2>
            <div className="mt-4 grid gap-3">
              <div className="surface-soft px-4 py-3 text-sm text-zinc-700 dark:text-slate-200">Order support and delivery updates</div>
              <div className="surface-soft px-4 py-3 text-sm text-zinc-700 dark:text-slate-200">Returns, exchanges, and refunds</div>
              <div className="surface-soft px-4 py-3 text-sm text-zinc-700 dark:text-slate-200">Account access and verification help</div>
            </div>
          </article>
        </div>

        <section className="surface-card p-6 sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">Send us a message</h2>
          <p id="contact-help" className="mt-2 text-sm leading-6 text-muted">
            Share your contact details and a short message so the support team can respond clearly.
          </p>
          <form className="mt-5 space-y-4">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-semibold text-zinc-900 dark:text-white">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                aria-describedby="contact-help"
                className="input-control focus-ring mt-2 px-4 py-3 text-sm"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-semibold text-zinc-900 dark:text-white">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                aria-describedby="contact-help"
                className="input-control focus-ring mt-2 px-4 py-3 text-sm"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm font-semibold text-zinc-900 dark:text-white">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={6}
                aria-describedby="contact-help"
                className="input-control focus-ring mt-2 px-4 py-3 text-sm"
              />
            </div>
            <button type="submit" className="btn-primary focus-ring px-5 py-3 text-sm font-semibold">
              Send message
            </button>
          </form>
        </section>
      </section>
    </div>
  );
}
