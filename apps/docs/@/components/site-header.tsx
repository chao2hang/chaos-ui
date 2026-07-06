"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Languages, ExternalLink } from "lucide-react";

const navLinks = [
  { href: "#install", label: "安装", labelEn: "Install" },
  { href: "#features", label: "特性", labelEn: "Features" },
  { href: "/components", label: "组件", labelEn: "Components" },
];

export function SiteHeader() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [locale, setLocale] = useState<"zh" | "en">("zh");

  useEffect(() => setMounted(true), []);

  const toggleLocale = () => setLocale((l) => (l === "zh" ? "en" : "zh"));

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
                {locale === "zh" ? link.label : link.labelEn}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground rounded-md px-3 py-1.5 text-sm transition-colors"
              >
                {locale === "zh" ? link.label : link.labelEn}
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
            size="icon-sm"
            onClick={toggleLocale}
            title={locale === "zh" ? "Switch to English" : "切换到中文"}
          >
            <Languages className="size-4" />
            <span className="ml-1.5 hidden text-xs font-medium sm:inline">
              {locale === "zh" ? "EN" : "中文"}
            </span>
          </Button>

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            title="Toggle theme"
          >
            {mounted && theme === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </Button>

          {/* Storybook link */}
          <a href="/storybook" target="_blank" rel="noopener noreferrer">
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
