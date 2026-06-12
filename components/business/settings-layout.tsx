import * as React from "react"
import { cn } from "@/lib/utils"

export interface SettingsNavItem {
  key: string
  label: string
  icon?: React.ReactNode
  badge?: string | number
}

export interface SettingsSection {
  key: string
  title: string
  description?: string
  content: React.ReactNode
}

interface SettingsLayoutProps extends React.ComponentProps<"div"> {
  nav: SettingsNavItem[]
  active: string
  onNavChange?: (key: string) => void
  sections: SettingsSection[]
  className?: string
}

export function SettingsLayout({ nav, active, onNavChange, sections, className, ...props }: SettingsLayoutProps) {
  return (
    <div data-slot="settings-layout" className={cn("grid gap-6 md:grid-cols-[240px_1fr]", className)} {...props}>
      <aside className="space-y-1">
        <nav className="sticky top-4 space-y-0.5">
          {nav.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => onNavChange?.(item.key)}
              className={cn(
                "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                active === item.key
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {item.icon}
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge !== undefined && (
                <span className="rounded bg-muted px-1.5 py-0.5 text-[0.65rem]">{item.badge}</span>
              )}
            </button>
          ))}
        </nav>
      </aside>
      <div className="space-y-8">
        {sections.map((section) => (
          <section key={section.key} className="rounded-md border bg-card p-6">
            <header className="mb-4 space-y-1">
              <h2 className="text-lg font-semibold">{section.title}</h2>
              {section.description && (
                <p className="text-sm text-muted-foreground">{section.description}</p>
              )}
            </header>
            {section.content}
          </section>
        ))}
      </div>
    </div>
  )
}
