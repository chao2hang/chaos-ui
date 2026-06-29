import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component Divider
 * @category ui/primitives
 * @since 0.2.0
 * @description 分隔线组件 / Divider component with optional text
 * @keywords divider, separator, line
 * @example
 * <Divider>Text</Divider>
 * <Divider orientation="left">Left Text</Divider>
 * <Divider type="vertical" />
 */

interface DividerProps extends React.ComponentProps<"div"> {
  /** Orientation of the text / 文本位置 */
  orientation?: "left" | "center" | "right";
  /** Divider type / 分隔线类型 */
  type?: "horizontal" | "vertical";
  /** Whether to use dashed style / 是否使用虚线 */
  dashed?: boolean;
  /** Whether the divider is plain (no text styling) / 是否为纯文本 */
  plain?: boolean;
}

function Divider({
  className,
  orientation = "center",
  type = "horizontal",
  dashed = false,
  plain = false,
  children,
  ...props
}: DividerProps) {
  if (type === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        data-slot="divider"
        data-type="vertical"
        className={cn(
          "inline-flex h-full w-px shrink-0 self-stretch bg-border",
          dashed && "border-l border-dashed bg-transparent",
          className,
        )}
        {...props}
      />
    );
  }

  if (!children) {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        data-slot="divider"
        data-type="horizontal"
        className={cn(
          "h-px w-full bg-border",
          dashed && "border-t border-dashed bg-transparent",
          className,
        )}
        {...props}
      />
    );
  }

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      data-slot="divider"
      data-type="horizontal"
      className={cn(
        "flex w-full items-center",
        orientation === "left" && "justify-start",
        orientation === "center" && "justify-center",
        orientation === "right" && "justify-end",
        className,
      )}
      {...props}
    >
      {(orientation === "left" || orientation === "center") && (
        <div
          className={cn(
            "h-px flex-1 bg-border",
            dashed && "border-t border-dashed bg-transparent",
            orientation === "center" && "max-w-[50%]",
          )}
        />
      )}
      <span
        className={cn(
          "shrink-0 px-3 text-sm text-muted-foreground",
          plain && "text-muted-foreground/80",
        )}
      >
        {children}
      </span>
      <div
        className={cn(
          "h-px flex-1 bg-border",
          dashed && "border-t border-dashed bg-transparent",
        )}
      />
    </div>
  );
}

export { Divider };
export type { DividerProps };
