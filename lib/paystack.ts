export type PaystackTransactionSummary = {
  reference: string;
  amountTotal: number | null;
  currency: string | null;
  transactionStatus: string;
  shippingMethod: string | null;
  cartItems: Array<{
    id: string;
    name: string;
    quantity: number;
    unitAmount: number;
  }>;
};

type PaystackVerifyResponse = {
  status: boolean;
  message: string;
  data?: {
    status?: string;
    amount?: number;
    currency?: string;
    reference?: string;
    metadata?: {
      shipping_method?: string;
      cart_items?: Array<{
        id?: string;
        name?: string;
        quantity?: number | string;
        unit_amount?: number | string;
        unitAmount?: number | string;
      }>;
    };
  };
};

export async function verifyPaystackTransaction(
  reference: string
): Promise<PaystackTransactionSummary | null> {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey || !reference) return null;

  try {
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${secretKey}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) return null;
    const data = (await response.json()) as PaystackVerifyResponse;
    if (!data.status || !data.data?.reference) return null;
    const cartItems = (data.data.metadata?.cart_items ?? [])
      .map((item) => {
        const id = typeof item?.id === "string" ? item.id : "";
        const name = typeof item?.name === "string" ? item.name : "";
        const quantity = Number(item?.quantity ?? 0);
        const unitAmount = Number(item?.unit_amount ?? item?.unitAmount ?? 0);
        return { id, name, quantity, unitAmount };
      })
      .filter(
        (item) =>
          item.id.length > 0 &&
          item.name.length > 0 &&
          Number.isFinite(item.quantity) &&
          item.quantity > 0 &&
          Number.isFinite(item.unitAmount) &&
          item.unitAmount > 0
      );

    return {
      reference: data.data.reference,
      amountTotal: typeof data.data.amount === "number" ? data.data.amount : null,
      currency: data.data.currency ?? null,
      transactionStatus: data.data.status ?? "unknown",
      shippingMethod: data.data.metadata?.shipping_method ?? null,
      cartItems,
    };
  } catch {
    return null;
  }
}
