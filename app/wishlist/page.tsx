import WishlistClient from "../../components/WishlistClient";
import PageIntro from "../../components/PageIntro";

export default function WishlistPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 pt-20">
      <PageIntro
        eyebrow="Saved for later"
        title="Keep track of products you don’t want to lose"
        description="Your wishlist helps you compare favorites, revisit interesting items, and move them to cart when you’re ready."
        highlights={[
          { title: "Save and compare", text: "Keep products in one place instead of searching for them again later." },
          { title: "Move to cart quickly", text: "Bring saved items back into your shopping flow without extra clicks." },
          { title: "Stay organized", text: "Use your wishlist as a shortlist before making final decisions." },
        ]}
      />

      <WishlistClient />
    </div>
  );
}
