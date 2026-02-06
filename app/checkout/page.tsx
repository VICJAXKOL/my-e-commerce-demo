import React from "react";
import CartClient from "../../components/CartClient";

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="mb-2 text-2xl font-semibold">Checkout</h1>
      <p className="mb-6 text-sm text-zinc-600">Review your items and place a mock order.</p>
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <CartClient />
      </div>
      <div className="mt-6">
        <button className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700">Place Order (demo)</button>
      </div>
    </div>
  );
}
