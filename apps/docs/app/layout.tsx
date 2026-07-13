import type { Metadata } from "next";
import Script from "next/script";
import { TooltipProvider } from "@chaos_team/chaos-ui/ui";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LocaleProvider } from "@/components/locale-provider";
import { DocsThemeProvider } from "@/components/docs-theme-provider";
import { CommandPaletteHost } from "@/components/command-palette-host";
import { getServerLocale } from "@/lib/i18n/get-server-locale";
import "./globals.css";

// Use system font stack to avoid build-time Google Fonts fetch failures in sandboxed/CI environments.
const fontSansClass =
  "font-[system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,'Helvetica_Neue',Arial,sans-serif]";
const fontMonoClass =
  "font-[ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,'Liberation_Mono','Courier_New',monospace]";

/**
 * Apply stored/system theme before paint.
 * Loaded via next/script beforeInteractive (not a raw <head><script>) so React
 * hydration is less likely to clash with browser extensions that rewrite scripts.
 */
const themeBootScript = `(function(){try{var k='chaos-docs-theme';var t=localStorage.getItem(k)||'system';var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var r=t==='dark'||(t==='system'&&d)?'dark':'light';var e=document.documentElement;e.classList.remove('light','dark');e.classList.add(r);e.setAttribute('data-theme',r);e.style.colorScheme=r;}catch(e){}})();`;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const isEn = locale === "en";
  return {
    title: {
      default: isEn
        ? "Chaos UI — Enterprise Component Library"
        : "Chaos UI — 企业级组件库",
      template: "%s | Chaos UI",
    },
    description: isEn
      ? "Chaos UI is an enterprise-grade React 19 + Next.js component library for ERP & business systems. Full component catalog, hooks, and utilities. Built with Tailwind CSS 4 and @base-ui/react."
      : "Chaos UI 是面向 ERP 与业务系统的企业级 React 19 + Next.js 组件库，提供完整组件目录、Hooks 与工具库，基于 Tailwind CSS 4 与 @base-ui/react。",
    keywords: [
      "React",
      "Next.js",
      "component library",
      "组件库",
      "ERP",
      "UI components",
      "design system",
      "Tailwind CSS",
      "shadcn/ui",
      "TypeScript",
    ],
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getServerLocale();
  const htmlLang = locale === "en" ? "en" : "zh-CN";
  return (
    <html
      lang={htmlLang}
      className={`${fontSansClass} ${fontMonoClass} h-full antialiased`}
      suppressHydrationWarning
      style={
        {
          "--font-geist-sans":
            "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
          "--font-geist-mono":
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
        } as React.CSSProperties
      }
    >
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <Script
          id="chaos-docs-theme-boot"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeBootScript }}
        />
        <LocaleProvider initialLocale={locale}>
          <DocsThemeProvider>
            <TooltipProvider>
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
              <CommandPaletteHost />
            </TooltipProvider>
          </DocsThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
