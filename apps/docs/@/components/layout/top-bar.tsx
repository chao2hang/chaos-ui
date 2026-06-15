"use client"
import * as React from "react"
import { MenuIcon, XIcon, ChevronDownIcon } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export interface TopBarItem {
  label: string
  href: string
  icon?: React.ReactNode
  children?: TopBarItem[]
}

interface TopBarProps extends React.ComponentProps<"header"> {
  logo?: React.ReactNode
  logoHref?: string
  nav?: TopBarItem[]
  actions?: React.ReactNode
  sticky?: boolean
  variant?: "default" | "transparent" | "bordered"
  className?: string
}

export function TopBar({
  logo = "Chaos UI",
  logoHref = "/",
  nav = [],
  actions,
  sticky = true,
  variant = "default",
  className,
  ...props
}: TopBarProps) {
  const [open, setOpen] = React.useState(false)
  const [megaOpen, setMegaOpen] = React.useState<string | null>(null)

  return (
    <header
      data-slot="top-bar"
      data-variant={variant}
      className={cn(
        "z-30 flex h-14 items-center gap-4 px-4",
        sticky && "sticky top-0",
        variant === "bordered" && "border-b",
        variant === "default" && "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80",
        variant === "transparent" && "bg-transparent",
        className
      )}
      {...props}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-9 items-center justify-center rounded-md hover:bg-muted md:hidden"
        aria-label="切换菜单"
      >
        {open ? <XIcon /> : <MenuIcon />}
      </button>
      <Link href={logoHref} className="flex items-center gap-2 font-semibold">
        {logo}
      </Link>
      <nav className="hidden flex-1 items-center gap-1 md:flex">
        {nav.map((item) =>
          item.children?.length ? (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() => setMegaOpen(item.href)}
              onMouseLeave={() => setMegaOpen(null)}
            >
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-expanded={megaOpen === item.href}
              >
                {item.icon}
                {item.label}
                <ChevronDownIcon className="size-3.5" />
              </button>
              {megaOpen === item.href && (
                <div className="absolute left-0 top-full z-50 min-w-48 rounded-md border bg-popover p-1 shadow-md">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          )
        )}
      </nav>
      <div className="ml-auto flex items-center gap-2">{actions}</div>
      {open && (
        <div className="fixed inset-x-0 top-14 z-40 border-b bg-background p-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
            {actions && <div className="mt-2 flex flex-col gap-2 border-t pt-2">{actions}</div>}
          </nav>
        </div>
      )}
    </header>
  )
}

export function MegaMenu({
  trigger,
  groups,
  className,
}: {
  trigger: React.ReactNode
  groups: Array<{ label: string; items: Array<{ label: string; href: string; description?: string; icon?: React.ReactNode }> }>
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
        aria-expanded={open}
      >
        {trigger}
        <ChevronDownIcon className="size-3.5" />
      </button>
      {open && (
        <div
          className={cn(
            "absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2",
            className
          )}
        >
          <div className="grid min-w-96 gap-6 rounded-lg border bg-popover p-6 shadow-lg md:grid-cols-2">
            {groups.map((g) => (
              <div key={g.label} className="space-y-2">
                <h3 className="text-xs font-semibold text-muted-foreground">{g.label}</h3>
                <ul className="space-y-1">
                  {g.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="flex items-start gap-3 rounded-md p-2 hover:bg-accent"
                      >
                        {item.icon && <span className="mt-0.5 text-muted-foreground">{item.icon}</span>}
                        <div className="flex-1">
                          <div className="text-sm font-medium">{item.label}</div>
                          {item.description && (
                            <div className="text-xs text-muted-foreground">{item.description}</div>
                          )}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
