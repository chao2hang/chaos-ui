"use client";

import { useId, useMemo, useState } from "react";

import {
  ComponentCard,
  sectionIdForCategory,
} from "@/components/component-card";
import { useComponentSearch } from "@/components/use-component-search";
import { useLocale } from "@/components/locale-provider";
import type { Category, ComponentMeta } from "@/content/components.meta";
import {
  CATEGORIES,
  categoryLabelsEn,
  categoryLabelsZh,
} from "@/content/components.meta";
import { useDict } from "@/hooks/use-dict";
import {
  BUSINESS_SUB_CATEGORIES,
  businessSubLabelsEn,
  businessSubLabelsZh,
  groupByBusinessSub,
} from "@/lib/business-subcategories";

interface ComponentSearchProps {
  components: ComponentMeta[];
}

export function ComponentSearch({ components }: ComponentSearchProps) {
  const { locale } = useLocale();
  const dict = useDict();
  const isEn = locale === "en";
  const [query, setQuery] = useState("");
  const inputId = useId().replace(/[:]/g, "");

  // 折叠状态：key = category 或 "category::subCategory"
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const { grouped, totalCount } = useComponentSearch(components, query);

  // ---------- helpers ----------

  const toggleCollapse = (key: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const collapseAll = () => {
    const keys: string[] = [];
    for (const cat of CATEGORIES) {
      keys.push(cat);
      if (cat === "Business") {
        for (const sc of BUSINESS_SUB_CATEGORIES) {
          keys.push(`Business::${sc}`);
        }
      }
    }
    setCollapsed(new Set(keys));
  };

  const expandAll = () => {
    setCollapsed(new Set());
  };

  const isCollapsed = (key: string) => collapsed.has(key);

  const tabState = (cat: Category): { count: number; hasMatches: boolean } => {
    const list = grouped.get(cat) ?? [];
    return {
      count: list.length,
      hasMatches: normalized(query) ? list.length > 0 : true,
    };
  };

  // ---------- render ----------

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
            className="border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:border-brand-500 focus-visible:ring-brand-500/30 dark:border-input dark:bg-muted/50 dark:text-foreground dark:placeholder:text-muted-foreground h-11 w-full rounded-lg border pr-3 pl-9 text-sm shadow-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
          />
          {/* Cmd+K hint */}
          <kbd className="text-muted-foreground/60 bg-muted/60 pointer-events-none absolute top-1/2 right-3 hidden -translate-y-1/2 rounded border px-1.5 py-0.5 font-mono text-[10px] sm:inline-block">
            ⌘K
          </kbd>
        </div>
        <p className="text-muted-foreground dark:text-muted-foreground/90 mt-2 text-center text-xs">
          {totalCount === 0
            ? `${dict.components.noMatchTitle} · ${components.length} total`
            : isEn
              ? `${totalCount} ${dict.components.resultHitEn} ${components.length}`
              : `${dict.components.resultHit} ${totalCount} / ${components.length} ${dict.components.sectionCount}`}
        </p>
      </div>

      {/* ---------------- Category tabs + collapse controls ---------------- */}
      <nav
        aria-label="Components by category"
        className="border-border bg-card/95 supports-[backdrop-filter]:bg-card/80 sticky top-14 z-30 flex flex-wrap items-center justify-between gap-1.5 rounded-lg border px-2 py-2 shadow-sm backdrop-blur"
      >
        <div className="flex flex-wrap items-center gap-1.5">
          {CATEGORIES.map((cat) => {
            const { count, hasMatches } = tabState(cat);
            const isActive = !normalized(query) || hasMatches;
            const label = isEn ? categoryLabelsEn[cat] : categoryLabelsZh[cat];
            return (
              <a
                key={cat}
                href={`#${sectionIdForCategory(cat)}`}
                className={
                  "inline-flex items-center gap-1 rounded-md px-3 py-1 text-xs font-medium transition-colors " +
                  (isActive
                    ? "bg-brand-500/15 text-brand-700 dark:bg-brand-500/25 dark:text-brand-200"
                    : "text-foreground/80 hover:text-foreground dark:text-foreground/70 dark:hover:text-foreground")
                }
              >
                {label}
                <span
                  className={
                    "ml-1 rounded-full px-1.5 py-0.5 text-[10px] " +
                    (isActive
                      ? "bg-brand-500/25 text-brand-800 dark:bg-brand-500/35 dark:text-brand-100"
                      : "bg-muted text-muted-foreground dark:bg-muted/80")
                  }
                >
                  {count}
                </span>
              </a>
            );
          })}
        </div>
        {/* Collapse/Expand all */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={collapseAll}
            className="border-border/40 text-foreground/80 hover:border-brand-500/40 hover:bg-muted/60 hover:text-foreground rounded-md border px-2 py-0.5 text-[11px] transition-colors"
          >
            {dict.sidebar.collapseAll}
          </button>
          <button
            type="button"
            onClick={expandAll}
            className="border-border/40 text-foreground/80 hover:border-brand-500/40 hover:bg-muted/60 hover:text-foreground rounded-md border px-2 py-0.5 text-[11px] transition-colors"
          >
            {dict.sidebar.expandAll}
          </button>
        </div>
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
          const catCollapsed = isCollapsed(cat);

          if (cat === "Business") {
            return renderBusinessSection(
              cat,
              label,
              list,
              catCollapsed,
              collapsed,
              toggleCollapse,
              isEn,
              dict,
            );
          }

          return (
            <section
              key={cat}
              id={sectionIdForCategory(cat)}
              className="scroll-mt-28"
            >
              <header
                className="border-border/40 group mb-3 flex cursor-pointer items-baseline gap-2 border-b pb-2 select-none"
                onClick={() => toggleCollapse(cat)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") toggleCollapse(cat);
                }}
                aria-expanded={!catCollapsed}
              >
                <span className="text-muted-foreground group-hover:text-foreground text-xs transition-transform">
                  {catCollapsed ? "▸" : "▾"}
                </span>
                <h2 className="text-foreground text-lg font-semibold tracking-tight">
                  {label}
                </h2>
                <span className="text-muted-foreground text-xs">
                  ({list.length})
                </span>
              </header>
              {!catCollapsed && (
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                  {list.map((comp) => (
                    <ComponentCard
                      key={`${comp.category}-${comp.slug}`}
                      component={comp}
                    />
                  ))}
                </div>
              )}
            </section>
          );
        })
      )}
    </div>
  );
}

