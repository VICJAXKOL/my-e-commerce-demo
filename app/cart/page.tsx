import CartClient from "../../components/CartClient";

export default function CartPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 pt-20 sm:px-6">
      <section className="surface-spotlight p-6 text-white sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-200">Cart review</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Review your items before checkout
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Adjust quantities, remove anything you no longer need, and move into checkout with a clearer sense of cost and delivery.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <article className="surface-spotlight-soft p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Step 1</p>
              <p className="mt-2 text-base font-semibold text-white">Review cart</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">Check totals, update item quantities, and confirm what stays.</p>
            </article>
            <article className="surface-spotlight-soft p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Step 2</p>
              <p className="mt-2 text-base font-semibold text-white">Add shipping details</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">Enter contact and address info with less clutter and clearer guidance.</p>
            </article>
            <article className="surface-spotlight-soft p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Step 3</p>
              <p className="mt-2 text-base font-semibold text-white">Pay securely</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">Complete payment through a secure Paystack-hosted flow.</p>
            </article>
          </div>
        </div>
      </section>

      <CartClient />
    </div>
  );
}
