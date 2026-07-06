import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import {
  components,
  categoryLabelsZh,
  categoryLabelsEn,
} from "@/content/components.meta";
import type { ComponentMeta } from "@/content/components.meta";
import { getServerLocale } from "@/lib/i18n/get-server-locale";
import { dict } from "@/lib/i18n/dict";
import type { Locale } from "@/lib/i18n/locale";

/* -------------------------------------------------------------------------- */
/*  All 300 components — static generation for every MDX detail page          */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

function findMeta(category: string, slug: string): ComponentMeta | undefined {
  return components.find((c) => c.category === category && c.slug === slug);
}

const storybookBase = "/storybook/?path=/docs/";

/* -------------------------------------------------------------------------- */
/*  Shared link classes                                                       */
/* -------------------------------------------------------------------------- */

const outlineLinkClass =
  "inline-flex items-center gap-1.5 rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground";

/* -------------------------------------------------------------------------- */
/*  generateStaticParams                                                      */
/* -------------------------------------------------------------------------- */

export function generateStaticParams(): { category: string; slug: string }[] {
  return components.map((c) => ({ category: c.category, slug: c.slug }));
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
        {d.detail.mdxNotFoundTitle}
      </h1>
      <p className="text-muted-foreground mt-4 max-w-md text-sm">
        {d.detail.mdxNotFoundDesc}
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link href="/components" className={outlineLinkClass}>
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
        <Link href="/components" className={outlineLinkClass}>
          <ArrowLeft className="size-3.5" />
          {d.detail.breadcrumbRoot}
        </Link>
        {meta.storybookId && (
          <a
            href={`${storybookBase}${meta.storybookId}`}
            target="_blank"
            rel="noopener noreferrer"
            className={outlineLinkClass}
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

async function loadMdx(
  category: string,
  slug: string,
  locale: Locale,
): Promise<React.ComponentType | null> {
  // Try the locale-specific MDX first (e.g. `activity-feed.zh.mdx`),
  // then fall back to the original unsplit file (`activity-feed.mdx`).
  try {
    const mod = await import(`@/content/${category}/${slug}.${locale}.mdx`);
    if ((mod as { default?: React.ComponentType }).default) {
      return (mod as { default: React.ComponentType }).default;
    }
  } catch {
    // locale-specific file doesn't exist yet — fall through to legacy file
  }
  try {
    const mod = await import(`@/content/${category}/${slug}.mdx`);
    return (mod as { default?: React.ComponentType }).default ?? null;
  } catch {
    return null;
  }
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

  const MDXContent = await loadMdx(category, slug, locale);

  if (!MDXContent) {
    return <MdxNotFoundFallback meta={meta} locale={locale} />;
  }

  const categoryLabel =
    locale === "en"
      ? categoryLabelsEn[meta.category]
      : categoryLabelsZh[meta.category];

  return (
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
            href={`/components#${category.replace(/\s+/g, "-").toLowerCase()}`}
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
            className={outlineLinkClass}
          >
            {d.detail.storybookLink}
            <ExternalLink className="size-3.5" />
          </a>
        )}
      </div>

      {/* MDX content */}
      <article>
        <MDXContent />
      </article>
    </div>
  );
}
