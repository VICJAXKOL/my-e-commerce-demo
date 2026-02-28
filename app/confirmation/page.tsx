import Link from "next/link";
import ClearCartOnLoad from "../../components/ClearCartOnLoad";
import SaveOrderOnLoad from "../../components/SaveOrderOnLoad";
import { formatNgn } from "../../lib/currency";
import { verifyPaystackTransaction } from "../../lib/paystack";

type Props = {
  searchParams:
    | {
        order?: string;
        total?: string;
        eta?: string;
        reference?: string;
        trxref?: string;
      }
    | Promise<{
        order?: string;
        total?: string;
        eta?: string;
        reference?: string;
        trxref?: string;
      }>;
};

export default async function OrderConfirmationPage({ searchParams }: Props) {
  const resolved = await Promise.resolve(searchParams);
  const reference = resolved.reference ?? resolved.trxref;
  const payment = reference ? await verifyPaystackTransaction(reference) : null;
  const isPaid = payment?.transactionStatus === "success";

  const order =
    resolved.order ??
    (payment?.reference ? `PAY-${payment.reference.slice(-8).toUpperCase()}` : "ORD-000000");
  const totalValue =
    payment?.amountTotal != null ? payment.amountTotal / 100 : Number(resolved.total ?? "0");
  const eta =
    payment?.shippingMethod === "express"
      ? "2-3"
      : payment?.shippingMethod === "standard"
        ? "3-5"
        : (resolved.eta ?? "3-5");
  const orderItems =
    payment?.cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.unitAmount / 100,
    })) ?? [];

  const now = new Date();
  const orderDate = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const formattedTotal = formatNgn(totalValue);

  return (
    <div className="mx-auto max-w-3xl pt-20">
      <SaveOrderOnLoad enabled={isPaid} orderNumber={order} total={totalValue} etaDays={eta} items={orderItems} />
      <ClearCartOnLoad enabled={isPaid} />
      <section className="rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-700 p-8 text-white shadow-lg">
        <p className="text-xs uppercase tracking-widest text-emerald-100">Order Complete</p>
        <h1 className="mt-2 text-3xl font-semibold">Order Confirmed</h1>
        <p className="mt-2 text-sm text-emerald-50">
          Thank you for your purchase. A confirmation email has been sent with your order details.
        </p>
        {payment?.reference ? (
          <p className="mt-2 text-xs text-emerald-100">Paystack reference: {payment.reference}</p>
        ) : null}
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
            <p className="font-semibold text-zinc-900">{formattedTotal}</p>
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
