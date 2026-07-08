import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRightIcon } from "lucide-react";

export interface SettingsNavItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

export interface SettingsNavSubGroup {
  key: string;
  label: string;
  icon?: React.ReactNode;
  children: SettingsNavItem[];
  defaultOpen?: boolean;
}

export interface SettingsNavGroup {
  key: string;
  label: string;
  icon?: React.ReactNode;
  children: (SettingsNavItem | SettingsNavSubGroup)[];
  defaultOpen?: boolean;
}

export type SettingsNavEntry = SettingsNavItem | SettingsNavGroup;

export function isNavGroup(entry: SettingsNavEntry): entry is SettingsNavGroup {
  return "children" in entry;
}

export function isNavSubGroup(
  entry: SettingsNavItem | SettingsNavSubGroup,
): entry is SettingsNavSubGroup {
  return "children" in entry;
}

export interface SettingsSection {
  key: string;
  title: string;
  description?: string;
  content: React.ReactNode;
}

interface SettingsLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  nav: SettingsNavEntry[];
  active: string;
  onNavChange?: (key: string) => void;
  sections: SettingsSection[];
  className?: string;
}

function NavItem({
  item,
  active,
  onNavChange,
}: {
  item: SettingsNavItem;
  active: string;
  onNavChange?: (key: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onNavChange?.(item.key)}
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
        active === item.key
          ? "bg-primary/10 text-primary font-medium"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      {item.icon}
      <span className="flex-1 text-left">{item.label}</span>
      {item.badge !== undefined && (
        <span className="bg-muted rounded px-1.5 py-0.5 text-[0.65rem]">
          {item.badge}
        </span>
      )}
    </button>
  );
}

function NavSubGroup({
  group,
  active,
  onNavChange,
}: {
  group: SettingsNavSubGroup;
  active: string;
  onNavChange?: (key: string) => void;
}) {
  const hasActive = group.children.some((c) => c.key === active);
  const [open, setOpen] = React.useState(group.defaultOpen ?? hasActive);
  React.useEffect(() => {
    if (hasActive) setOpen(true);
  }, [hasActive]);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="text-muted-foreground hover:bg-muted hover:text-foreground flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors">
        {group.icon}
        <span className="flex-1 text-left">{group.label}</span>
        <ChevronRightIcon
          className={cn(
            "size-4 shrink-0 transition-transform duration-200",
            open && "rotate-90",
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="border-border mt-0.5 ml-4 space-y-0.5 border-l pl-2">
          {group.children.map((item) => (
            <NavItem
              key={item.key}
              item={item}
              active={active}
              onNavChange={onNavChange}
            />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function NavGroup({
  group,
  active,
  onNavChange,
}: {
  group: SettingsNavGroup;
  active: string;
  onNavChange?: (key: string) => void;
}) {
  const hasActive = group.children.some((c) =>
    isNavSubGroup(c)
      ? c.children.some((gc) => gc.key === active)
      : c.key === active,
  );
  const [open, setOpen] = React.useState(group.defaultOpen ?? hasActive);
  React.useEffect(() => {
    if (hasActive) setOpen(true);
  }, [hasActive]);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="text-foreground hover:bg-muted flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors">
        {group.icon}
        <span className="flex-1 text-left">{group.label}</span>
        <ChevronRightIcon
          className={cn(
            "size-4 shrink-0 transition-transform duration-200",
            open && "rotate-90",
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="border-border mt-0.5 ml-3 space-y-0.5 border-l pl-2">
          {group.children.map((child) =>
            isNavSubGroup(child) ? (
              <NavSubGroup
                key={child.key}
                group={child}
                active={active}
                onNavChange={onNavChange}
              />
            ) : (
              <NavItem
                key={child.key}
                item={child}
                active={active}
                onNavChange={onNavChange}
              />
            ),
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function SettingsLayout({
  nav,
  active,
  onNavChange,
  sections,
  className,
  ...props
}: SettingsLayoutProps) {
  return (
    <div
      data-slot="settings-layout"
      className={cn("grid gap-6 md:grid-cols-[240px_1fr]", className)}
      {...props}
    >
      <aside className="space-y-1">
        <nav className="sticky top-4 space-y-0.5">
          {nav.map((entry) =>
            isNavGroup(entry) ? (
              <NavGroup
                key={entry.key}
                group={entry}
                active={active}
                onNavChange={onNavChange}
              />
            ) : (
              <NavItem
                key={entry.key}
                item={entry}
                active={active}
                onNavChange={onNavChange}
              />
            ),
          )}
        </nav>
      </aside>
      <div className="space-y-8">
        {sections.map((section) => (
          <section key={section.key} className="bg-card rounded-md border p-6">
            <header className="mb-4 space-y-1">
              <h2 className="text-lg font-semibold">{section.title}</h2>
              {section.description && (
                <p className="text-muted-foreground text-sm">
                  {section.description}
                </p>
              )}
            </header>
            {section.content}
          </section>
        ))}
      </div>
    </div>
  );
}
