"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState, useEffect, useRef } from "react";

import type { Category, ComponentMeta } from "@/content/components.meta";
import {
  CATEGORIES,
  categoryLabelsEn,
  categoryLabelsZh,
} from "@/content/components.meta";
import { sectionIdForCategory } from "@/components/component-card";
import { useLocale } from "@/components/locale-provider";
import { useDict } from "@/hooks/use-dict";

interface DetailSidebarProps {
  components: ComponentMeta[];
}

/**
 * 组件详情页左侧导航栏 (antd 风格)。
 *
 * - 分类 → 组件名列表（点击跳转到对应详情页）
 * - 顶部迷你搜索框
 * - 当前组件高亮
 * - 折叠/展开分类
 * - 滚动到当前组件
 */
export function DetailSidebar({ components }: DetailSidebarProps) {
  const { locale } = useLocale();
  const dict = useDict();
  const isEn = locale === "en";
  const pathname = usePathname();

  const [query, setQuery] = useState("");
  const [collapsedCats, setCollapsedCats] = useState<Set<string>>(new Set());
  const navRef = useRef<HTMLElement>(null);

  // 从 URL 推断当前组件名
  const currentSlug = useMemo(() => {
    const match = pathname?.match(/\/components\/[^/]+\/([^/]+)/);
    return match ? decodeURIComponent(match[1]) : "";
  }, [pathname]);

  const currentComp = useMemo(
    () => components.find((c) => c.slug === currentSlug),
    [components, currentSlug],
  );

  const toggleCat = (key: string) => {
    setCollapsedCats((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const collapseAll = () => setCollapsedCats(new Set(CATEGORIES));
  const expandAll = () => setCollapsedCats(new Set());

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

  // 滚动到当前组件
  useEffect(() => {
    if (!currentSlug || !navRef.current) return;
    const el = navRef.current.querySelector(
      `[data-slug="${CSS.escape(currentSlug)}"]`,
    ) as HTMLElement | null;
    if (el) {
      el.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [currentSlug, catData]);

  return (
    <aside
      ref={navRef}
      className="border-border/50 bg-muted/20 hidden w-64 shrink-0 flex-col overflow-y-auto border-r md:flex"
    >
      {/* Header: search + collapse controls */}
      <div className="bg-card/95 sticky top-0 z-10 border-b px-3 pt-3 pb-2 backdrop-blur">
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

      {/* Category navigation */}
      <nav className="flex-1 px-2 pb-8">
        {CATEGORIES.map((cat) => {
          const data = catData.get(cat);
          if (!data) return null;

          const hasCurrent = currentComp?.category === cat;
          const isCollapsed = collapsedCats.has(cat) && !hasCurrent;
          const sectionId = sectionIdForCategory(cat);

          return (
            <div key={cat} className="mb-0.5">
              {/* Category title */}
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleCat(cat);
                  }}
                  className="text-muted-foreground hover:text-foreground shrink-0 rounded p-1 text-[10px] transition-colors"
                  aria-label={isCollapsed ? "展开" : "折叠"}
                >
                  {isCollapsed ? "▸" : "▾"}
                </button>
                <a
                  href={`/components#${sectionId}`}
                  className={
                    "group flex flex-1 items-center gap-2 rounded-md px-2 py-1.5 text-xs transition-colors " +
                    (hasCurrent
                      ? "bg-brand-500/10 text-brand-700 dark:bg-brand-500/20 dark:text-brand-200 font-medium"
                      : "text-foreground/70 hover:bg-muted/60 hover:text-foreground dark:text-foreground/60")
                  }
                >
                  <span className="flex-1 truncate">{data.label}</span>
                  <span className="text-muted-foreground/50 shrink-0 text-[10px] tabular-nums">
                    {data.components.length}
                  </span>
                </a>
              </div>

              {/* Component list */}
              {!isCollapsed && (
                <div className="border-border/20 ml-4 max-h-96 overflow-y-auto border-l pl-2">
                  {data.components.map((comp) => {
                    const isActive = currentSlug === comp.slug;
                    const href = `/components/${encodeURIComponent(comp.category)}/${encodeURIComponent(comp.slug)}`;
                    return (
                      <Link
                        key={`${comp.category}-${comp.slug}`}
                        href={href}
                        data-slug={comp.slug}
                        className={
                          "block truncate rounded px-2 py-0.5 font-mono text-[11px] transition-colors " +
                          (isActive
                            ? "bg-brand-500/15 text-brand-700 dark:bg-brand-500/25 dark:text-brand-200 font-medium"
                            : "text-foreground/60 hover:text-foreground hover:bg-muted")
                        }
                        title={isEn ? comp.name : comp.nameZh || comp.name}
                      >
                        {isEn ? comp.name : comp.nameZh || comp.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-border/50 text-muted-foreground/50 border-t px-3 py-2 text-[10px]">
        <kbd className="bg-muted/60 rounded border px-1 py-0.5 font-mono text-[9px]">
          /
        </kbd>{" "}
        {dict.sidebar.searchPlaceholder}
      </div>
    </aside>
  );
}
