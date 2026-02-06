export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl rounded-lg bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold">About MyShop</h1>
      <p className="mt-4 text-zinc-600">
        This is a small demo e-commerce app built to demonstrate routing and client/server
        components in Next.js 16 with TypeScript and Tailwind CSS.
      </p>
      <div className="mt-6 space-y-2 text-sm text-zinc-600">
        <p><strong>Features:</strong></p>
        <ul className="ml-4 list-disc">
          <li>Dynamic product routing</li>
          <li>Shopping cart with persistence</li>
          <li>Multi-page navigation</li>
        </ul>
      </div>
    </div>
  );
}
