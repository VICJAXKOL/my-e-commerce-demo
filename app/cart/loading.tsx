export default function CartLoading() {
  return (
    <div className="mx-auto max-w-5xl pt-20">
      <section className="mb-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-8 text-white shadow-lg">
        <p className="text-xs uppercase tracking-widest text-sky-300">Checkout</p>
        <h1 className="mt-2 text-3xl font-semibold">Your Cart</h1>
        <p className="mt-2 text-sm text-slate-300">Loading cart details...</p>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="h-36 animate-pulse rounded-2xl bg-zinc-200" />
          <div className="h-36 animate-pulse rounded-2xl bg-zinc-200" />
        </div>
        <div className="h-64 animate-pulse rounded-2xl bg-zinc-200" />
      </div>
    </div>
  );
}
