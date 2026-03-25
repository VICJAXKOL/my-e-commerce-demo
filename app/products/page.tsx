import { SearchAndFilter } from "../../components/SearchAndFilter";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getStringParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const initialQuery = getStringParam(resolvedSearchParams.q) ?? "";
  const initialCategory = getStringParam(resolvedSearchParams.category) ?? "";
  const initialBadge = getStringParam(resolvedSearchParams.badge) ?? "";

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <section className="surface-card overflow-hidden p-6 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-600)]">Product discovery</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              Browse the full collection with better filtering and faster decisions
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base">
              Search by product name, explore curated categories, filter by badge, and compare items with less noise.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <article className="surface-soft p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Find faster</p>
              <p className="mt-2 text-sm leading-6 text-zinc-700 dark:text-slate-200">Use typo-tolerant search and quick category shortcuts.</p>
            </article>
            <article className="surface-soft p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Compare easier</p>
              <p className="mt-2 text-sm leading-6 text-zinc-700 dark:text-slate-200">Scan cards designed to show price, stock, and action clearly.</p>
            </article>
            <article className="surface-soft p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Shop smarter</p>
              <p className="mt-2 text-sm leading-6 text-zinc-700 dark:text-slate-200">Jump directly into sale and popular products with deep links.</p>
            </article>
          </div>
        </div>
      </section>

      <SearchAndFilter initialQuery={initialQuery} initialCategory={initialCategory} initialBadge={initialBadge} />
    </div>
  );
}
