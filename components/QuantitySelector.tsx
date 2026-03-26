"use client";

import React from "react";

export function QuantitySelector({
  quantity,
  onQuantityChange,
}: {
  quantity: number;
  onQuantityChange: (qty: number) => void;
}) {
  const quantityInputId = React.useId();

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
        className="focus-ring flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-1)] text-lg font-semibold text-zinc-700 shadow-[var(--shadow-soft)] hover:bg-[var(--surface-2)] dark:text-white"
      >
        -
      </button>
      <input
        id={quantityInputId}
        name="quantity"
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => onQuantityChange(Math.max(1, parseInt(e.target.value) || 1))}
        className="input-control focus-ring h-11 w-16 px-2 text-center text-sm font-semibold shadow-none"
      />
      <button
        type="button"
        onClick={() => onQuantityChange(quantity + 1)}
        className="focus-ring flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-1)] text-lg font-semibold text-zinc-700 shadow-[var(--shadow-soft)] hover:bg-[var(--surface-2)] dark:text-white"
      >
        +
      </button>
    </div>
  );
}
