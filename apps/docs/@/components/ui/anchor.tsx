"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * @component Anchor
 * @category ui/navigation
 * @since 0.5.0
 * @description Anchor navigation for long pages (docs, forms).
 * Scrolls to target section and highlights the active anchor.
 * @example
 * <Anchor
 *   items={[
 *     { key: "basic", href: "#basic", label: "Basic Info" },
 *     { key: "detail", href: "#detail", label: "Details" },
 *   ]}
 * />
 */

interface AnchorItem {
  key: string;
  href: string;
  label: React.ReactNode;
  level?: number;
}

interface AnchorProps extends Omit<React.ComponentProps<"nav">, "onChange"> {
  items: AnchorItem[];
  activeKey?: string;
  onActiveChange?: (key: string) => void;
  offsetTop?: number;
  getContainer?: () => HTMLElement | Window;
}

function Anchor({
  items,
  activeKey: controlledActiveKey,
  onActiveChange,
  offsetTop = 80,
  getContainer,
  className,
  ...props
}: AnchorProps) {
  const [internalActiveKey, setInternalActiveKey] = React.useState<string>(
    items[0]?.key ?? "",
  );
  const activeKey = controlledActiveKey ?? internalActiveKey;
  const containerRef = React.useRef<HTMLElement | Window | null>(null);
  // Hold latest activeKey + onActiveChange in refs so the scroll handler effect
  // doesn't depend on them — otherwise an unmemoized onActiveChange or each
  // activeKey change re-binds the scroll listener every scroll event (storm).
  const activeKeyRef = React.useRef(activeKey);
  activeKeyRef.current = activeKey;
  const onActiveChangeRef = React.useRef(onActiveChange);
  onActiveChangeRef.current = onActiveChange;

  React.useEffect(() => {
    containerRef.current = getContainer?.() ?? window;
  }, [getContainer]);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        if (!item) continue;
        const el = document.querySelector(item.href) as HTMLElement | null;
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offsetTop) {
            if (item.key !== activeKeyRef.current) {
              setInternalActiveKey(item.key);
              onActiveChangeRef.current?.(item.key);
            }
            return;
          }
        }
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
    // Only re-bind when items/offsetTop/getContainer change — not on activeKey
    // or onActiveChange (held in refs).
  }, [items, offsetTop, getContainer]);

  const handleClick = (item: AnchorItem) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector(item.href) as HTMLElement | null;
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setInternalActiveKey(item.key);
      onActiveChange?.(item.key);
      window.history.replaceState(null, "", item.href);
    }
  };

  return (
    <nav
      data-slot="anchor"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    >
      {items.map((item) => (
        <a
          key={item.key}
          href={item.href}
          onClick={handleClick(item)}
          className={cn(
            "block rounded-md px-3 py-1.5 text-sm transition-colors",
            item.level === 2 && "pl-6",
            item.level === 3 && "pl-9",
            item.key === activeKey
              ? "bg-muted font-medium text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

export { Anchor };
export type { AnchorItem, AnchorProps };
