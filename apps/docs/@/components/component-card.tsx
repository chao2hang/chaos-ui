"use client";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { categoryLabelsZh } from "@/content/components.meta";
import type { ComponentMeta } from "@/content/components.meta";

/**
 * Card surface for a single component on the overview grid.
 *
 * Visual: title (name) + subtitle (nameZh) + 2-line descZh + category tag,
 * hover lift + shadow.
 *
 * Main entry → /components/[category]/[slug]
 * Side entry → Storybook autodocs (only when storybookId present)
 */
export function ComponentCard({ component }: { component: ComponentMeta }) {
  const categorySlug = encodeURIComponent(component.category);
  const slug = encodeURIComponent(component.slug);
  const detailHref = `/components/${categorySlug}/${slug}`;
  const storybookHref = component.storybookId
    ? `/storybook/?path=/docs/${component.storybookId}`
    : null;

  return (
    <Link
      href={detailHref}
      className="group relative flex h-full flex-col rounded-xl border border-border/60 bg-card p-4 text-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-500/40 hover:shadow-lg dark:hover:border-brand-400/40 dark:hover:shadow-black/40"
    >
      {/* Header: name + category tag */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-mono text-sm font-semibold text-foreground group-hover:text-brand-600 dark:group-hover:text-brand-400">
          {component.name}
        </h3>
        <Badge variant="outline" className="shrink-0 text-[10px] font-normal">
          {categoryLabelsZh[component.category]}
        </Badge>
      </div>

      {/* Subtitle (Chinese name) */}
      <p className="mt-1 text-xs text-muted-foreground">{component.nameZh}</p>

      {/* Description (zh, 2-line clamp) */}
      <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-muted-foreground">
        {component.descZh}
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
          className="mt-3 inline-flex cursor-pointer items-center gap-1 text-[11px] text-muted-foreground transition-colors hover:text-brand-600 dark:hover:text-brand-400"
        >
          Browse in Storybook
          <span aria-hidden className="text-[10px]">↗</span>
        </button>
      )}
    </Link>
  );
}

/**
 * Anchor id for the section that the search tabs scroll to.
 * Exposed as a helper so the page and search island share the same convention.
 */
export function sectionIdForCategory(category: ComponentMeta["category"]): string {
  return category.replace(/\s+/g, "-").toLowerCase();
}
