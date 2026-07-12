"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppLogo } from "@chaos_team/chaos-ui/ui";
import { Moon, Sun, Languages, ExternalLink } from "lucide-react";
import { useLocale } from "@/components/locale-provider";
import { useDocsTheme } from "@/components/docs-theme-provider";
import { useDict } from "@/hooks/use-dict";
import { getStorybookBaseUrl } from "@/lib/docs-nav";
import { cn } from "@/lib/utils";

function HeaderIconButton({
  onClick,
  title,
  children,
  className,
}: {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      className={cn(
        "text-muted-foreground hover:bg-muted hover:text-foreground inline-flex h-8 items-center justify-center gap-1.5 rounded-lg px-2 text-sm font-medium transition-colors",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function SiteHeader() {
  const { resolvedTheme, toggleTheme } = useDocsTheme();
  const { locale, toggleLocale } = useLocale();
  const dict = useDict();
  const pathname = usePathname();
  const storybookUrl = getStorybookBaseUrl();
  // Avoid SSR/client icon mismatch when boot script already set dark on <html>
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const isDark = mounted && resolvedTheme === "dark";

  const navLinks = [
    {
      href: "/docs/getting-started",
      label: dict.header.navDocs,
      match: "/docs",
    },
    {
      href: "/components",
      label: dict.header.navComponents,
      match: "/components",
    },
  ];

  return (
    <header className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <AppLogo text="C" gradient="brand" size={32} label="Chaos UI" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active = pathname.startsWith(link.match);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "inline-flex h-7 items-center rounded-lg px-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex-1" />

        <div className="flex items-center gap-0.5">
          <HeaderIconButton
            onClick={toggleLocale}
            title={
              locale === "zh" ? dict.header.toggleToEn : dict.header.toggleToZh
            }
          >
            <Languages className="size-4" />
            <span className="text-xs font-medium">
              {locale === "zh"
                ? dict.header.langLabelEn
                : dict.header.langLabelZh}
            </span>
          </HeaderIconButton>

          <HeaderIconButton
            onClick={toggleTheme}
            title={dict.header.themeToggle}
            className="size-8 px-0"
          >
            {isDark ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </HeaderIconButton>

          <a
            href={storybookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border-border bg-background hover:bg-muted ml-2 hidden h-8 items-center gap-1.5 rounded-lg border px-2.5 text-sm font-medium sm:inline-flex"
          >
            Storybook
            <ExternalLink className="size-3" />
          </a>
        </div>
      </div>
    </header>
  );
}
