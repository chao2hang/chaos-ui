"use client";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { categoryLabelsZh, categoryLabelsEn } from "@/content/components.meta";
import type { ComponentMeta } from "@/content/components.meta";
import { useLocale } from "@/components/locale-provider";
import { useDict } from "@/hooks/use-dict";

/**
 * Card surface for a single component on the overview grid.
 *
 * Visual: name + secondary name + 2-line description + category tag,
 * hover lift + shadow. All bilingual fields (name/nameZh, desc/descZh,
 * category label) switch based on the active locale.
 *
 * Main entry → /components/[category]/[slug]
 * Side entry → Storybook autodocs (only when storybookId present)
 */
export function ComponentCard({ component }: { component: ComponentMeta }) {
  const { locale } = useLocale();
  const dict = useDict();
  const isEn = locale === "en";
  const categorySlug = encodeURIComponent(component.category);
  const slug = encodeURIComponent(component.slug);
  const detailHref = `/components/${categorySlug}/${slug}`;
  const storybookHref = component.storybookId
    ? `/storybook/?path=/docs/${component.storybookId}`
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
      className="group border-border/60 bg-card hover:border-brand-500/40 dark:hover:border-brand-400/40 relative flex h-full flex-col rounded-xl border p-4 text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg dark:hover:shadow-black/40"
    >
      {/* Header: name + category tag */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-foreground group-hover:text-brand-600 dark:group-hover:text-brand-400 font-mono text-sm font-semibold">
          {primaryName}
        </h3>
        <Badge variant="outline" className="shrink-0 text-[10px] font-normal">
          {categoryLabel}
        </Badge>
      </div>

      {/* Subtitle (Chinese name) — hidden in EN */}
      {secondaryName && (
        <p className="text-muted-foreground mt-1 text-xs">{secondaryName}</p>
      )}

      {/* Description (2-line clamp) */}
      <p className="text-muted-foreground mt-2 line-clamp-2 flex-1 text-xs leading-relaxed">
        {description}
      </p>

      {/* Footer: Storybook link (button to avoid <a>-inside-<a>) */}
      {storybookHref && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            window.open(storybookHref, "_blank", "noopener,noreferrer");
          }}
          className="text-muted-foreground hover:text-brand-600 dark:hover:text-brand-400 mt-3 inline-flex cursor-pointer items-center gap-1 text-[11px] transition-colors"
        >
          {dict.card.browseStorybook}
          <span aria-hidden className="text-[10px]">
            ↗
          </span>
        </button>
      )}
    </Link>
  );
}

/**
 * Anchor id for the section that the search tabs scroll to.
 * Exposed as a helper so the page and search island share the same convention.
 */
export function sectionIdForCategory(
  category: ComponentMeta["category"],
): string {
  return category.replace(/\s+/g, "-").toLowerCase();
}
