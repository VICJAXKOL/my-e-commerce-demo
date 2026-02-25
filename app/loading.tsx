export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-48 rounded bg-zinc-200" />
        <div className="h-28 rounded-xl bg-zinc-200" />
        <div className="h-28 rounded-xl bg-zinc-200" />
      </div>
    </div>
  );
}
