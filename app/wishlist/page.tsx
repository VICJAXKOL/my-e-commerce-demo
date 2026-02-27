import WishlistClient from "../../components/WishlistClient";

export default function WishlistPage() {
  return (
    <div className="mx-auto max-w-5xl pt-20">
      <section className="mb-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-8 text-white shadow-lg">
        <p className="text-xs uppercase tracking-widest text-sky-300">Saved For Later</p>
        <h1 className="mt-2 text-3xl font-semibold">Your Wishlist</h1>
        <p className="mt-2 text-sm text-slate-300">
          Keep track of products you like and move them to cart when you are ready.
        </p>
      </section>

      <WishlistClient />
    </div>
  );
}

