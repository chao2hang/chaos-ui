import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@chaos_team/chaos-ui/ui";
import { ArrowLeft, ExternalLink } from "lucide-react";
import {
  components,
  categoryLabelsZh,
  categoryLabelsEn,
  categoryToPathSegment,
  resolveCategoryParam,
} from "@/content/components.meta";
import type { ComponentMeta } from "@/content/components.meta";
import { getServerLocale } from "@/lib/i18n/get-server-locale";
import { dict } from "@/lib/i18n/dict";
import { type Locale } from "@/lib/i18n/locale";
import { ComponentPreview } from "@/components/component-preview";
import { DetailSidebar } from "@/components/detail-sidebar";
import { TrackComponentRecent } from "@/components/track-component-recent";
import { mdxLoaders } from "@/components/mdx-loaders";

/* -------------------------------------------------------------------------- */
/*  Static params for every registered component in components.meta.ts          */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

function findMeta(category: string, slug: string): ComponentMeta | undefined {
  const resolved = resolveCategoryParam(category);
  if (!resolved) return undefined;
  let decodedSlug = slug;
  try {
    decodedSlug = decodeURIComponent(slug);
  } catch {
    /* keep slug */
  }
  return components.find(
    (c) => c.category === resolved && (c.slug === slug || c.slug === decodedSlug),
  );
}

const storybookBase =
  (process.env.STORYBOOK_BASE_URL ??
    process.env.NEXT_PUBLIC_STORYBOOK_URL ??
    "http://localhost:6006").replace(/\/$/, "") + "/?path=/docs/";

/* -------------------------------------------------------------------------- */
/*  Shared link classes                                                       */
/* -------------------------------------------------------------------------- */


/* -------------------------------------------------------------------------- */
/*  generateStaticParams                                                      */
/* -------------------------------------------------------------------------- */

export function generateStaticParams(): { category: string; slug: string }[] {
  // Prefer kebab path segments (`system-layout`); resolveCategoryParam still accepts
  // encoded spaces / canonical names for bookmarks.
  return components.map((c) => ({
    category: categoryToPathSegment(c.category),
    slug: c.slug,
  }));
}

/* -------------------------------------------------------------------------- */
/*  generateMetadata                                                          */
/* -------------------------------------------------------------------------- */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const meta = findMeta(category, slug);
  const locale = await getServerLocale();
  const isEn = locale === "en";

  if (!meta) {
    return {
      title: isEn ? "Component not found · Chaos UI" : "组件未找到 · Chaos UI",
    };
  }

  const title = isEn ? meta.name : `${meta.name} ${meta.nameZh}`;
  const description = isEn ? meta.desc : `${meta.desc} / ${meta.descZh}`;
  return {
    title: `${title} · Chaos UI`,
    description,
    openGraph: {
      title: `${title} · Chaos UI`,
      description,
    },
  };
}

/* -------------------------------------------------------------------------- */
/*  Fallback: meta not found                                                  */
/* -------------------------------------------------------------------------- */

