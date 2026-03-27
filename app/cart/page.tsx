import CartClient from "../../components/CartClient";

export default function CartPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 pt-20 sm:px-6">
      <section className="surface-card overflow-hidden p-6 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-600)]">Cart review</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              Review your items before checkout
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base">
              Adjust quantities, remove anything you no longer need, and move into checkout with a clearer sense of cost and delivery.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <article className="surface-soft p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Step 1</p>
              <p className="mt-2 text-base font-semibold text-zinc-900 dark:text-white">Review cart</p>
              <p className="mt-2 text-sm leading-6 text-muted">Check totals, update item quantities, and confirm what stays.</p>
            </article>
            <article className="surface-soft p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Step 2</p>
              <p className="mt-2 text-base font-semibold text-zinc-900 dark:text-white">Add shipping details</p>
              <p className="mt-2 text-sm leading-6 text-muted">Enter contact and address info with less clutter and clearer guidance.</p>
            </article>
            <article className="surface-soft p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Step 3</p>
              <p className="mt-2 text-base font-semibold text-zinc-900 dark:text-white">Pay securely</p>
              <p className="mt-2 text-sm leading-6 text-muted">Complete payment through a secure Paystack-hosted flow.</p>
            </article>
          </div>
        </div>
      </section>

      <CartClient />
    </div>
  );
}
