import Link from "next/link";
import ClearCartOnLoad from "../../components/ClearCartOnLoad";
import { formatNgn } from "../../lib/currency";
import { verifyPaystackTransaction } from "../../lib/paystack";
import { getOrderByReference, markOrderPaid } from "../../lib/server/commerce";

type Props = {
  searchParams?: Promise<{
    order?: string | string[];
    total?: string | string[];
    eta?: string | string[];
    reference?: string | string[];
    trxref?: string | string[];
    status?: string | string[];
    canceled?: string | string[];
  }>;
};

export default async function OrderConfirmationPage({ searchParams }: Props) {
  const resolved = (await searchParams) ?? {};
  const readParam = (value?: string | string[]) => (Array.isArray(value) ? value[0] : value);
  const reference = readParam(resolved.reference) ?? readParam(resolved.trxref);
  const status = readParam(resolved.status)?.toLowerCase() ?? "";
  const isSuccessStatus = status === "success" || status === "successful" || status === "paid";
  const wasCanceled =
    readParam(resolved.canceled) === "1" ||
    status === "cancelled" ||
    status === "canceled" ||
    status === "failed" ||
    status === "abandoned";
  const payment = reference ? await verifyPaystackTransaction(reference) : null;
  const paymentStatus = payment?.transactionStatus?.toLowerCase() ?? "";
  const isPaymentVerifiedAsPaid = paymentStatus === "success";

  if (reference && isPaymentVerifiedAsPaid) {
    await markOrderPaid(reference);
  }

  const dbOrder = reference ? await getOrderByReference(reference) : null;
  const isPaid = dbOrder?.status === "paid" || isPaymentVerifiedAsPaid || isSuccessStatus;
  const shouldClearCart = !wasCanceled && (Boolean(reference) || isSuccessStatus);

  const order =
    dbOrder?.orderNumber ??
    readParam(resolved.order) ??
    (payment?.reference ? `PAY-${payment.reference.slice(-8).toUpperCase()}` : "ORD-000000");
  const totalValue =
    dbOrder?.totalMinor != null
      ? dbOrder.totalMinor / 100
      : payment?.amountTotal != null
        ? payment.amountTotal / 100
        : Number(readParam(resolved.total) ?? "0");
  const eta =
    dbOrder?.shippingMethod === "express"
      ? "2-3"
      : dbOrder?.shippingMethod === "standard"
        ? "3-5"
        : payment?.shippingMethod === "express"
          ? "2-3"
          : payment?.shippingMethod === "standard"
            ? "3-5"
            : (readParam(resolved.eta) ?? "3-5");

  const orderDate = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const formattedTotal = formatNgn(totalValue);
  const statusTone = wasCanceled
    ? {
        eyebrow: "Order update",
        title: "Your payment was not completed",
        description: "We saved your order details, but payment did not go through. You can review the order and try again when you're ready.",
        badge: "bg-amber-500/15 text-amber-200 ring-1 ring-amber-300/30",
      }
    : {
        eyebrow: "Order complete",
        title: isPaid ? "Order confirmed" : "Order received",
        description: isPaid
          ? "Thank you for your purchase. Your confirmation and delivery details are on the way."
          : "We received your order details and are reconciling payment. Confirmation will follow shortly.",
        badge: "bg-emerald-500/15 text-emerald-100 ring-1 ring-emerald-300/30",
      };
  const nextSteps = wasCanceled
    ? [
        "Return to your cart to confirm items and delivery details.",
        "Retry checkout when you're ready to complete payment.",
        "Contact support if you were charged but the order stayed pending.",
      ]
    : [
        "Order confirmation has been sent to your email.",
        "Shipping updates and tracking details will follow.",
        "Support is available if you need to update delivery details.",
      ];

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 pb-10 pt-20 sm:px-6">
      <ClearCartOnLoad enabled={shouldClearCart || isPaid} />

      <section className="surface-card overflow-hidden p-6 sm:p-8">
        <div className="rounded-[1.5rem] bg-[linear-gradient(135deg,var(--surface-invert),color-mix(in_srgb,var(--surface-invert)_72%,var(--brand-700)))] p-6 text-white shadow-[var(--shadow-card-hover)] sm:p-8">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
            <div className="min-w-0">
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${statusTone.badge}`}>
                {statusTone.eyebrow}
              </span>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{statusTone.title}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">{statusTone.description}</p>
              {payment?.reference ? <p className="mt-4 text-xs text-slate-300">Paystack reference: {payment.reference}</p> : null}
            </div>

            <div className="w-full rounded-[1.25rem] bg-white/5 p-4 ring-1 ring-white/10 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">Order summary</p>
              <p className="mt-3 text-2xl font-semibold">{formattedTotal}</p>
              <p className="mt-1 text-sm text-slate-300">Estimated delivery in {eta} business days</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="surface-card p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-600)]">Purchase details</p>
          <div className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
            <div className="surface-soft p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Order number</p>
              <p className="mt-2 text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">{order}</p>
            </div>
            <div className="surface-soft p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Order date</p>
              <p className="mt-2 text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">{orderDate}</p>
            </div>
            <div className="surface-soft p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Estimated delivery</p>
              <p className="mt-2 text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">{eta} business days</p>
            </div>
            <div className="surface-soft p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{wasCanceled ? "Order value" : "Total paid"}</p>
              <p className="mt-2 text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">{formattedTotal}</p>
            </div>
          </div>
        </div>

        <section className="surface-card p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-600)]">What happens next</p>
          <div className="mt-5 space-y-3">
            {nextSteps.map((step) => (
              <div key={step} className="surface-soft flex gap-3 p-4 text-sm leading-6 text-zinc-700 dark:text-slate-200">
                <span className="mt-1 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--brand-500),var(--brand-600))] text-xs font-semibold text-white">
                  ✓
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <Link
              href={`/track?order=${encodeURIComponent(order)}`}
              className="btn-primary focus-ring px-4 py-3 text-center text-sm font-semibold"
            >
              Track Order
            </Link>
            <Link href="/orders" className="btn-outline focus-ring px-4 py-3 text-center text-sm font-semibold">
              View Orders
            </Link>
            <Link href="/products" className="btn-outline focus-ring px-4 py-3 text-center text-sm font-semibold">
              Continue Shopping
            </Link>
          </div>
        </section>
      </section>
    </div>
  );
}
