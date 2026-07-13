"use client";

import Link from "next/link";

import {
  categoryLabelsZh,
  categoryLabelsEn,
  categoryToPathSegment,
} from "@/content/components.meta";
import type { ComponentMeta } from "@/content/components.meta";
import { useLocale } from "@/components/locale-provider";
import { useDict } from "@/hooks/use-dict";
import { storybookDocsUrl } from "@/lib/docs-nav";

/**
 * Card surface for a single component on the overview grid.
 */
export function ComponentCard({ component }: { component: ComponentMeta }) {
  const { locale } = useLocale();
  const dict = useDict();
  const isEn = locale === "en";
  const categorySlug = categoryToPathSegment(component.category);
  const slug = encodeURIComponent(component.slug);
  const detailHref = `/components/${categorySlug}/${slug}`;
  const storybookHref = component.storybookId
    ? storybookDocsUrl(component.storybookId)
    : null;

  const categoryLabel = isEn
    ? categoryLabelsEn[component.category]
    : categoryLabelsZh[component.category];
  const primaryName = component.name;
  const secondaryName = isEn ? undefined : component.nameZh;
  const description = isEn ? component.desc : component.descZh;

  return (
    <Link
      href={detailHref}
      className="group border-border bg-card hover:border-primary/40 relative flex h-full flex-col rounded-xl border p-4 text-sm shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      {component.isNew && (
        <span
          className="bg-primary/10 text-primary absolute top-2.5 right-2.5 rounded px-1.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase"
          title={isEn ? "New" : "新组件"}
        >
          New
        </span>
      )}

      <div className="flex items-start justify-between gap-2 pr-10">
        <h3 className="text-foreground group-hover:text-primary text-sm font-semibold">
          {primaryName}
        </h3>
      </div>

      {secondaryName ? (
        <p className="text-muted-foreground mt-0.5 text-xs">{secondaryName}</p>
      ) : null}

      <p className="text-muted-foreground mt-2 line-clamp-2 flex-1 text-xs leading-relaxed">
        {description}
      </p>

      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="bg-muted text-muted-foreground rounded-md px-1.5 py-0.5 text-[11px]">
          {categoryLabel}
        </span>
        {storybookHref ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              window.open(storybookHref, "_blank", "noopener,noreferrer");
            }}
            className="text-muted-foreground hover:text-primary text-[11px] transition-colors"
          >
            {dict.card.browseStorybook} ↗
          </button>
        ) : (
          <span className="text-muted-foreground/60 font-mono text-[10px]">
            {component.slug}
          </span>
        )}
      </div>
    </Link>
  );
}

/** Anchor id helper (kept for detail breadcrumb / legacy links). */
export function sectionIdForCategory(
  category: ComponentMeta["category"],
): string {
  return categoryToPathSegment(category);
}
