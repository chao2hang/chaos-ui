import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PublicLayoutProps extends React.ComponentProps<"div"> {
  logo?: React.ReactNode;
  nav?: Array<{ label: string; href: string }>;
  footer?: React.ReactNode;
  headerActions?: React.ReactNode;
  className?: string;
}

/**
 * @component PublicLayout
 * @category layout/admin
 * @since 0.2.0
 * @description Public-facing page layout with sticky header, navigation links, and optional footer, suitable for landing or marketing pages / 面向公众的页面布局，包含固定头部、导航链接和可选页脚，适用于落地页或营销页面
 * @keywords public, layout, landing, header, footer, navigation, marketing
 * @example
 * <PublicLayout logo={<Brand />} nav={[{ label: "Home", href: "/" }]}>
 *   <HeroSection />
 * </PublicLayout>
 */
export function PublicLayout({
  logo,
  nav = [],
  footer,
  headerActions,
  className,
  children,
  ...props
}: PublicLayoutProps) {
  return (
    <div
      data-slot="public-layout"
      className={cn("bg-background flex h-full min-h-0 flex-col", className)}
      {...props}
    >
      <header className="bg-background/95 sticky top-0 z-30 border-b backdrop-blur">
        <div className="container mx-auto flex h-14 items-center justify-between gap-4 px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            {logo ?? "Chaos UI"}
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">{headerActions}</div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      {footer && (
        <footer className="bg-muted/30 text-muted-foreground border-t px-4 py-8 text-sm">
          {footer}
        </footer>
      )}
    </div>
  );
}
