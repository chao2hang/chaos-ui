import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { ComponentSearch } from "@/components/component-search";
import { components, CATEGORIES, categoryLabelsZh, categoryLabelsEn } from "@/content/components.meta";

export const metadata: Metadata = {
  title: "组件总览 · Components · Chaos UI",
  description:
    "Chaos UI 组件总览页 — 可搜索的 8 大分区组件目录:General / Layout / Navigation / Form / DataDisplay / Feedback / Business / System Layout。",
};

/**
 * /components — searchable overview of all shipped Chaos UI components.
 * Server Component. Renders a Hero header plus the `<ComponentSearch>` client island.
 */
export default function ComponentsOverviewPage() {
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
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-100/30 via-background to-background dark:from-brand-950/20 dark:via-background dark:to-background" />
        </div>
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-12 sm:px-6 sm:pt-16">
          <Badge variant="secondary" className="mb-4 gap-1.5">
            <span aria-hidden>·</span>
            Component Catalog
          </Badge>
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            组件总览
            <span className="ml-3 align-middle text-lg font-medium text-muted-foreground sm:text-xl">
              Components · {total}
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
            按分区浏览全部组件,支持按 name / 中文名 / 描述 搜索。各分区点击锚滚定位,
            详情页 MDX 正在陆续上线(批次1覆盖 30 个高频组件),其余暂可前往 Storybook 查看。
          </p>

          {/* 8-category quick stats */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {perCat.map((c) => (
              <a
                key={c.category}
                href={`#${c.category.replace(/\s+/g, "-").toLowerCase()}`}
                className="group rounded-lg border border-border/60 bg-card/50 p-3 text-center transition-colors hover:border-brand-500/40 hover:bg-card"
              >
                <div className="text-xl font-bold text-foreground group-hover:text-brand-600 dark:group-hover:text-brand-400">
                  {c.count}
                </div>
                <div className="mt-0.5 text-xs text-muted-foreground">
                  {c.labelZh}
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
