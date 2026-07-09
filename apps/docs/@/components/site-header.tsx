"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@chaos_team/chaos-ui/ui";
import { Button } from "@chaos_team/chaos-ui/ui";
import { Moon, Sun, Languages, ExternalLink } from "lucide-react";
import { useLocale } from "@/components/locale-provider";
import { useDict } from "@/hooks/use-dict";

export function SiteHeader() {
  const { theme, setTheme } = useTheme();
  const { locale, toggleLocale } = useLocale();
  const dict = useDict();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard hydration-mismatch guard for theme toggle
    setMounted(true);
  }, []);

  const navLinks = [
    { href: "#install", label: dict.header.navInstall },
    { href: "#features", label: dict.header.navFeatures },
    { href: "/components", label: dict.header.navComponents },
  ];

  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="bg-brand-500 flex size-8 items-center justify-center rounded-lg text-sm font-bold text-white">
            C
          </span>
          <span className="text-foreground hidden sm:inline-block">
            Chaos UI
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) =>
            link.href.startsWith("#") ? (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground rounded-md px-3 py-1.5 text-sm transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground rounded-md px-3 py-1.5 text-sm transition-colors"
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex-1" />

        {/* Actions */}
        <div className="flex items-center gap-1">
          {/* Locale toggle */}
          <Button
            variant="ghost"
            size="sm"
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
          </Button>

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            title={dict.header.themeToggle}
          >
            {mounted && theme === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </Button>

          {/* Storybook link */}
          <a
            href="http://localhost:3002"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              size="sm"
              className="ml-2 hidden gap-1.5 sm:inline-flex"
            >
              Storybook
              <ExternalLink className="size-3" />
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}
