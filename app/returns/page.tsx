export default function ReturnsPage() {
  return (
    <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-semibold">Returns & Refunds</h1>
      
      <div className="mt-6 space-y-4 text-zinc-600">
        <div>
          <h2 className="font-semibold text-zinc-900">Return Policy</h2>
          <p>We accept returns within 30 days of purchase. Items must be in original, unused condition with all packaging and tags intact.</p>
        </div>

        <div>
          <h2 className="font-semibold text-zinc-900">How to Return</h2>
          <ol className="ml-4 list-decimal space-y-1">
            <li>Contact our support team with your order number</li>
            <li>Receive a prepaid return shipping label</li>
            <li>Pack your item securely and ship it back</li>
            <li>Once received and inspected, we process your refund</li>
          </ol>
        </div>

        <div>
          <h2 className="font-semibold text-zinc-900">Refund Timeline</h2>
          <p>Refunds are processed within 5-7 business days after we receive and inspect your return. The refund will be credited to your original payment method.</p>
        </div>

        <div>
          <h2 className="font-semibold text-zinc-900">Non-Returnable Items</h2>
          <ul className="ml-4 list-disc space-y-1">
            <li>Clearance or final sale items</li>
            <li>Items damaged due to customer misuse</li>
            <li>Custom or personalized orders</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 border-t pt-4">
        <p className="text-sm text-zinc-600">
          Have questions? <a href="/contact" className="font-semibold text-black underline">Contact us</a>
        </p>
      </div>
    </div>
  );
}
