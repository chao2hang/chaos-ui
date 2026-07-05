import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import {
  components,
  categoryLabelsZh,
} from "@/content/components.meta";
import type { ComponentMeta } from "@/content/components.meta";

/* -------------------------------------------------------------------------- */
/*  Batch-1 slugs (30 components) — only these get static generation          */
/* -------------------------------------------------------------------------- */

const BATCH1_SLUGS = new Set<string>([
  // General (6)
  "button",
  "badge",
  "accordion",
  "calendar",
  "carousel",
  "collapsible",
  // Layout (3)
  "grid-layout",
  "separator",
  "scroll-area",
  // Navigation (2)
  "tabs",
  "breadcrumb",
  // Form (8)
  "input",
  "textarea",
  "select",
  "checkbox",
  "switch",
  "file-upload",
  "radio-group",
  "slider",
  // DataDisplay (4)
  "table",
  "card",
  "avatar",
  "timeline",
  // Feedback (4)
  "dialog",
  "drawer",
  "sonner",
  "progress",
  // Business (2)
  "data-table",
  "kpi-card",
  // System Layout (1)
  "app-shell",
]);

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

function findMeta(category: string, slug: string): ComponentMeta | undefined {
  return components.find(
    (c) => c.category === category && c.slug === slug,
  );
}

const storybookBase = "/storybook/?path=/docs/";

/* -------------------------------------------------------------------------- */
/*  Shared link classes                                                       */
/* -------------------------------------------------------------------------- */

const outlineLinkClass =
  "inline-flex items-center gap-1.5 rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground";

const primaryLinkClass =
  "inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90";

/* -------------------------------------------------------------------------- */
/*  generateStaticParams                                                      */
/* -------------------------------------------------------------------------- */

export function generateStaticParams(): { category: string; slug: string }[] {
  return components
    .filter((c) => BATCH1_SLUGS.has(c.slug))
    .map((c) => ({ category: c.category, slug: c.slug }));
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

  if (!meta) {
    return { title: "组件未找到 · Chaos UI" };
  }

  return {
    title: `${meta.name} ${meta.nameZh} · Chaos UI`,
    description: `${meta.desc} / ${meta.descZh}`,
    openGraph: {
      title: `${meta.name} ${meta.nameZh} · Chaos UI`,
      description: `${meta.desc} / ${meta.descZh}`,
    },
  };
}

/* -------------------------------------------------------------------------- */
/*  Fallback: meta not found                                                  */
/* -------------------------------------------------------------------------- */

function NotFoundFallback() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center">
      <h1 className="text-2xl font-bold text-foreground">
        组件详情生成中
        <span className="block text-base font-normal text-muted-foreground">
          Component page coming soon
        </span>
      </h1>
      <p className="mt-4 max-w-md text-sm text-muted-foreground">
        该组件的 MDX 详情页尚未上线（批次2 覆盖剩余 211 个组件），
        当前可前往 Storybook 查看交互式文档与所有变体示例。
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link href="/components" className={outlineLinkClass}>
          <ArrowLeft className="size-3.5" />
          返回组件总览
        </Link>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Fallback: not batch-1                                                     */
/* -------------------------------------------------------------------------- */

function ComingSoonFallback({ meta }: { meta: ComponentMeta }) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center">
      <h1 className="text-2xl font-bold text-foreground">
        {meta.name} {meta.nameZh}
      </h1>
      <p className="mt-4 max-w-md text-sm text-muted-foreground">
        该组件详情页正在制作中，预计批次2 上线。当前可前往 Storybook 查看完整文档。
        This component detail page is being prepared for batch 2.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link href="/components" className={outlineLinkClass}>
          <ArrowLeft className="size-3.5" />
          返回组件总览
        </Link>
        {meta.storybookId && (
          <a
            href={`${storybookBase}${meta.storybookId}`}
            target="_blank"
            rel="noopener noreferrer"
            className={primaryLinkClass}
          >
            Storybook 文档
            <ExternalLink className="size-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Fallback: MDX file not found                                              */
/* -------------------------------------------------------------------------- */

function MdxNotFoundFallback({ meta }: { meta: ComponentMeta }) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center">
      <h1 className="text-2xl font-bold text-foreground">
        {meta.name} {meta.nameZh}
      </h1>
      <p className="mt-4 max-w-md text-sm text-muted-foreground">
        MDX 文件未找到，请确认文件路径: @/content/{meta.category}/{meta.slug}.mdx
        <br />
        MDX file not found. Please verify the path above.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link href="/components" className={outlineLinkClass}>
          <ArrowLeft className="size-3.5" />
          返回组件总览
        </Link>
        {meta.storybookId && (
          <a
            href={`${storybookBase}${meta.storybookId}`}
            target="_blank"
            rel="noopener noreferrer"
            className={primaryLinkClass}
          >
            Storybook 文档
            <ExternalLink className="size-3.5" />
          </a>
        )}
      </div>
    </div>
  );
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

  if (!meta) {
    return <NotFoundFallback />;
  }

  if (!BATCH1_SLUGS.has(slug)) {
    return <ComingSoonFallback meta={meta} />;
  }

  // Dynamically load the MDX file
  let MDXContent: React.ComponentType | null = null;
  try {
    const mod = await import(
      `@/content/${category}/${slug}.mdx`
    );
    MDXContent = (mod as { default?: React.ComponentType }).default ?? null;
  } catch {
    return <MdxNotFoundFallback meta={meta} />;
  }

  if (!MDXContent) {
    return <MdxNotFoundFallback meta={meta} />;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      {/* Breadcrumb + Storybook link row */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link
            href="/components"
            className="transition-colors hover:text-foreground"
          >
            组件总览
          </Link>
          <span aria-hidden>/</span>
          <Link
            href={`/components#${category.replace(/\s+/g, "-").toLowerCase()}`}
            className="transition-colors hover:text-foreground"
          >
            {categoryLabelsZh[meta.category]}
          </Link>
          <span aria-hidden>/</span>
          <span className="font-medium text-foreground">{meta.name}</span>
        </nav>

        {meta.storybookId && (
          <a
            href={`${storybookBase}${meta.storybookId}`}
            target="_blank"
            rel="noopener noreferrer"
            className={outlineLinkClass}
          >
            Storybook 文档
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
