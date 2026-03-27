export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-20 sm:px-6">
      <section className="surface-card animate-pulse overflow-hidden p-6 sm:p-8">
        <div className="h-4 w-28 rounded-full bg-[var(--surface-3)]" />
        <div className="mt-4 h-10 max-w-xl rounded-2xl bg-[var(--surface-3)]" />
        <div className="mt-4 h-4 max-w-2xl rounded-full bg-[var(--surface-3)]" />
        <div className="mt-2 h-4 max-w-xl rounded-full bg-[var(--surface-3)]" />
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="surface-card h-32 animate-pulse bg-[var(--surface-1)]" />
        <div className="surface-card h-32 animate-pulse bg-[var(--surface-1)]" />
        <div className="surface-card h-32 animate-pulse bg-[var(--surface-1)]" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <div className="surface-card h-80 animate-pulse bg-[var(--surface-1)]" />
        <div className="surface-card h-80 animate-pulse bg-[var(--surface-1)]" />
        <div className="surface-card h-80 animate-pulse bg-[var(--surface-1)]" />
        <div className="surface-card h-80 animate-pulse bg-[var(--surface-1)]" />
      </div>
    </div>
  );
}
