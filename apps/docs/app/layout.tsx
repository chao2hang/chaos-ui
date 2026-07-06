import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

// Use system font stack to avoid build-time Google Fonts fetch failures in sandboxed/CI environments.
// The CSS variables --font-geist-sans and --font-geist-mono are preserved for tailwind theme compatibility.
const fontSansClass =
  "font-[system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,'Helvetica_Neue',Arial,sans-serif]";
const fontMonoClass =
  "font-[ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,'Liberation_Mono','Courier_New',monospace]";

export const metadata: Metadata = {
  title: {
    default: "Chaos UI — Enterprise Component Library",
    template: "%s | Chaos UI",
  },
  description:
    "Chaos UI is an enterprise-grade React 19 + Next.js component library for ERP & business systems. 148+ components, 19 hooks, 5 utility modules. Built with Tailwind CSS 4 and shadcn/ui.",
  keywords: [
    "React",
    "Next.js",
    "component library",
    "ERP",
    "UI components",
    "design system",
    "Tailwind CSS",
    "shadcn/ui",
    "TypeScript",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
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
      </body>
    </html>
  );
}
