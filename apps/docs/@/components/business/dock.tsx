"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface DockItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  badge?: number | string;
  active?: boolean;
}

interface DockProps extends React.HTMLAttributes<HTMLDivElement> {
  items: DockItem[];
  orientation?: "horizontal" | "vertical";
  magnification?: boolean;
  className?: string;
}

export function Dock({
  items,
  orientation = "horizontal",
  magnification = true,
  className,
  ...props
}: DockProps) {
  const [hoverIndex, setHoverIndex] = React.useState<number>(-1);

  return (
    <TooltipProvider delay={200}>
      <div
        data-slot="dock"
        data-orientation={orientation}
        onMouseLeave={() => setHoverIndex(-1)}
        className={cn(
          // Base layout
          "flex items-center gap-1.5",
          "rounded-2xl",
          // Glassmorphism background
          "bg-white/70 dark:bg-black/60",
          "backdrop-blur-xl",
          // Subtle border with glow
          "border border-white/20 dark:border-white/10",
          "shadow-[0_8px_32px_-4px_rgba(0,0,0,0.12),0_2px_8px_-2px_rgba(0,0,0,0.08),inset_0_1px_0_0_rgba(255,255,255,0.4)]",
          "dark:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.5),0_2px_8px_-2px_rgba(0,0,0,0.3),inset_0_1px_0_0_rgba(255,255,255,0.08)]",
          // Padding
          "p-2",
          // Orientation
          orientation === "vertical" && "flex-col",
          className,
        )}
        {...props}
      >
        {items.map((item, index) => (
          <DockButton
            key={item.key}
            item={item}
            index={index}
            hoverIndex={hoverIndex}
            onHover={setHoverIndex}
            magnification={magnification}
            orientation={orientation}
          />
        ))}
      </div>
    </TooltipProvider>
  );
}

function computeScale(index: number, hoverIndex: number): number {
  if (hoverIndex < 0) return 1;
  const distance = Math.abs(index - hoverIndex);
  if (distance > 2) return 1;
  if (distance === 0) return 1.35;
  if (distance === 1) return 1.2;
  return 1.08;
}

function DockButton({
  item,
  index,
  hoverIndex,
  onHover,
  magnification,
  orientation,
}: {
  item: DockItem;
  index: number;
  hoverIndex: number;
  onHover: (i: number) => void;
  magnification: boolean;
  orientation: "horizontal" | "vertical";
}) {
  const scale = magnification ? computeScale(index, hoverIndex) : 1;
  const isHovered = hoverIndex === index;

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <button
            type="button"
            onClick={item.onClick}
            onMouseEnter={() => onHover(index)}
            onFocus={() => onHover(index)}
            onBlur={() => onHover(-1)}
            aria-label={item.label}
            data-slot="dock-item"
            data-active={item.active || undefined}
            className={cn(
              // Base button styles
              "group relative flex size-11 items-center justify-center rounded-xl",
              "transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
              // Default state
              "text-muted-foreground/80",
              // Hover state - subtle background lift
              "hover:bg-black/[0.04] dark:hover:bg-white/[0.06]",
              "hover:text-foreground",
              // Focus state
              "focus-visible:ring-brand-400/50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none",
              // Active state - gradient background with glow
              "data-[active]:from-brand-500/15 data-[active]:to-brand-600/10 data-[active]:bg-gradient-to-br",
              "data-[active]:text-brand-600 dark:data-[active]:text-brand-400",
              "data-[active]:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_0_20px_-4px_rgba(59,130,246,0.3)]",
              "dark:data-[active]:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_0_20px_-4px_rgba(96,165,250,0.25)]",
              // Active hover
              "data-[active]:hover:from-brand-500/20 data-[active]:hover:to-brand-600/15",
            )}
          >
            {/* Icon container with scale transform */}
            <span
              className={cn(
                "flex items-center justify-center",
                "transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                "origin-center",
              )}
              style={{ transform: `scale(${scale})` }}
              aria-hidden="true"
            >
              {item.icon}
            </span>

            {/* Badge */}
            {item.badge !== undefined && item.badge !== 0 && (
              <span
                data-slot="dock-badge"
                className={cn(
                  "absolute -top-0.5 -right-0.5",
                  "flex h-[18px] min-w-[18px] items-center justify-center",
                  "rounded-full px-1.5",
                  "bg-gradient-to-br from-red-500 to-red-600",
                  "text-[10px] font-bold text-white",
                  "shadow-[0_2px_8px_-2px_rgba(239,68,68,0.5)]",
                  "border border-white/20 dark:border-white/10",
                  "transition-transform duration-300",
                  isHovered && "scale-110",
                )}
              >
                {item.badge}
              </span>
            )}

            {/* Active indicator dot */}
            {item.active && (
              <span
                data-slot="dock-indicator"
                aria-hidden="true"
                className={cn(
                  "absolute rounded-full",
                  "bg-brand-500 dark:bg-brand-400",
                  "shadow-[0_0_8px_2px_rgba(59,130,246,0.5)]",
                  "dark:shadow-[0_0_8px_2px_rgba(96,165,250,0.4)]",
                  "transition-all duration-300",
                  orientation === "horizontal"
                    ? "-bottom-1 left-1/2 h-[3px] w-5 -translate-x-1/2"
                    : "top-1/2 -right-1 h-5 w-[3px] -translate-y-1/2",
                )}
              />
            )}

            {/* Hover glow effect (subtle) */}
            {isHovered && !item.active && (
              <span
                className={cn(
                  "absolute inset-0 rounded-xl",
                  "from-brand-400/5 bg-gradient-to-br to-transparent",
                  "pointer-events-none",
                )}
                aria-hidden="true"
              />
            )}
          </button>
        }
      />
      <TooltipContent
        side={orientation === "horizontal" ? "top" : "right"}
        sideOffset={10}
      >
        {item.label}
      </TooltipContent>
    </Tooltip>
  );
}
