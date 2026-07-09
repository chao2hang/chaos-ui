"use client";

import { useMemo, useState, useEffect, useCallback, useRef } from "react";

import {
  ComponentCard,
  sectionIdForCategory,
} from "@/components/component-card";
import { useLocale } from "@/components/locale-provider";
import { useDict } from "@/hooks/use-dict";
import type { Category, ComponentMeta } from "@/content/components.meta";
import {
  CATEGORIES,
  categoryLabelsEn,
  categoryLabelsZh,
} from "@/content/components.meta";
import {
  BUSINESS_SUB_CATEGORIES,
  businessSubLabelsEn,
  businessSubLabelsZh,
  groupByBusinessSub,
} from "@/lib/business-subcategories";

/* ================================================================
 * Shared types
 * ================================================================ */

interface ComponentExplorerProps {
  components: ComponentMeta[];
}

/* ================================================================
 * <ComponentExplorer> — unified sidebar + content, single state
 * ================================================================ */

/**
 * 组件总览页统一探索器。
 *
 * 设计原则：
 * - 单一搜索源：搜索框在侧边栏，同时过滤侧边栏树和主内容卡片
 * - 无 Hero / 无顶部胶囊条：去掉所有冗余筛选入口
 * - 侧边栏只显示分类 + 数量，Business 可展开子分组
 * - 主内容区：分类 section header + 卡片网格，简洁直接
 * - IntersectionObserver 滚动联动高亮
 */