function NotFoundFallback({ locale }: { locale: Locale }) {
  const d = dict[locale];
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center">
      <h1 className="text-foreground text-2xl font-bold">
        {d.detail.notFoundTitle}
      </h1>
      <p className="text-muted-foreground mt-4 max-w-md text-sm">
        {d.detail.notFoundDesc}
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link href="/components" className="border-border bg-background hover:bg-muted inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-sm font-medium transition-colors">
          <ArrowLeft className="size-3.5" />
          {d.detail.breadcrumbRoot}
        </Link>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Fallback: MDX file not found                                              */
/* -------------------------------------------------------------------------- */

function MdxNotFoundFallback({
  meta,
  locale,
}: {
  meta: ComponentMeta;
  locale: Locale;
}) {
  const d = dict[locale];
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center">
      <h1 className="text-foreground text-2xl font-bold">
        {meta.name} {meta.nameZh}
      </h1>
      <p className="text-muted-foreground mt-4 max-w-md text-sm">
        {d.detail.mdxNotFoundDesc}
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link href="/components" className="border-border bg-background hover:bg-muted inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-sm font-medium transition-colors">
          <ArrowLeft className="size-3.5" />
          {d.detail.breadcrumbRoot}
        </Link>
        {meta.storybookId && (
          <a
            href={`${storybookBase}${meta.storybookId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border-border bg-background hover:bg-muted inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-sm font-medium transition-colors"
          >
            {d.detail.storybookLink}
            <ExternalLink className="size-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  MDX loader — locale-aware with fallback                                   */
/* -------------------------------------------------------------------------- */

/**
 * Load MDX docs for a component.
 * mdx-loaders keys use **canonical** category folder names (`General`, `DataDisplay`,
 * `System Layout`), while URLs use kebab segments (`general`, `data-display`,
 * `system-layout`). Always resolve before lookup.
 */
async function loadMdx(
  category: string,
  slug: string,
  locale: Locale,
): Promise<React.ComponentType | null> {
  const resolvedCat =
    resolveCategoryParam(category) ??
    (() => {
      try {
        return resolveCategoryParam(decodeURIComponent(category));
      } catch {
        return undefined;
      }
    })();

  // Candidates: canonical meta category first, then raw/decoded route params
  const catKeys = Array.from(
    new Set(
      [resolvedCat, category, (() => {
        try {
          return decodeURIComponent(category);
        } catch {
          return category;
        }
      })()].filter(Boolean) as string[],
    ),
  );

  let decodedSlug = slug;
  try {
    decodedSlug = decodeURIComponent(slug);
  } catch {
    /* keep slug */
  }
  const slugKeys = Array.from(new Set([slug, decodedSlug]));

  const locales: Locale[] = [locale, locale === "en" ? "zh" : "en"];

  for (const cat of catKeys) {
    for (const s of slugKeys) {
      for (const loc of locales) {
        const loader = mdxLoaders[`${cat}/${s}.${loc}`];
        if (loader) {
          try {
            const mod = await loader();
            if (mod.default) return mod.default;
          } catch {
            // locale-specific file missing — try next
          }
        }
      }
      // bare file (no .zh/.en suffix)
      const fallback = mdxLoaders[`${cat}/${s}`];
      if (fallback) {
        try {
          const mod = await fallback();
          if (mod.default) return mod.default;
        } catch {
          // continue
        }
      }
    }
  }
  return null;
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default async function ComponentDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const meta = findMeta(category, slug);
  const locale = await getServerLocale();
  const d = dict[locale];

  if (!meta) {
    return <NotFoundFallback locale={locale} />;
  }

  // Prefer meta.category (canonical) so kebab URLs still hit MDX loaders
  const MDXContent = await loadMdx(meta.category, meta.slug, locale);

  if (!MDXContent) {
    return <MdxNotFoundFallback meta={meta} locale={locale} />;
  }

  const categoryLabel =
    locale === "en"
      ? categoryLabelsEn[meta.category]
      : categoryLabelsZh[meta.category];

  return (
    <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden">
      <TrackComponentRecent slug={meta.slug} />
      {/* antd-style left sidebar: component list with search */}
      <DetailSidebar components={components} />

      {/* Right content area: scrollable detail */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          {/* Breadcrumb + Storybook link row */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <nav className="text-muted-foreground flex items-center gap-1.5 text-sm">
              <Link
                href="/components"
                className="hover:text-foreground transition-colors"
              >
                {d.detail.breadcrumbRoot}
              </Link>
              <span aria-hidden>/</span>
              <Link
                href={`/components?cat=${categoryToPathSegment(meta.category)}`}
                className="hover:text-foreground transition-colors"
              >
                {categoryLabel}
              </Link>
              <span aria-hidden>/</span>
              <span className="text-foreground font-medium">{meta.name}</span>
            </nav>

            {meta.storybookId && (
              <a
                href={`${storybookBase}${meta.storybookId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm" className="gap-1.5">
                  {d.detail.storybookLink}
                  <ExternalLink className="size-3.5" />
                </Button>
              </a>
            )}
          </div>

          {/* Live component preview */}
          <ComponentPreview name={meta.name} nameZh={meta.nameZh} />

          {/* MDX content */}
          <article>
            <MDXContent />
          </article>
        </div>
      </div>
    </div>
  );
}
