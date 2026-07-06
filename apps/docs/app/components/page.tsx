import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { ComponentSearch } from "@/components/component-search";
import {
  components,
  CATEGORIES,
  categoryLabelsZh,
  categoryLabelsEn,
} from "@/content/components.meta";
import { getServerLocale } from "@/lib/i18n/get-server-locale";
import { dict } from "@/lib/i18n/dict";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const isEn = locale === "en";
  return {
    title: isEn
      ? "Components Overview · Chaos UI"
      : "组件总览 · Components · Chaos UI",
    description: isEn
      ? "Chaos UI components overview — searchable catalog of all 8 categories: General / Layout / Navigation / Form / DataDisplay / Feedback / Business / System Layout."
      : "Chaos UI 组件总览页 — 可搜索的 8 大分区组件目录:General / Layout / Navigation / Form / DataDisplay / Feedback / Business / System Layout。",
  };
}

/**
 * /components — searchable overview of all shipped Chaos UI components.
 * Server Component. Renders a Hero header plus the `<ComponentSearch>` client island.
 */
export default async function ComponentsOverviewPage() {
  const locale = await getServerLocale();
  const isEn = locale === "en";
  const d = dict[locale];
  const total = components.length;
  const perCat = CATEGORIES.map((c) => ({
    category: c,
    labelZh: categoryLabelsZh[c],
    labelEn: categoryLabelsEn[c],
    count: components.filter((comp) => comp.category === c).length,
  }));

  return (
    <div className="flex flex-col">
      {/* ============================================================== */}
      {/*  Hero                                                          */}
      {/* ============================================================== */}
      <section className="border-border/40 relative overflow-hidden border-b">
        <div className="absolute inset-0 -z-10">
          <div className="from-brand-100/30 via-background to-background dark:from-brand-950/20 dark:via-background dark:to-background absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]" />
        </div>
        <div className="mx-auto max-w-6xl px-4 pt-12 pb-10 sm:px-6 sm:pt-16">
          <Badge variant="secondary" className="mb-4 gap-1.5">
            <span aria-hidden>·</span>
            Component Catalog
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            {d.components.pageTitle}
            <span className="text-muted-foreground ml-3 align-middle text-lg font-medium sm:text-xl">
              Components · {total}
            </span>
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-relaxed text-balance sm:text-lg">
            {d.components.pageDesc}
          </p>

          {/* 8-category quick stats */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {perCat.map((c) => (
              <a
                key={c.category}
                href={`#${c.category.replace(/\s+/g, "-").toLowerCase()}`}
                className="group border-border/60 bg-card/50 hover:border-brand-500/40 hover:bg-card rounded-lg border p-3 text-center transition-colors"
              >
                <div className="text-foreground group-hover:text-brand-600 dark:group-hover:text-brand-400 text-xl font-bold">
                  {c.count}
                </div>
                <div className="text-muted-foreground mt-0.5 text-xs">
                  {isEn ? c.labelEn : c.labelZh}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/*  Search island + sections                                      */}
      {/* ============================================================== */}
      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <ComponentSearch components={components} />
      </section>
    </div>
  );
}
