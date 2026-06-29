import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface PublicLayoutProps extends React.ComponentProps<"div"> {
  logo?: React.ReactNode
  nav?: Array<{ label: string; href: string }>
  footer?: React.ReactNode
  headerActions?: React.ReactNode
  className?: string
}

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
      className={cn("flex min-h-screen flex-col bg-background", className)}
      {...props}
    >
      <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-14 items-center justify-between gap-4 px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            {logo ?? "Chaos UI"}
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
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
        <footer className="border-t bg-muted/30 px-4 py-8 text-sm text-muted-foreground">
          {footer}
        </footer>
      )}
    </div>
  )
}
