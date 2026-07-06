"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AdminTabItem {
  key: string;
  label: string;
}

interface AdminTabsProps extends React.ComponentProps<"div"> {
  items: AdminTabItem[];
  activeKey?: string;
  defaultActiveKey?: string;
  onChange?: (key: string) => void;
}

export function AdminTabs({
  items,
  activeKey: controlledActiveKey,
  defaultActiveKey,
  onChange,
  className,
  ...props
}: AdminTabsProps) {
  const [internalActiveKey, setInternalActiveKey] = React.useState(
    defaultActiveKey ?? items[0]?.key ?? "",
  );

  const activeKey = controlledActiveKey ?? internalActiveKey;

  const handleChange = React.useCallback(
    (key: string) => {
      if (!controlledActiveKey) {
        setInternalActiveKey(key);
      }
      onChange?.(key);
    },
    [controlledActiveKey, onChange],
  );

  return (
    <div
      data-slot="admin-tabs"
      className={cn("flex items-center gap-0 border-b", className)}
      role="tablist"
      {...props}
    >
      {items.map((item) => (
        <button
          key={item.key}
          type="button"
          role="tab"
          aria-selected={activeKey === item.key}
          onClick={() => handleChange(item.key)}
          className={cn(
            "relative px-4 py-2.5 text-sm font-medium transition-colors",
            "after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:rounded-full after:transition-colors",
            activeKey === item.key
              ? "text-primary after:bg-primary"
              : "text-muted-foreground hover:text-foreground after:bg-transparent",
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
