"use client";

import React from "react";

export function QuantitySelector({
  quantity,
  onQuantityChange,
}: {
  quantity: number;
  onQuantityChange: (qty: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
        className="rounded border px-3 py-1"
      >
        −
      </button>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => onQuantityChange(Math.max(1, parseInt(e.target.value) || 1))}
        className="w-12 rounded border px-2 py-1 text-center"
      />
      <button
        onClick={() => onQuantityChange(quantity + 1)}
        className="rounded border px-3 py-1"
      >
        +
      </button>
    </div>
  );
}
