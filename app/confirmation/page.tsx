import Link from "next/link";

export default function OrderConfirmationPage() {
  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow-sm">
      <div className="text-center">
        <div className="text-5xl">✓</div>
        <h1 className="mt-4 text-2xl font-semibold">Order Confirmed!</h1>
        <p className="mt-2 text-zinc-600">Thank you for your purchase. Your order has been received.</p>
      </div>

      <div className="mt-8 space-y-4 border-t border-b py-6 text-sm">
        <div className="flex justify-between">
          <span>Order Number:</span>
          <span className="font-semibold">#ORD-2026-001234</span>
        </div>
        <div className="flex justify-between">
          <span>Order Date:</span>
          <span className="font-semibold">Feb 6, 2026</span>
        </div>
        <div className="flex justify-between">
          <span>Estimated Delivery:</span>
          <span className="font-semibold">Feb 9 - 11, 2026</span>
        </div>
        <div className="flex justify-between">
          <span>Total:</span>
          <span className="font-semibold">$149.97</span>
        </div>
      </div>

      <div className="mt-6 space-y-3 text-sm">
        <h2 className="font-semibold">What&apos;s Next?</h2>
        <ul className="ml-4 space-y-1 list-disc text-zinc-600">
          <li>A confirmation email has been sent to your inbox</li>
          <li>You&apos;ll receive a tracking number via email shortly</li>
          <li>Track your order status anytime from your account</li>
        </ul>
      </div>

      <div className="mt-6 flex gap-3">
        <Link href="/products" className="flex-1 rounded bg-black px-4 py-2 text-center text-white">
          Continue Shopping
        </Link>
        <Link href="/cart" className="flex-1 rounded border px-4 py-2 text-center">
          Back to Cart
        </Link>
      </div>
    </div>
  );
}
