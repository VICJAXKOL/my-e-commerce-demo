import CartClient from "../../components/CartClient";
import React, { Suspense } from "react";

export default function CartPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="mx-auto max-w-5xl rounded-lg bg-white p-6 shadow-sm pt-20">
        <h1 className="text-2xl font-semibold">Your Cart</h1>
        <div className="mt-4">
          <CartClient />
        </div>
      </div>
    </Suspense>
  );
}
