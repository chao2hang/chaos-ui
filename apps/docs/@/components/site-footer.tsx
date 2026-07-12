"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator, AppLogo } from "@chaos_team/chaos-ui/ui";
import { getStorybookBaseUrl } from "@/lib/docs-nav";
import { useDict } from "@/hooks/use-dict";

const GITHUB_URL = "https://github.com/chao2hang/chaos-ui";

export function SiteFooter() {
  const dict = useDict();
  const storybookUrl = getStorybookBaseUrl();
  const pathname = usePathname();
  // Catalog uses full-viewport shell — skip footer there
  if (pathname.startsWith("/components")) return null;

  return (
    <footer className="border-border bg-muted/20 border-t py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <AppLogo text="C" gradient="brand" size={24} />
          <span>
            {dict.home.footerBuiltBy}{" "}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground font-medium hover:underline"
            >
              Chaos
            </a>
          </span>
        </div>

        <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-3 text-xs sm:gap-4">
          <span>MIT License</span>
          <Separator orientation="vertical" className="hidden h-3 sm:block" />
          <Link href="/docs/getting-started" className="hover:text-foreground">
            {dict.header.navDocs}
          </Link>
          <Link href="/components" className="hover:text-foreground">
            {dict.header.navComponents}
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href={storybookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            Storybook
          </a>
        </div>
      </div>
    </footer>
  );
}
