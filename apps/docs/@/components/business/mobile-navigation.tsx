"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MobileNavigationProps {
  items: {
    label: string;
    href?: string;
    icon?: React.ElementType;
    active?: boolean;
    onClick?: () => void;
  }[];
  className?: string;
}

function MobileNavigation({ items, className }: MobileNavigationProps) {
  return (
    <ScrollArea className={cn("w-full", className)}>
      <div className="flex gap-2 p-2">
        {items.map((item, index) => {
          const content = (
            <>
              {item.icon && <item.icon className="mr-1 size-4" />}
              {item.label}
            </>
          );
          return (
            <Button
              key={index}
              variant={item.active ? "default" : "outline"}
              size="sm"
              className="shrink-0"
              onClick={item.onClick}
              nativeButton={!item.href}
              render={item.href ? <a href={item.href}>{content}</a> : undefined}
            >
              {!item.href ? content : null}
            </Button>
          );
        })}
      </div>
    </ScrollArea>
  );
}

export { MobileNavigation };
export type { MobileNavigationProps };
