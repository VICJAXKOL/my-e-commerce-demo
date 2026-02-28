# Paystack Setup (Checkout MVP)

## 1) Environment Variable

Create `.env.local` in the project root:

```bash
PAYSTACK_SECRET_KEY=sk_test_your_key_here
```

## 2) Run the app

```bash
npm install
npm run dev
```

## 3) Test flow

1. Add products to cart.
2. Go to `/checkout`.
3. Enter a valid email in contact info.
4. Click `Continue to Secure Payment`.
5. Complete payment on Paystack-hosted page.
6. You return to `/confirmation` with payment reference details.

## Notes

- The transaction is initialized by `POST /api/checkout/session`.
- If `PAYSTACK_SECRET_KEY` is missing, checkout returns a setup error message.
