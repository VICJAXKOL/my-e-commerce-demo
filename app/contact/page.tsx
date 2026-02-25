export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl pt-20">
      <section className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-10 text-white shadow-lg">
        <p className="text-sm uppercase tracking-widest text-sky-300">Contact MyShop</p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">We&apos;re Here To Help</h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
          Reach out for order support, shipping updates, returns, or account questions. Include your order
          number in your message for quicker resolution.
        </p>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-2">
          <article className="surface-card p-5">
            <h2 className="text-lg font-semibold text-zinc-900">Support Channels</h2>
            <div className="mt-3 space-y-2 text-sm text-zinc-700">
              <p><strong>Email:</strong> support@myshop.com</p>
              <p><strong>Phone:</strong> 1-800-MYSHOP-1</p>
              <p><strong>Hours:</strong> Monday-Friday, 9am-6pm EST</p>
            </div>
          </article>

          <article className="surface-card p-5">
            <h2 className="text-lg font-semibold text-zinc-900">What To Include</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-700">
              <li>Your full name and preferred reply email</li>
              <li>Order number (if your question is order-related)</li>
              <li>A clear description of the issue</li>
            </ul>
          </article>

          <article className="surface-card p-5">
            <h2 className="text-lg font-semibold text-zinc-900">Response Time</h2>
            <p className="mt-2 text-sm text-zinc-700">
              Typical response time is under 24 business hours.
            </p>
          </article>
        </div>

        <div className="surface-card p-6 lg:col-span-3">
          <h2 className="text-xl font-semibold text-zinc-900">Send Us A Message</h2>
          <form className="mt-4 space-y-4">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-semibold">Name</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                className="focus-ring mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-semibold">Email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                className="focus-ring mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm font-semibold">Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows={6}
                className="focus-ring mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
              ></textarea>
            </div>
            <button className="btn-primary px-5 py-2.5 text-sm font-semibold">Send Message</button>
          </form>
        </div>
      </section>
    </div>
  );
}
