import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { ChaosI18nProvider } from "@/lib/i18n/provider";
import { LocaleProvider } from "@/hooks/use-locale";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Chaos UI",
    template: "%s | Chaos UI",
  },
  description:
    "Enterprise-grade React component library for ERP & business systems",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <LocaleProvider>
          <ChaosI18nProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <TooltipProvider>
                <Toaster richColors position="top-right" />
                {children}
              </TooltipProvider>
            </ThemeProvider>
          </ChaosI18nProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
