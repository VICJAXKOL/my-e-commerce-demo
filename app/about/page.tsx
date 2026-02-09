import { Suspense } from "react";

export default function AboutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="mx-auto max-w-5xl rounded-lg bg-white p-6 shadow-sm pt-20">
        <h1 className="text-2xl font-semibold">About MyShop</h1>
        <p className="mt-4 text-zinc-600">
          At MyShop, we pride ourselves on offering a wide variety of high-quality
          products to meet all your needs. From the latest trends to timeless
          classics, we carefully curate our collection to ensure there is
          something for everyone.
        </p>
        <p className="mt-4 text-zinc-600">
          Our commitment to quality is unwavering. Every product in our store is
          handpicked and thoroughly tested to ensure it meets the highest
          standards. We believe in providing our customers with only the best.
        </p>
        <p className="mt-4 text-zinc-600">
          At MyShop, customer satisfaction is our top priority. We offer
          exceptional customer service, fast and reliable shipping, and a
          hassle-free return policy to make your shopping experience as smooth
          and enjoyable as possible.
        </p>
        <div className="mt-6 space-y-2 text-sm text-zinc-600">
          <p>
            <strong>Why Choose Us?</strong>
          </p>
          <ul className="ml-4 list-disc">
            <li>Extensive product variety to suit every taste and need</li>
            <li>Uncompromising quality assurance</li>
            <li>Dedicated customer support team</li>
            <li>Fast and reliable shipping</li>
            <li>Easy and hassle-free returns</li>
          </ul>
        </div>
      </div>
    </Suspense>
  );
}
