"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { GUIDES } from "@/lib/docs-nav";
import { useLocale } from "@/components/locale-provider";
import { useDict } from "@/hooks/use-dict";

export function DocsSidebar() {
  const pathname = usePathname();
  const { locale } = useLocale();
  const dict = useDict();
  const isEn = locale === "en";

  return (
    <aside className="border-border/60 bg-background/50 sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 overflow-y-auto border-r px-3 py-6 md:block">
      <p className="text-muted-foreground mb-3 px-2 text-xs font-semibold tracking-wide uppercase">
        {dict.docs.navLabel}
      </p>
      <nav className="flex flex-col gap-0.5">
        {GUIDES.map((guide) => {
          const href = `/docs/${guide.slug}`;
          const active =
            pathname === href ||
            (guide.slug === "getting-started" && pathname === "/docs");
          return (
            <Link
              key={guide.slug}
              href={href}
              className={cn(
                "rounded-md px-2 py-1.5 text-sm transition-colors",
                active
                  ? "bg-brand-500/10 text-brand-700 dark:text-brand-300 font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {isEn ? guide.titleEn : guide.titleZh}
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 border-t pt-4">
        <p className="text-muted-foreground mb-2 px-2 text-xs font-semibold tracking-wide uppercase">
          {dict.header.navComponents}
        </p>
        <Link
          href="/components"
          className={cn(
            "rounded-md px-2 py-1.5 text-sm transition-colors",
            pathname.startsWith("/components")
              ? "bg-brand-500/10 text-brand-700 dark:text-brand-300 font-medium"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          {dict.docs.browseComponents}
        </Link>
      </div>
    </aside>
  );
}
