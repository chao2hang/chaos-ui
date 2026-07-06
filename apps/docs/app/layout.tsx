import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/site-header";
import { LocaleProvider } from "@/components/locale-provider";
import { getServerLocale } from "@/lib/i18n/get-server-locale";
import "./globals.css";

// Use system font stack to avoid build-time Google Fonts fetch failures in sandboxed/CI environments.
// The CSS variables --font-geist-sans and --font-geist-mono are preserved for tailwind theme compatibility.
const fontSansClass =
  "font-[system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,'Helvetica_Neue',Arial,sans-serif]";
const fontMonoClass =
  "font-[ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,'Liberation_Mono','Courier_New',monospace]";

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
      ? "Chaos UI is an enterprise-grade React 19 + Next.js component library for ERP & business systems. 148+ components, 19 hooks, 5 utility modules. Built with Tailwind CSS 4 and shadcn/ui."
      : "Chaos UI 是面向 ERP 与业务系统的企业级 React 19 + Next.js 组件库，包含 148+ 组件、19 个 Hooks、5 个工具模块，基于 Tailwind CSS 4 与 shadcn/ui。",
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
      <body className="flex min-h-full flex-col">
        <LocaleProvider initialLocale={locale}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              <SiteHeader />
              <main className="flex-1">{children}</main>
            </TooltipProvider>
            <Toaster richColors position="top-right" />
          </ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
