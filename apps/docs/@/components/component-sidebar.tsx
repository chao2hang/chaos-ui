"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { useLocale } from "@/components/locale-provider";
import { useDict } from "@/hooks/use-dict";
import type { Category, ComponentMeta } from "@/content/components.meta";
import {
  CATEGORIES,
  categoryLabelsEn,
  categoryLabelsZh,
} from "@/content/components.meta";
import { sectionIdForCategory } from "@/components/component-card";
import {
  BUSINESS_SUB_CATEGORIES,
  businessSubLabelsEn,
  businessSubLabelsZh,
  groupByBusinessSub,
} from "@/lib/business-subcategories";

interface ComponentSidebarProps {
  components: ComponentMeta[];
  /** 可选外部控制的侧边栏打开/关闭 */
  open?: boolean;
  onToggle?: () => void;
}

/**
 * 组件总览页左侧树形导航栏。
 *
 * - 分类 → 子分类（仅 Business）→ 组件列表
 * - 顶部迷你搜索框
 * - 全部折叠/展开快捷按钮
 * - IntersectionObserver 滚动联动高亮当前分类
 */
export function ComponentSidebar({
  components,
  open: externalOpen,
  onToggle,
}: ComponentSidebarProps) {
  const { locale } = useLocale();
  const dict = useDict();
  const isEn = locale === "en";

  const [query, setQuery] = useState("");
  const [collapsedCats, setCollapsedCats] = useState<Set<string>>(new Set());
  const [activeCat, setActiveCat] = useState<string>("");
  const sidebarRef = useRef<HTMLElement>(null);

  // 折叠/展开单个分类
  const toggleCat = (key: string) => {
    setCollapsedCats((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const collapseAll = () => {
    const keys = CATEGORIES.map((c) => c);
    setCollapsedCats(new Set(keys));
  };

  const expandAll = () => {
    setCollapsedCats(new Set());
  };

  // 按分类分组 + 过滤
  const catData = useMemo(() => {
    const normed = query.trim().toLowerCase();
    const result = new Map<
      Category,
      { label: string; components: ComponentMeta[] }
    >();

    for (const cat of CATEGORIES) {
      const label = isEn ? categoryLabelsEn[cat] : categoryLabelsZh[cat];
      const all = components.filter((c) => c.category === cat);
      if (!normed) {
        result.set(cat, { label, components: all });
        continue;
      }
      const filtered = all.filter((c) => {
        const hay = [c.name, c.nameZh, c.desc, c.descZh]
          .join(" ")
          .toLowerCase();
        return hay.includes(normed);
      });
      if (filtered.length > 0) {
        result.set(cat, { label, components: filtered });
      }
    }
    return result;
  }, [components, query, isEn]);

  // Business 子分组（过滤后）
  const businessSubData = useMemo(() => {
    const biz = catData.get("Business");
    if (!biz) return new Map();
    return groupByBusinessSub(biz.components);
  }, [catData]);

  // IntersectionObserver 滚动联动
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
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [components, query]);

  const sidebarContent = (
    <aside
      ref={sidebarRef}
      className="border-border/40 bg-card/80 h-full w-64 shrink-0 overflow-y-auto border-r"
    >
      {/* 头部：搜索 + 折叠控制 */}
      <div className="bg-card/95 sticky top-0 z-10 px-3 pt-3 pb-2 backdrop-blur">
        <div className="relative mb-2">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-muted-foreground pointer-events-none absolute top-1/2 left-2 size-3 -translate-y-1/2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={dict.sidebar.searchPlaceholder}
            className="border-border/50 bg-muted/50 text-foreground placeholder:text-muted-foreground focus-visible:border-brand-500/50 w-full rounded-md border py-1.5 pr-2 pl-7 text-xs transition-colors outline-none"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={expandAll}
            className="border-border/40 text-foreground/80 hover:border-brand-500/40 hover:bg-muted/60 hover:text-foreground rounded-md border px-2 py-0.5 text-[11px] transition-colors"
          >
            {dict.sidebar.expandAll}
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className="border-border/40 text-foreground/80 hover:border-brand-500/40 hover:bg-muted/60 hover:text-foreground rounded-md border px-2 py-0.5 text-[11px] transition-colors"
          >
            {dict.sidebar.collapseAll}
          </button>
        </div>
      </div>

      {/* 分类导航 */}
      <nav className="px-2 pb-8">
        {CATEGORIES.map((cat) => {
          const data = catData.get(cat);
          if (!data) return null;

          const isActive = activeCat === sectionIdForCategory(cat);
          const isCollapsed = collapsedCats.has(cat);
          const sectionId = sectionIdForCategory(cat);

          return (
            <div key={cat} className="mb-0.5">
              {/* 分类标题 */}
              <a
                href={`#${sectionId}`}
                onClick={(e) => {
                  // 如果已折叠，点击标题展开并跳转
                  if (isCollapsed) {
                    toggleCat(cat);
                  }
                  // 滚动由 href anchor 处理
                }}
                className={
                  "group flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs transition-colors " +
                  (isActive
                    ? "bg-brand-500/15 text-brand-700 ring-brand-500/20 dark:bg-brand-500/25 dark:text-brand-200 dark:ring-brand-400/20 font-medium ring-1"
                    : "text-foreground/80 hover:bg-muted/60 hover:text-foreground")
                }
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleCat(cat);
                  }}
                  className="text-muted-foreground hover:text-foreground shrink-0 text-[10px]"
                  aria-label={isCollapsed ? "展开" : "折叠"}
                >
                  {isCollapsed ? "▸" : "▾"}
                </button>
                <span className="flex-1 truncate">{data.label}</span>
                <span
                  className={
                    "shrink-0 rounded-full px-1.5 py-0.5 text-[10px] tabular-nums " +
                    (isActive
                      ? "bg-brand-500/25 text-brand-800 dark:bg-brand-500/35 dark:text-brand-100"
                      : "text-muted-foreground/60")
                  }
                >
                  {data.components.length}
                </span>
              </a>

              {/* 展开的子内容 */}
              {!isCollapsed && cat === "Business" && (
                <div className="border-border/20 ml-4 border-l pl-2">
                  {BUSINESS_SUB_CATEGORIES.map((sc) => {
                    const items = businessSubData.get(sc) ?? [];
                    if (items.length === 0) return null;
                    const scLabel = isEn
                      ? businessSubLabelsEn[sc]
                      : businessSubLabelsZh[sc];
                    return (
                      <a
                        key={sc}
                        href={`#sub-Business-${sc}`}
                        className="text-foreground/60 hover:text-foreground hover:bg-muted flex items-center gap-1 rounded px-2 py-1 text-[11px] transition-colors"
                      >
                        <span className="truncate">{scLabel}</span>
                        <span className="text-muted-foreground/50 shrink-0 text-[10px]">
                          {items.length}
                        </span>
                      </a>
                    );
                  })}
                </div>
              )}

              {!isCollapsed && cat !== "Business" && (
                <div className="border-border/20 ml-4 max-h-48 overflow-y-auto border-l pl-2">
                  {data.components.slice(0, 50).map((comp) => (
                    <a
                      key={`${comp.category}-${comp.slug}`}
                      href={`#${sectionId}`}
                      className="text-foreground/60 hover:text-foreground hover:bg-muted block truncate rounded px-2 py-0.5 font-mono text-[11px] transition-colors"
                      title={isEn ? comp.name : comp.nameZh || comp.name}
                    >
                      {isEn ? comp.name : comp.nameZh || comp.name}
                    </a>
                  ))}
                  {data.components.length > 50 && (
                    <span className="text-muted-foreground/50 px-2 text-[10px]">
                      +{data.components.length - 50} more
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );

  return sidebarContent;
}
