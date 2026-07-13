"use client";

import { useMemo } from "react";
import type { Category, ComponentMeta } from "@/content/components.meta";
import {
  CATEGORIES,
  categoryLabelsEn,
  categoryLabelsZh,
} from "@/content/components.meta";
import {
  getBusinessSubCategory,
  businessSubLabelsEn,
  businessSubLabelsZh,
} from "@/lib/business-subcategories";

export interface RankedComponent {
  comp: ComponentMeta;
  score: number;
}

export interface UseComponentSearchResult {
  /** Flat ranked list (best match first) */
  results: RankedComponent[];
  /** Per-category groups (same filter, category order) */
  grouped: Map<Category, ComponentMeta[]>;
  totalCount: number;
  tokens: string[];
}

function basename(path: string): string {
  const parts = path.split("/");
  return (parts[parts.length - 1] ?? path).replace(/\.tsx?$/, "");
}

function haystackFor(comp: ComponentMeta): {
  name: string;
  nameZh: string;
  slug: string;
  desc: string;
  descZh: string;
  catEn: string;
  catZh: string;
  subEn: string;
  subZh: string;
  file: string;
  all: string;
} {
  const catEn = categoryLabelsEn[comp.category] ?? comp.category;
  const catZh = categoryLabelsZh[comp.category] ?? comp.category;
  let subEn = "";
  let subZh = "";
  if (comp.category === "Business") {
    const sub = getBusinessSubCategory(comp);
    subEn = businessSubLabelsEn[sub];
    subZh = businessSubLabelsZh[sub];
  }
  const name = comp.name.toLowerCase();
  const nameZh = comp.nameZh.toLowerCase();
  const slug = comp.slug.toLowerCase();
  const desc = (comp.desc ?? "").toLowerCase();
  const descZh = (comp.descZh ?? "").toLowerCase();
  const file = basename(comp.sourcePath).toLowerCase();
  const all = [
    name,
    nameZh,
    slug,
    desc,
    descZh,
    catEn.toLowerCase(),
    catZh.toLowerCase(),
    subEn.toLowerCase(),
    subZh.toLowerCase(),
    file,
    comp.category.toLowerCase(),
  ].join(" ");
  return {
    name,
    nameZh,
    slug,
    desc,
    descZh,
    catEn: catEn.toLowerCase(),
    catZh: catZh.toLowerCase(),
    subEn: subEn.toLowerCase(),
    subZh: subZh.toLowerCase(),
    file,
    all,
  };
}

/** Score one token against a component (higher = better). 0 = no match. */
function scoreToken(
  h: ReturnType<typeof haystackFor>,
  token: string,
): number {
  if (!token) return 0;
  if (h.slug === token || h.name === token || h.nameZh === token) return 100;
  if (h.slug.startsWith(token) || h.name.startsWith(token)) return 80;
  if (h.nameZh.startsWith(token)) return 78;
  if (h.name.includes(token) || h.nameZh.includes(token)) return 60;
  if (h.slug.includes(token) || h.file.includes(token)) return 50;
  if (h.catEn.includes(token) || h.catZh.includes(token)) return 35;
  if (h.subEn.includes(token) || h.subZh.includes(token)) return 32;
  if (h.desc.includes(token) || h.descZh.includes(token)) return 15;
  if (h.all.includes(token)) return 10;
  return 0;
}

/**
 * Ranked multi-token component search.
 * Shared by ComponentExplorer and CommandPalette.
 */
export function useComponentSearch(
  components: ComponentMeta[],
  query: string,
): UseComponentSearchResult {
  const tokens = useMemo(
    () =>
      query
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean),
    [query],
  );

  return useMemo(() => {
    const ranked: RankedComponent[] = [];

    for (const comp of components) {
      const h = haystackFor(comp);
      let score = 0;
      if (tokens.length === 0) {
        score = 0;
        ranked.push({ comp, score });
        continue;
      }
      let ok = true;
      for (const t of tokens) {
        const s = scoreToken(h, t);
        if (s === 0) {
          ok = false;
          break;
        }
        score += s;
      }
      if (!ok) continue;
      if (comp.isNew) score += 3;
      ranked.push({ comp, score });
    }

    if (tokens.length > 0) {
      ranked.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.comp.name.localeCompare(b.comp.name);
      });
    } else {
      // preserve stable category then name order for empty query consumers
      ranked.sort((a, b) => {
        const ca = CATEGORIES.indexOf(a.comp.category);
        const cb = CATEGORIES.indexOf(b.comp.category);
        if (ca !== cb) return ca - cb;
        return a.comp.name.localeCompare(b.comp.name);
      });
    }

    const grouped = new Map<Category, ComponentMeta[]>();
    for (const c of CATEGORIES) grouped.set(c, []);
    for (const { comp } of ranked) {
      grouped.get(comp.category)!.push(comp);
    }

    return {
      results: ranked,
      grouped,
      totalCount: ranked.length,
      tokens,
    };
  }, [components, tokens]);
}
