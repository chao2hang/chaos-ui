"use client";

import {
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
  Suspense,
  useTransition,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { ComponentCard } from "@/components/component-card";
import { ComponentListRow } from "@/components/component-list-row";
import { useComponentSearch } from "@/components/use-component-search";
import { useLocale } from "@/components/locale-provider";
import { useDict } from "@/hooks/use-dict";
import type { Category, ComponentMeta } from "@/content/components.meta";
import {
  CATEGORIES,
  categoryLabelsEn,
  categoryLabelsZh,
  categoryToPathSegment,
  resolveCategoryParam,
} from "@/content/components.meta";
import {
  BUSINESS_SUB_CATEGORIES,
  type BusinessSubCategory,
  businessSubLabelsEn,
  businessSubLabelsZh,
  getBusinessSubCategory,
  groupByBusinessSub,
} from "@/lib/business-subcategories";
import {
  getFavoriteComponents,
  getRecentComponents,
  toggleFavoriteComponent,
} from "@/lib/component-recents";

type ViewMode = "list" | "grid";
type QuickFilter = "all" | "fav" | "recent" | "new";

const PAGE_SIZE = 60;

interface ComponentExplorerProps {
  components: ComponentMeta[];
}

function parseQuick(raw: string | null): QuickFilter {
  if (raw === "fav" || raw === "recent" || raw === "new") return raw;
  return "all";
}

function parseView(raw: string | null): ViewMode {
  return raw === "grid" ? "grid" : "list";
}

function parseSub(raw: string | null): BusinessSubCategory | "" {
  if (!raw) return "";
  return (BUSINESS_SUB_CATEGORIES as string[]).includes(raw)
    ? (raw as BusinessSubCategory)
    : "";
}

function ComponentExplorerInner({ components }: ComponentExplorerProps) {
  const { locale } = useLocale();
  const dict = useDict();
  const isEn = locale === "en";
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const view = parseView(searchParams.get("view"));
  const quick = parseQuick(searchParams.get("f"));
  const catFilter = resolveCategoryParam(searchParams.get("cat") ?? "") ?? "";
  const subFilter = parseSub(searchParams.get("sub"));
  const urlQ = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(urlQ);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const typingRef = useRef(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    if (!typingRef.current) setQuery(urlQ);
  }, [urlQ]);

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [urlQ, catFilter, subFilter, quick, view]);

  const replaceParams = useCallback(
    (patch: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [k, v] of Object.entries(patch)) {
        if (v == null || v === "") params.delete(k);
        else params.set(k, v);
      }
      const qs = params.toString();
      startTransition(() => {
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      });
    },
    [searchParams, router, pathname],
  );

  useEffect(() => {
    const t = window.setTimeout(() => {
      typingRef.current = false;
      const next = query.trim();
      if (next !== urlQ) replaceParams({ q: next || null });
    }, 180);
    return () => window.clearTimeout(t);
  }, [query, urlQ, replaceParams]);

  const [favorites, setFavorites] = useState<string[]>([]);
  const [recents, setRecents] = useState<string[]>([]);
  useEffect(() => {
    setFavorites(getFavoriteComponents());
    setRecents(getRecentComponents());
  }, []);

  const categoryCounts = useMemo(() => {
    const m = new Map<Category, number>();
    for (const c of CATEGORIES) m.set(c, 0);
    for (const comp of components) {
      m.set(comp.category, (m.get(comp.category) ?? 0) + 1);
    }
    return m;
  }, [components]);

  const businessSubCounts = useMemo(() => {
    const biz = components.filter((c) => c.category === "Business");
    return groupByBusinessSub(biz);
  }, [components]);

  const pool = useMemo(() => {
    let list = components;
    if (catFilter) list = list.filter((c) => c.category === catFilter);
    if (catFilter === "Business" && subFilter) {
      list = list.filter((c) => getBusinessSubCategory(c) === subFilter);
    }
    if (quick === "new") list = list.filter((c) => c.isNew);
    if (quick === "fav") {
      const set = new Set(favorites);
      list = list.filter((c) => set.has(c.slug));
    }
    if (quick === "recent") {
      const order = new Map(recents.map((s, i) => [s, i]));
      list = list
        .filter((c) => order.has(c.slug))
        .sort((a, b) => (order.get(a.slug) ?? 0) - (order.get(b.slug) ?? 0));
    }
    return list;
  }, [components, catFilter, subFilter, quick, favorites, recents]);

  const { results, totalCount, tokens } = useComponentSearch(pool, query);
  const searchActive = tokens.length > 0;

  // Flat stream: always one list (ranked when searching; category order otherwise)
  const stream = useMemo(() => {
    if (searchActive || quick === "recent") {
      return results.map((r) => r.comp);
    }
    // Stable category → name for browse mode
    return [...results.map((r) => r.comp)].sort((a, b) => {
      const ca = CATEGORIES.indexOf(a.category);
      const cb = CATEGORIES.indexOf(b.category);
      if (ca !== cb) return ca - cb;
      return a.name.localeCompare(b.name);
    });
  }, [results, searchActive, quick]);

  const scoreMap = useMemo(() => {
    if (!searchActive) return undefined;
    return new Map(results.map((r) => [r.comp.slug, r.score]));
  }, [results, searchActive]);

  const visible = stream.slice(0, visibleCount);
  const hasMore = stream.length > visibleCount;

  const onToggleFavorite = useCallback((slug: string) => {
    setFavorites(toggleFavoriteComponent(slug));
  }, []);

  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") return;
      if (
        e.key === "/" &&
        !(
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement
        )
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const setView = (v: ViewMode) =>
    replaceParams({ view: v === "list" ? null : v });
  const setQuick = (f: QuickFilter) =>
    replaceParams({ f: f === "all" ? null : f });
  const setCat = (cat: Category | "") => {
    replaceParams({
      cat: cat ? categoryToPathSegment(cat) : null,
      sub: null, // clear business sub when category changes
    });
  };
  const setSub = (sub: BusinessSubCategory | "") => {
    replaceParams({
      cat: "business",
      sub: sub || null,
    });
  };

  const activeCatLabel = catFilter
    ? isEn
      ? categoryLabelsEn[catFilter]
      : categoryLabelsZh[catFilter]
    : dict.components.allCategories;

  const activeSubLabel =
    subFilter &&
    (isEn ? businessSubLabelsEn[subFilter] : businessSubLabelsZh[subFilter]);

  return (
    <div className="bg-background flex h-[calc(100vh-3.5rem)] overflow-hidden">
      {/* ── Sidebar ── */}
      <aside className="border-border bg-muted/20 hidden w-56 shrink-0 flex-col border-r md:flex lg:w-60">
        <div className="border-border border-b px-3 py-3">
          <p className="text-foreground text-sm font-semibold tracking-tight">
            {dict.components.pageTitle}
          </p>
          <p className="text-muted-foreground mt-0.5 text-xs tabular-nums">
            {isEn
              ? `${components.length} components`
              : `${components.length} 个组件`}
          </p>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto p-2">
          <SideItem
            active={!catFilter}
            label={dict.components.allCategories}
            count={components.length}
            onClick={() => setCat("")}
          />
          {CATEGORIES.map((cat) => {
            const count = categoryCounts.get(cat) ?? 0;
            const label = isEn ? categoryLabelsEn[cat] : categoryLabelsZh[cat];
            const active = catFilter === cat;
            return (
              <div key={cat}>
                <SideItem
                  active={active}
                  label={label}
                  count={count}
                  onClick={() => setCat(active ? "" : cat)}
                />
                {cat === "Business" && active && (
                  <div className="border-border/60 ml-2 mt-0.5 space-y-0.5 border-l pl-2">
                    {BUSINESS_SUB_CATEGORIES.map((sc) => {
                      const items = businessSubCounts.get(sc) ?? [];
                      if (items.length === 0) return null;
                      const scLabel = isEn
                        ? businessSubLabelsEn[sc]
                        : businessSubLabelsZh[sc];
                      return (
                        <SideItem
                          key={sc}
                          active={subFilter === sc}
                          label={scLabel}
                          count={items.length}
                          dense
                          onClick={() =>
                            setSub(subFilter === sc ? "" : sc)
                          }
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="border-border text-muted-foreground border-t px-3 py-2 text-[11px]">
          <kbd className="bg-muted rounded px-1 font-mono">/</kbd>{" "}
          {isEn ? "search" : "搜索"} ·{" "}
          <kbd className="bg-muted rounded px-1 font-mono">⌘K</kbd>{" "}
          {isEn ? "command" : "命令"}
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Sticky toolbar */}
        <div className="border-border bg-background/95 sticky top-0 z-20 border-b px-3 py-3 backdrop-blur sm:px-4">
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative min-w-[12rem] flex-1 sm:max-w-lg">
                <SearchIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <input
                  ref={searchInputRef}
                  type="search"
                  value={query}
                  onChange={(e) => {
                    typingRef.current = true;
                    setQuery(e.target.value);
                  }}
                  placeholder={dict.components.searchPlaceholder}
                  aria-label={dict.components.searchLabel}
                  className="border-border bg-muted/40 text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/40 h-10 w-full rounded-xl border pr-3 pl-10 text-sm outline-none focus-visible:ring-2"
                />
              </div>

              <div className="border-border ml-auto flex items-center rounded-lg border p-0.5">
                <ToggleChip
                  active={view === "list"}
                  onClick={() => setView("list")}
                  label={dict.components.viewList}
                />
                <ToggleChip
                  active={view === "grid"}
                  onClick={() => setView("grid")}
                  label={dict.components.viewGrid}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {(
                [
                  ["all", dict.components.filterAll],
                  ["fav", dict.components.filterFavorites],
                  ["recent", dict.components.filterRecent],
                  ["new", dict.components.filterNew],
                ] as const
              ).map(([key, label]) => (
                <FilterChip
                  key={key}
                  active={quick === key}
                  onClick={() => setQuick(key)}
                  label={
                    key === "fav" && favorites.length
                      ? `${label} ${favorites.length}`
                      : key === "recent" && recents.length
                        ? `${label} ${recents.length}`
                        : label
                  }
                />
              ))}

              <span className="text-muted-foreground ml-auto hidden text-xs tabular-nums sm:inline">
                {activeCatLabel}
                {activeSubLabel ? ` · ${activeSubLabel}` : ""}
                {" · "}
                {isEn
                  ? `${totalCount} shown`
                  : `${totalCount} 项`}
              </span>
            </div>

            {/* Mobile category select */}
            <div className="md:hidden">
              <select
                className="border-border bg-background h-9 w-full rounded-lg border px-2 text-sm"
                value={catFilter ? categoryToPathSegment(catFilter) : ""}
                onChange={(e) => {
                  const v = e.target.value;
                  if (!v) setCat("");
                  else setCat(resolveCategoryParam(v) ?? "");
                }}
              >
                <option value="">{dict.components.allCategories}</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={categoryToPathSegment(cat)}>
                    {isEn ? categoryLabelsEn[cat] : categoryLabelsZh[cat]} (
                    {categoryCounts.get(cat)})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Result stream */}
        <div className="flex-1 overflow-y-auto px-3 py-3 sm:px-4">
          {totalCount === 0 ? (
            <EmptyState
              isEn={isEn}
              quick={quick}
              title={dict.components.noMatchTitle}
              clearLabel={dict.components.clearSearch}
              onClear={() => {
                typingRef.current = true;
                setQuery("");
                replaceParams({ q: null, f: null, cat: null, sub: null });
              }}
            />
          ) : view === "list" ? (
            <div className="border-border bg-card overflow-hidden rounded-xl border shadow-xs">
              {/* table header */}
              <div className="border-border bg-muted/40 text-muted-foreground hidden grid-cols-[1fr_8rem_7rem_2rem] gap-2 border-b px-3 py-2 text-xs font-medium sm:grid">
                <span>{isEn ? "Component" : "组件"}</span>
                <span>{isEn ? "Category" : "分类"}</span>
                <span className="font-mono">slug</span>
                <span className="sr-only">fav</span>
              </div>
              {visible.map((comp) => (
                <ComponentListRow
                  key={`${comp.category}-${comp.slug}`}
                  component={comp}
                  favorited={favorites.includes(comp.slug)}
                  onToggleFavorite={onToggleFavorite}
                  score={scoreMap?.get(comp.slug)}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
              {visible.map((comp) => (
                <ComponentCard
                  key={`${comp.category}-${comp.slug}`}
                  component={comp}
                />
              ))}
            </div>
          )}

          {hasMore && (
            <div className="mt-4 flex justify-center pb-6">
              <button
                type="button"
                onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                className="border-border bg-background hover:bg-muted text-foreground rounded-lg border px-4 py-2 text-sm font-medium transition-colors"
              >
                {isEn
                  ? `Load more (${stream.length - visibleCount} left)`
                  : `加载更多（剩余 ${stream.length - visibleCount}）`}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ComponentExplorer({ components }: ComponentExplorerProps) {
  return (
    <Suspense
      fallback={
        <div className="text-muted-foreground flex h-[calc(100vh-3.5rem)] items-center justify-center text-sm">
          Loading…
        </div>
      }
    >
      <ComponentExplorerInner components={components} />
    </Suspense>
  );
}

/* ── small UI pieces ── */

function SideItem({
  active,
  label,
  count,
  onClick,
  dense,
}: {
  active: boolean;
  label: string;
  count: number;
  onClick: () => void;
  dense?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "flex w-full items-center gap-2 rounded-lg text-left transition-colors " +
        (dense ? "px-2 py-1 text-[11px] " : "px-2.5 py-1.5 text-sm ") +
        (active
          ? "bg-primary text-primary-foreground font-medium shadow-sm"
          : "text-muted-foreground hover:bg-muted hover:text-foreground")
      }
    >
      <span className="min-w-0 flex-1 truncate">{label}</span>
      <span
        className={
          "tabular-nums " +
          (active ? "text-primary-foreground/80" : "text-muted-foreground/70")
        }
      >
        {count}
      </span>
    </button>
  );
}

function FilterChip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "rounded-full px-3 py-1 text-xs font-medium transition-colors " +
        (active
          ? "bg-primary text-primary-foreground"
          : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground")
      }
    >
      {label}
    </button>
  );
}

function ToggleChip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
        (active
          ? "bg-muted text-foreground"
          : "text-muted-foreground hover:text-foreground")
      }
    >
      {label}
    </button>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function EmptyState({
  isEn,
  quick,
  title,
  clearLabel,
  onClear,
}: {
  isEn: boolean;
  quick: QuickFilter;
  title: string;
  clearLabel: string;
  onClear: () => void;
}) {
  let hint = isEn ? "Try another keyword or clear filters." : "换个关键词或清空筛选。";
  if (quick === "fav") {
    hint = isEn
      ? "Star components in the list to save them here."
      : "在列表右侧点星标即可收藏。";
  } else if (quick === "recent") {
    hint = isEn
      ? "Open any component detail page to build history."
      : "打开任意组件详情后会出现在这里。";
  }
  return (
    <div className="mx-auto max-w-md py-20 text-center">
      <p className="text-foreground text-base font-medium">{title}</p>
      <p className="text-muted-foreground mt-1.5 text-sm">{hint}</p>
      <button
        type="button"
        onClick={onClear}
        className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 rounded-lg px-3 py-1.5 text-sm font-medium"
      >
        {clearLabel}
      </button>
    </div>
  );
}