/**
 * Business 分类单独渲染：拆分子分组，支持独立折叠。
 */
function renderBusinessSection(
  cat: Category,
  label: string,
  list: ComponentMeta[],
  catCollapsed: boolean,
  collapsed: Set<string>,
  toggleCollapse: (key: string) => void,
  isEn: boolean,
  dict: ReturnType<typeof import("@/hooks/use-dict").useDict>,
) {
  const subGroups = groupByBusinessSub(list);

  const hasAnyContent = BUSINESS_SUB_CATEGORIES.some(
    (sc) => (subGroups.get(sc)?.length ?? 0) > 0,
  );

  return (
    <section key={cat} id={sectionIdForCategory(cat)} className="scroll-mt-28">
      {/* Category header */}
      <header
        className="border-border/40 group mb-3 flex cursor-pointer items-baseline gap-2 border-b pb-2 select-none"
        onClick={() => toggleCollapse(cat)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") toggleCollapse(cat);
        }}
        aria-expanded={!catCollapsed}
      >
        <span className="text-muted-foreground group-hover:text-foreground text-xs transition-transform">
          {catCollapsed ? "▸" : "▾"}
        </span>
        <h2 className="text-foreground text-lg font-semibold tracking-tight">
          {label}
        </h2>
        <span className="text-muted-foreground text-xs">({list.length})</span>
        <span className="text-muted-foreground/60 ml-auto text-[10px]">
          {catCollapsed ? dict.businessSub.expand : dict.businessSub.collapse}
        </span>
      </header>

      {!catCollapsed && hasAnyContent && (
        <div className="flex flex-col gap-6">
          {BUSINESS_SUB_CATEGORIES.map((sc) => {
            const items = subGroups.get(sc) ?? [];
            if (items.length === 0) return null;
            const scKey = `Business::${sc}`;
            const scCollapsed = collapsed.has(scKey);
            const scLabel = isEn
              ? businessSubLabelsEn[sc]
              : businessSubLabelsZh[sc];

            return (
              <div key={scKey} id={`sub-${scKey.replace("::", "-")}`}>
                {/* Sub-category header */}
                <header
                  className="group mb-2 flex cursor-pointer items-baseline gap-2 select-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCollapse(scKey);
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.stopPropagation();
                      toggleCollapse(scKey);
                    }
                  }}
                  aria-expanded={!scCollapsed}
                >
                  <span className="text-muted-foreground group-hover:text-foreground text-[11px] transition-transform">
                    {scCollapsed ? "▸" : "▾"}
                  </span>
                  <h3 className="text-muted-foreground text-sm font-medium">
                    {scLabel}
                  </h3>
                  <span className="text-muted-foreground/60 text-[10px]">
                    ({items.length})
                  </span>
                </header>
                {!scCollapsed && (
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                    {items.map((comp) => (
                      <ComponentCard
                        key={`${comp.category}-${comp.slug}`}
                        component={comp}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

function normalized(q: string) {
  return q.trim().toLowerCase();
}
