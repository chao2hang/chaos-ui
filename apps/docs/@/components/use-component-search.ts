"use client";

import { useMemo } from "react";
import type { Category, ComponentMeta } from "@/content/components.meta";
import { CATEGORIES } from "@/content/components.meta";

export interface UseComponentSearchResult {
  /** 每个分类下的过滤结果 */
  grouped: Map<Category, ComponentMeta[]>;
  /** 总匹配数 */
  totalCount: number;
}

/**
 * 共享的组件搜索过滤 hook。
 * 同时被 ComponentSearch 和 CommandPalette 使用。
 */
export function useComponentSearch(
  components: ComponentMeta[],
  query: string,
): UseComponentSearchResult {
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

  return { grouped, totalCount };
}
