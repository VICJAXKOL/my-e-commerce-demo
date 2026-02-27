import Link from "next/link";

type Props = {
  searchParams:
    | {
        order?: string;
        total?: string;
        eta?: string;
      }
    | Promise<{
        order?: string;
        total?: string;
        eta?: string;
      }>;
};

export default async function OrderConfirmationPage({ searchParams }: Props) {
  const resolved = await Promise.resolve(searchParams);
  const order = resolved.order ?? "ORD-000000";
  const total = resolved.total ?? "0.00";
  const eta = resolved.eta ?? "3-5";

  const now = new Date();
  const orderDate = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div className="mx-auto max-w-3xl pt-20">
      <section className="rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-700 p-8 text-white shadow-lg">
        <p className="text-xs uppercase tracking-widest text-emerald-100">Order Complete</p>
        <h1 className="mt-2 text-3xl font-semibold">Order Confirmed</h1>
        <p className="mt-2 text-sm text-emerald-50">
          Thank you for your purchase. A confirmation email has been sent with your order details.
        </p>
      </section>

      <section className="surface-card mt-6 rounded-2xl p-6">
        <div className="grid gap-3 text-sm sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
            <p className="text-zinc-500">Order Number</p>
            <p className="font-semibold text-zinc-900">{order}</p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
            <p className="text-zinc-500">Order Date</p>
            <p className="font-semibold text-zinc-900">{orderDate}</p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
            <p className="text-zinc-500">Estimated Delivery</p>
            <p className="font-semibold text-zinc-900">{eta} business days</p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
            <p className="text-zinc-500">Total Paid</p>
            <p className="font-semibold text-zinc-900">${total}</p>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-4 text-sm text-zinc-700">
          <h2 className="font-semibold text-zinc-900">What Happens Next</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Order confirmation has been sent to your email</li>
            <li>Shipping updates and tracking details will follow</li>
            <li>Support is available if you need to update details</li>
          </ul>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Link href={`/track?order=${encodeURIComponent(order)}`} className="btn-primary rounded-md px-4 py-2.5 text-center text-sm font-semibold">
            Track Order
          </Link>
          <Link href="/orders" className="btn-outline rounded-md px-4 py-2.5 text-center text-sm">
            View Orders
          </Link>
          <Link href="/products" className="btn-outline rounded-md px-4 py-2.5 text-center text-sm">
            Continue Shopping
          </Link>
        </div>
      </section>
    </div>
  );
}
