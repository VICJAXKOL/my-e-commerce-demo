export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-5 w-64 rounded bg-zinc-200" />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="h-[26rem] rounded-2xl bg-zinc-200" />
          <div className="h-[26rem] rounded-2xl bg-zinc-200" />
        </div>
      </div>
    </div>
  );
}
