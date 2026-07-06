"use client";

import { useId, useMemo, useState } from "react";

import {
  CATEGORIES,
  categoryLabelsZh,
  categoryLabelsEn,
} from "@/content/components.meta";
import type { Category, ComponentMeta } from "@/content/components.meta";
import { sectionIdForCategory } from "@/components/component-card";
import { ComponentCard } from "@/components/component-card";
import { useLocale } from "@/components/locale-provider";
import { useDict } from "@/hooks/use-dict";

interface ComponentSearchProps {
  components: ComponentMeta[];
}

export function ComponentSearch({ components }: ComponentSearchProps) {
  const { locale } = useLocale();
  const dict = useDict();
  const isEn = locale === "en";
  const [query, setQuery] = useState("");
  const inputId = useId().replace(/[:]/g, "");

  const normalized = query.trim().toLowerCase();

  // Per-category filtered list.
  const grouped = useMemo(() => {
    const map = new Map<Category, ComponentMeta[]>();
    for (const c of CATEGORIES) map.set(c, []);
    for (const comp of components) {
      if (!normalized) {
        map.get(comp.category)!.push(comp);
        continue;
      }
      const hay = [
        comp.name,
        comp.nameZh,
        comp.desc,
        comp.descZh,
        ...((comp as ComponentMeta & { tags?: string[] }).tags ?? []),
      ]
        .join(" ")
        .toLowerCase();
      if (hay.includes(normalized)) {
        map.get(comp.category)!.push(comp);
      }
    }
    return map;
  }, [components, normalized]);

  const totalCount = useMemo(
    () =>
      Array.from(grouped.values()).reduce((sum, list) => sum + list.length, 0),
    [grouped],
  );

  // Whether a tab has matches → used for tab highlight state.
  const tabState = (cat: Category): { count: number; hasMatches: boolean } => {
    const list = grouped.get(cat) ?? [];
    return {
      count: list.length,
      hasMatches: normalized ? list.length > 0 : true,
    };
  };

  return (
    <div className="flex flex-col gap-6">
      {/* ---------------- Search input ---------------- */}
      <div className="mx-auto w-full max-w-2xl">
        <label htmlFor={inputId} className="sr-only">
          {dict.components.searchLabel}
        </label>
        <div className="relative">
          <span
            aria-hidden
            className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
          >
            {/* inline search glyph (no extra deps) */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </span>
          <input
            id={inputId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={dict.components.searchPlaceholder}
            aria-label={dict.components.searchLabel}
            className="border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:border-brand-500 focus-visible:ring-brand-500/30 dark:border-input dark:bg-input/30 h-11 w-full rounded-lg border pr-3 pl-9 text-sm shadow-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
          />
        </div>
        <p className="text-muted-foreground mt-2 text-center text-xs">
          {totalCount === 0
            ? `${dict.components.noMatchTitle} · ${components.length} total`
            : isEn
              ? `${totalCount} ${dict.components.resultHitEn} ${components.length}`
              : `${dict.components.resultHit} ${totalCount} / ${components.length} ${dict.components.sectionCount}`}
        </p>
      </div>

      {/* ---------------- Category tabs ---------------- */}
      <nav
        aria-label="Components by category"
        className="border-border/40 bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-14 z-30 -mx-4 flex flex-wrap items-center justify-center gap-1.5 border-b px-4 py-2 backdrop-blur sm:mx-0 sm:rounded-lg"
      >
        {CATEGORIES.map((cat) => {
          const { count, hasMatches } = tabState(cat);
          const isActive = !normalized || hasMatches;
          const label = isEn ? categoryLabelsEn[cat] : categoryLabelsZh[cat];
          return (
            <a
              key={cat}
              href={`#${sectionIdForCategory(cat)}`}
              className={
                "inline-flex items-center gap-1 rounded-md px-3 py-1 text-xs font-medium transition-colors " +
                (isActive
                  ? "bg-brand-500/10 text-brand-700 hover:bg-brand-500/20 dark:text-brand-300"
                  : "text-muted-foreground/60 hover:text-muted-foreground")
              }
            >
              {label}
              <span
                className={
                  "ml-1 rounded-full px-1.5 py-0.5 text-[10px] " +
                  (isActive
                    ? "bg-brand-500/15 text-brand-700 dark:text-brand-300"
                    : "bg-muted text-muted-foreground")
                }
              >
                {count}
              </span>
            </a>
          );
        })}
      </nav>

      {/* ---------------- Sections ---------------- */}
      {totalCount === 0 ? (
        <div className="mx-auto max-w-2xl py-20 text-center">
          <p className="text-foreground text-base font-medium">
            {dict.components.noMatchTitle}
          </p>
          <p className="text-muted-foreground mt-1 text-sm">
            {dict.components.noMatchTitleEn}
          </p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="border-border text-foreground hover:bg-muted mt-4 rounded-md border px-3 py-1 text-xs transition-colors"
          >
            {dict.components.clearSearch}
          </button>
        </div>
      ) : (
        CATEGORIES.map((cat) => {
          const list = grouped.get(cat) ?? [];
          if (list.length === 0) return null;
          const label = isEn ? categoryLabelsEn[cat] : categoryLabelsZh[cat];
          return (
            <section
              key={cat}
              id={sectionIdForCategory(cat)}
              className="scroll-mt-28"
            >
              <header className="border-border/40 mb-3 flex items-baseline gap-2 border-b pb-2">
                <h2 className="text-foreground text-lg font-semibold tracking-tight">
                  {label}
                </h2>
                <span className="text-muted-foreground text-xs">
                  ({list.length})
                </span>
              </header>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                {list.map((comp) => (
                  <ComponentCard
                    key={`${comp.category}-${comp.slug}`}
                    component={comp}
                  />
                ))}
              </div>
            </section>
          );
        })
      )}
    </div>
  );
}
