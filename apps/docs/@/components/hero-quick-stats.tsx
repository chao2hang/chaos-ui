"use client";

import { useEffect, useState } from "react";

import { sectionIdForCategory } from "@/components/component-card";
import { useLocale } from "@/components/locale-provider";
import type { ComponentMeta } from "@/content/components.meta";
import {
  CATEGORIES,
  categoryLabelsEn,
  categoryLabelsZh,
} from "@/content/components.meta";

interface HeroQuickStatsProps {
  components: ComponentMeta[];
}

/**
 * Hero 区域的分类快捷入口胶囊。
 *
 * 行为：
 * - 8 个分类胶囊，按数量排序展示
 * - IntersectionObserver 监听下方各分类 section，激活当前可见分类
 * - 激活态 / hover 态与 ComponentSidebar / ComponentSearch 顶部胶囊条完全一致
 *   （共享 brand token：浅 `bg-brand-500/15 text-brand-700`、深 `bg-brand-500/25 text-brand-200`）
 */
export function HeroQuickStats({ components }: HeroQuickStatsProps) {
  const { locale } = useLocale();
  const isEn = locale === "en";
  const [activeCat, setActiveCat] = useState<string>("");

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
  }, [components]);

  return (
    <div className="mt-6 flex flex-wrap gap-1.5">
      {CATEGORIES.map((c) => {
        const count = components.filter((comp) => comp.category === c).length;
        const label = isEn ? categoryLabelsEn[c] : categoryLabelsZh[c];
        const sectionId = sectionIdForCategory(c);
        const isActive = activeCat === sectionId;
        return (
          <a
            key={c}
            href={`#${sectionId}`}
            aria-current={isActive ? "true" : undefined}
            className={
              "group inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs transition-colors " +
              (isActive
                ? "border-brand-500/40 bg-brand-500/15 text-brand-700 dark:border-brand-400/40 dark:bg-brand-500/25 dark:text-brand-200"
                : "border-border bg-card/80 text-foreground/80 hover:border-brand-500/30 hover:bg-muted/60 hover:text-foreground dark:border-border/80 dark:bg-card/60 dark:text-foreground/70 dark:hover:border-brand-400/30 dark:hover:text-foreground")
            }
          >
            <span
              className={
                "font-semibold tabular-nums " +
                (isActive
                  ? "text-brand-800 dark:text-brand-100"
                  : "text-foreground group-hover:text-brand-600 dark:group-hover:text-brand-400")
              }
            >
              {count}
            </span>
            <span className="text-muted-foreground">{label}</span>
          </a>
        );
      })}
    </div>
  );
}