export function ComponentExplorer({ components }: ComponentExplorerProps) {
  const { locale } = useLocale();
  const dict = useDict();
  const isEn = locale === "en";
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string>("");
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  /* ---------- search filter (shared) ---------- */
  const normalized = query.trim().toLowerCase();

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

  /* ---------- collapse helpers ---------- */
  const toggleCollapse = useCallback((key: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  /* ---------- IntersectionObserver ---------- */
  useEffect(() => {
    const sectionIds = CATEGORIES.map((c) => sectionIdForCategory(c));
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveCat(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [components]);

  /* ---------- keyboard shortcut: focus search ---------- */
  const searchInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => {
      // Don't interfere with Cmd+K (command palette)
      if ((e.metaKey || e.ctrlKey) && e.key === "k") return;
      // "/" to focus search (GitHub style)
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

  /* ---------- render ---------- */
  return (
    <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden">
      {/* ========================================================== */}
      {/*  SIDEBAR                                                    */}
      {/* ========================================================== */}
      <aside className="border-border/50 bg-muted/30 hidden w-72 shrink-0 flex-col md:flex">
        {" "}
        {/* ---- Sidebar header: search ---- */}
        <div className="border-border/50 sticky top-0 z-10 border-b bg-inherit px-3 pt-4 pb-3">
          <div className="relative">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              ref={searchInputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={dict.sidebar.searchPlaceholder}
              aria-label={dict.components.searchLabel}
              className="bg-background/60 border-border/50 text-foreground placeholder:text-muted-foreground focus-visible:border-brand-500/50 focus-visible:ring-brand-500/20 w-full rounded-lg border py-2 pr-2 pl-8 text-xs transition-colors outline-none focus-visible:ring-2"
            />
          </div>
          {/* Result count */}
          <p className="text-muted-foreground/70 mt-2 text-[11px] tabular-nums">
            {totalCount === 0
              ? dict.components.noMatchTitle
              : isEn
                ? `${totalCount} / ${components.length} components`
                : `${totalCount} / ${components.length} 个组件`}
          </p>
        </div>
        {/* ---- Category list ---- */}
        <nav className="flex-1 overflow-y-auto px-2 py-2">
          {CATEGORIES.map((cat) => {
            const list = grouped.get(cat) ?? [];
            if (list.length === 0 && normalized) return null;

            const label = isEn ? categoryLabelsEn[cat] : categoryLabelsZh[cat];
            const sectionId = sectionIdForCategory(cat);
            const isActive = activeCat === sectionId;
            const isCollapsed = collapsed.has(cat);

            return (
              <div key={cat} className="mb-0.5">
                {/* Category row */}
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleCollapse(cat);
                    }}
                    className="text-muted-foreground hover:text-foreground hover:bg-muted/60 shrink-0 rounded p-1 text-[10px] transition-colors"
                    aria-label={isCollapsed ? "展开" : "折叠"}
                  >
                    {isCollapsed ? "▸" : "▾"}
                  </button>
                  <a
                    href={`#${sectionId}`}
                    className={
                      "group flex flex-1 items-center gap-2 rounded-md px-2 py-1.5 text-xs transition-colors " +
                      (isActive
                        ? "bg-brand-500/10 text-brand-700 dark:bg-brand-500/20 dark:text-brand-200 font-medium"
                        : "text-foreground/70 hover:bg-muted/60 hover:text-foreground dark:text-foreground/60")
                    }
                  >
                    <span className="flex-1 truncate">{label}</span>
                    <span
                      className={
                        "shrink-0 text-[10px] tabular-nums " +
                        (isActive
                          ? "text-brand-600 dark:text-brand-300"
                          : "text-muted-foreground/50")
                      }
                    >
                      {list.length}
                    </span>
                  </a>
                </div>

                {/* Expanded: Business sub-categories */}
                {!isCollapsed && cat === "Business" && (
                  <div className="border-border/30 ml-5 border-l pl-1.5">
                    {BUSINESS_SUB_CATEGORIES.map((sc) => {
                      const subList = groupByBusinessSub(list).get(sc) ?? [];
                      if (subList.length === 0) return null;
                      const scLabel = isEn
                        ? businessSubLabelsEn[sc]
                        : businessSubLabelsZh[sc];
                      return (
                        <a
                          key={sc}
                          href={`#sub-Business-${sc}`}
                          className="text-muted-foreground/70 hover:text-foreground hover:bg-muted/40 flex items-center gap-2 rounded px-2 py-1 text-[11px] transition-colors"
                        >
                          <span className="flex-1 truncate">{scLabel}</span>
                          <span className="text-muted-foreground/40 text-[10px] tabular-nums">
                            {subList.length}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        {/* ---- Sidebar footer ---- */}
        <div className="border-border/50 text-muted-foreground/50 border-t px-3 py-2 text-[10px]">
          <kbd className="bg-muted/60 rounded border px-1 py-0.5 font-mono text-[9px]">
            /
          </kbd>{" "}
          {dict.sidebar.searchPlaceholder} ·{" "}
          <kbd className="bg-muted/60 rounded border px-1 py-0.5 font-mono text-[9px]">
            ⌘K
          </kbd>{" "}
          {isEn ? "Command" : "命令面板"}
        </div>
      </aside>

      {/* ========================================================== */}
      {/*  MAIN CONTENT                                               */}
      {/* ========================================================== */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
          {/* ---- Mobile search (visible on < md) ---- */}
          <div className="mb-4 md:hidden">
            <div className="relative">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={dict.components.searchPlaceholder}
                aria-label={dict.components.searchLabel}
                className="bg-muted/40 border-border text-foreground placeholder:text-muted-foreground focus-visible:border-brand-500 focus-visible:ring-brand-500/20 h-10 w-full rounded-lg border pr-3 pl-9 text-sm transition-colors outline-none focus-visible:ring-2"
              />
            </div>
          </div>

          {/* ---- Sections ---- */}
          {totalCount === 0 ? (
            <NoResults
              onClear={() => setQuery("")}
              title={dict.components.noMatchTitle}
              subtitle={dict.components.noMatchTitleEn}
              clearLabel={dict.components.clearSearch}
            />
          ) : (
            <div className="flex flex-col gap-8">
              {CATEGORIES.map((cat) => {
                const list = grouped.get(cat) ?? [];
                if (list.length === 0) return null;

                const label = isEn
                  ? categoryLabelsEn[cat]
                  : categoryLabelsZh[cat];
                const catCollapsed = collapsed.has(cat);
                const sectionId = sectionIdForCategory(cat);

                if (cat === "Business") {
                  return (
                    <BusinessSection
                      key={cat}
                      catKey={cat}
                      sectionId={sectionId}
                      label={label}
                      list={list}
                      collapsed={catCollapsed}
                      allCollapsed={collapsed}
                      onToggle={toggleCollapse}
                      isEn={isEn}
                    />
                  );
                }

                return (
                  <section key={cat} id={sectionId} className="scroll-mt-6">
                    <SectionHeader
                      label={label}
                      count={list.length}
                      collapsed={catCollapsed}
                      onToggle={() => toggleCollapse(cat)}
                    />
                    {!catCollapsed && (
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
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
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================================================================
 * Sub-components
 * ================================================================ */

function SectionHeader({
  label,
  count,
  collapsed,
  onToggle,
}: {
  label: string;
  count: number;
  collapsed: boolean;
  onToggle: () => void;
}) {
  return (
    <header
      className="group mb-4 flex cursor-pointer items-center gap-2 select-none"
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      aria-expanded={!collapsed}
    >
      <span className="text-muted-foreground hover:text-foreground text-xs transition-colors">
        {collapsed ? "▸" : "▾"}
      </span>
      <h2 className="text-foreground text-base font-semibold tracking-tight">
        {label}
      </h2>
      <span className="text-muted-foreground/60 text-xs tabular-nums">
        {count}
      </span>
      <span className="border-border/40 group-hover:border-border/70 ml-2 h-px flex-1 border-t transition-colors" />
    </header>
  );
}

function BusinessSection({
  catKey,
  sectionId,
  label,
  list,
  collapsed,
  allCollapsed,
  onToggle,
  isEn,
}: {
  catKey: string;
  sectionId: string;
  label: string;
  list: ComponentMeta[];
  collapsed: boolean;
  allCollapsed: Set<string>;
  onToggle: (key: string) => void;
  isEn: boolean;
}) {
  const subGroups = useMemo(() => groupByBusinessSub(list), [list]);

  return (
    <section id={sectionId} className="scroll-mt-6">
      <SectionHeader
        label={label}
        count={list.length}
        collapsed={collapsed}
        onToggle={() => onToggle(catKey)}
      />
      {!collapsed && (
        <div className="flex flex-col gap-6">
          {BUSINESS_SUB_CATEGORIES.map((sc) => {
            const items = subGroups.get(sc) ?? [];
            if (items.length === 0) return null;
            const scKey = `Business::${sc}`;
            const scCollapsed = allCollapsed.has(scKey);
            const scLabel = isEn
              ? businessSubLabelsEn[sc]
              : businessSubLabelsZh[sc];

            return (
              <div key={scKey} id={`sub-Business-${sc}`}>
                <header
                  className="group mb-3 flex cursor-pointer items-center gap-2 select-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggle(scKey);
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      e.stopPropagation();
                      onToggle(scKey);
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
                  <span className="text-muted-foreground/50 text-[10px] tabular-nums">
                    {items.length}
                  </span>
                  <span className="border-border/30 group-hover:border-border/50 ml-2 h-px flex-1 border-t transition-colors" />
                </header>
                {!scCollapsed && (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
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

function NoResults({
  onClear,
  title,
  subtitle,
  clearLabel,
}: {
  onClear: () => void;
  title: string;
  subtitle: string;
  clearLabel: string;
}) {
  return (
    <div className="mx-auto max-w-md py-24 text-center">
      <p className="text-foreground text-base font-medium">{title}</p>
      <p className="text-muted-foreground mt-1.5 text-sm">{subtitle}</p>
      <button
        type="button"
        onClick={onClear}
        className="bg-muted hover:bg-muted/80 text-foreground mt-5 rounded-lg px-4 py-1.5 text-xs font-medium transition-colors"
      >
        {clearLabel}
      </button>
    </div>
  );
}
