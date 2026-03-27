export default function CartLoading() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 pt-20 sm:px-6">
      <section className="surface-card animate-pulse overflow-hidden p-6 sm:p-8">
        <div className="h-4 w-24 rounded-full bg-[var(--surface-3)]" />
        <div className="mt-4 h-10 max-w-sm rounded-2xl bg-[var(--surface-3)]" />
        <div className="mt-4 h-4 max-w-lg rounded-full bg-[var(--surface-3)]" />
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="surface-card h-40 animate-pulse bg-[var(--surface-1)]" />
          <div className="surface-card h-40 animate-pulse bg-[var(--surface-1)]" />
        </div>
        <div className="surface-card h-72 animate-pulse bg-[var(--surface-1)]" />
      </div>
    </div>
  );
}
