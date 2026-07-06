"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const menuVariants = cva("", {
  variants: {
    direction: {
      vertical: "flex flex-col",
      horizontal: "flex flex-row",
    },
    size: {
      default: "",
      sm: "",
      lg: "",
    },
  },
  defaultVariants: { direction: "vertical", size: "default" },
});

const menuItemVariants = cva(
  "relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  {
    variants: {
      active: {
        true: "bg-accent text-accent-foreground",
        false: "hover:bg-accent hover:text-accent-foreground",
      },
      variant: {
        default: "",
        destructive:
          "text-destructive hover:bg-destructive/10 focus:bg-destructive/10",
      },
    },
    defaultVariants: { active: false, variant: "default" },
  },
);

interface MenuItem {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  shortcut?: string | string[];
  children?: MenuItem[];
}

interface MenuProps
  extends React.ComponentProps<"div">, VariantProps<typeof menuVariants> {
  items: MenuItem[];
  onSelect?: (key: string) => void;
  selectedKeys?: string[];
  /** Mode: "inline" shows children indented, "popup" shows them in a submenu on hover */
  mode?: "inline" | "popup";
}

function Menu({
  className,
  direction,
  size,
  items,
  onSelect,
  selectedKeys = [],
  mode = "inline",
  ...props
}: MenuProps) {
  const renderItems = (
    menuItems: MenuItem[],
    level: number,
  ): React.ReactNode => {
    return menuItems.map((item) => {
      const isSelected = selectedKeys.includes(item.key);
      const hasChildren = item.children && item.children.length > 0;
      const variant = item.danger
        ? ("destructive" as const)
        : ("default" as const);

      return (
        <React.Fragment key={item.key}>
          <div
            data-slot="menu-item"
            role="menuitem"
            data-disabled={item.disabled || undefined}
            aria-disabled={item.disabled}
            className={cn(
              menuItemVariants({ active: isSelected, variant }),
              level > 0 && "pl-6",
            )}
            onClick={() => {
              if (!item.disabled) onSelect?.(item.key);
            }}
          >
            {item.icon && (
              <span data-slot="menu-item-icon" className="size-4 shrink-0">
                {item.icon}
              </span>
            )}
            <span className="flex-1">{item.label}</span>
            {item.shortcut && (
              <span className="text-muted-foreground ml-auto text-xs">
                {Array.isArray(item.shortcut)
                  ? item.shortcut.join("+")
                  : item.shortcut}
              </span>
            )}
            {hasChildren && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-auto shrink-0"
                aria-hidden="true"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            )}
          </div>
          {hasChildren && mode === "inline" && (
            <div data-slot="menu-submenu" role="group">
              {renderItems(item.children!, level + 1)}
            </div>
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <nav
      data-slot="menu"
      role="menu"
      className={cn(menuVariants({ direction, size }), className)}
      {...props}
    >
      {renderItems(items, 0)}
    </nav>
  );
}

export { Menu, menuVariants, menuItemVariants };
