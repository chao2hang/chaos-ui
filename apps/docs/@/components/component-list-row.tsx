"use client";

import Link from "next/link";

import {
  categoryLabelsEn,
  categoryLabelsZh,
  categoryToPathSegment,
} from "@/content/components.meta";
import type { ComponentMeta } from "@/content/components.meta";
import { useLocale } from "@/components/locale-provider";
import {
  getBusinessSubCategory,
  businessSubLabelsEn,
  businessSubLabelsZh,
} from "@/lib/business-subcategories";

export interface ComponentListRowProps {
  component: ComponentMeta;
  favorited?: boolean;
  onToggleFavorite?: (slug: string) => void;
  score?: number;
}

/**
 * Dense table-like row for catalog browse / search results.
 */
export function ComponentListRow({
  component,
  favorited = false,
  onToggleFavorite,
  score,
}: ComponentListRowProps) {
  const { locale } = useLocale();
  const isEn = locale === "en";
  const href = `/components/${categoryToPathSegment(component.category)}/${encodeURIComponent(component.slug)}`;
  const catLabel = isEn
    ? categoryLabelsEn[component.category]
    : categoryLabelsZh[component.category];
  let subLabel = "";
  if (component.category === "Business") {
    const sub = getBusinessSubCategory(component);
    subLabel = isEn ? businessSubLabelsEn[sub] : businessSubLabelsZh[sub];
  }
  const secondary = isEn ? undefined : component.nameZh;
  const desc = isEn ? component.desc : component.descZh;

  return (
    <div className="border-border/50 hover:bg-muted/40 group grid grid-cols-1 items-center gap-1 border-b sm:grid-cols-[1fr_8rem_7rem_2rem] sm:gap-2">
      <Link
        href={href}
        className="min-w-0 px-3 py-2.5 sm:py-2"
      >
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="text-foreground text-sm font-medium">
            {component.name}
          </span>
          {secondary ? (
            <span className="text-muted-foreground text-xs">{secondary}</span>
          ) : null}
          {component.isNew ? (
            <span className="bg-primary/10 text-primary rounded px-1 py-px text-[10px] font-semibold tracking-wide uppercase">
              New
            </span>
          ) : null}
        </div>
        <p className="text-muted-foreground mt-0.5 line-clamp-1 text-xs">
          {desc}
        </p>
        <div className="text-muted-foreground mt-1 flex flex-wrap gap-2 text-[11px] sm:hidden">
          <span>
            {catLabel}
            {subLabel ? ` · ${subLabel}` : ""}
          </span>
          <span className="font-mono">{component.slug}</span>
        </div>
      </Link>

      <div className="text-muted-foreground hidden px-1 text-xs sm:block">
        <div className="truncate">{catLabel}</div>
        {subLabel ? (
          <div className="text-muted-foreground/70 truncate text-[11px]">
            {subLabel}
          </div>
        ) : null}
      </div>

      <div className="text-muted-foreground/80 hidden truncate px-1 font-mono text-[11px] sm:block">
        {component.slug}
        {typeof score === "number" && score > 0 ? (
          <span className="text-muted-foreground/40 ml-1">{score}</span>
        ) : null}
      </div>

      {onToggleFavorite ? (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite(component.slug);
          }}
          className={
            "hover:bg-muted mx-1 hidden size-8 items-center justify-center rounded-md text-sm transition-colors sm:inline-flex " +
            (favorited
              ? "text-amber-500"
              : "text-muted-foreground/35 hover:text-amber-500")
          }
          aria-label={favorited ? "Unfavorite" : "Favorite"}
          title={favorited ? "Unfavorite" : "Favorite"}
        >
          {favorited ? "★" : "☆"}
        </button>
      ) : (
        <span className="hidden sm:block" />
      )}
    </div>
  );
}
