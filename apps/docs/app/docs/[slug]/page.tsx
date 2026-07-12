import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsSidebar } from "@/components/docs-sidebar";
import {
  GUIDE_SLUGS,
  getGuide,
  type GuideSlug,
} from "@/lib/docs-nav";
import { getGuideBody } from "@/lib/guide-content";
import { getServerLocale } from "@/lib/i18n/get-server-locale";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return GUIDE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: "Docs" };
  const locale = await getServerLocale();
  const isEn = locale === "en";
  return {
    title: isEn ? guide.titleEn : guide.titleZh,
    description: isEn ? guide.descriptionEn : guide.descriptionZh,
  };
}

export default async function DocsGuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const locale = await getServerLocale();
  const isEn = locale === "en";
  const body = getGuideBody(locale, guide.slug as GuideSlug);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1">
      <DocsSidebar />
      <article className="min-w-0 flex-1 px-4 py-10 sm:px-8 lg:px-10">
        <header className="mb-10 max-w-3xl">
          <p className="text-brand-600 dark:text-brand-400 mb-2 text-sm font-medium">
            {isEn ? "Documentation" : "文档"}
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {isEn ? guide.titleEn : guide.titleZh}
          </h1>
          <p className="text-muted-foreground mt-3 text-base leading-relaxed">
            {isEn ? guide.descriptionEn : guide.descriptionZh}
          </p>
        </header>

        <div className="prose-docs max-w-3xl space-y-10">
          {body.sections.map((section) => (
            <section key={section.heading} className="space-y-3">
              <h2 className="text-xl font-semibold tracking-tight">
                {section.heading}
              </h2>
              {section.paragraphs?.map((p) => (
                <p
                  key={p.slice(0, 48)}
                  className="text-muted-foreground text-[15px] leading-relaxed"
                >
                  {p}
                </p>
              ))}
              {section.code?.map((block, i) => (
                <pre
                  key={`${section.heading}-${i}`}
                  className="bg-muted/70 border-border/60 overflow-x-auto rounded-lg border p-4 text-[13px] leading-relaxed"
                >
                  <code>{block.content}</code>
                </pre>
              ))}
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}
