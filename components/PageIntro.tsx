import { ReactNode } from "react";

type Highlight = {
  title: string;
  text: string;
};

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  highlights?: Highlight[];
  actions?: ReactNode;
};

export default function PageIntro({ eyebrow, title, description, highlights = [], actions }: PageIntroProps) {
  return (
    <section className="surface-card overflow-hidden p-6 sm:p-8">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-600)]">{eyebrow}</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">{title}</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base">{description}</p>
          {actions ? <div className="mt-6 flex flex-wrap gap-3">{actions}</div> : null}
        </div>

        {highlights.length > 0 ? (
          <div className={`grid gap-3 ${highlights.length === 3 ? "sm:grid-cols-3 lg:grid-cols-1" : "sm:grid-cols-2"}`}>
            {highlights.map((highlight) => (
              <article key={highlight.title} className="surface-soft p-4">
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">{highlight.title}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{highlight.text}</p>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
