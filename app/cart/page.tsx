import CartClient from "../../components/CartClient";

export default function CartPage() {
  return (
    <div className="mx-auto max-w-5xl pt-20">
      <section className="mb-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-8 text-white shadow-lg">
        <p className="text-xs uppercase tracking-widest text-sky-300">Checkout</p>
        <h1 className="mt-2 text-3xl font-semibold">Your Cart</h1>
        <p className="mt-2 text-sm text-slate-300">
          Review your items, adjust quantities, and continue to secure checkout.
        </p>
      </section>

      <div>
        <CartClient />
      </div>
    </div>
  );
}
