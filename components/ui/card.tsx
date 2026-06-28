import * as React from "react"

import { cn } from "@/lib/utils"

function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({
  className,
  size,
  ...props
}: React.ComponentProps<"div"> & {
  /** Explicit size override independent of Card size / 独立于 Card 的尺寸 */
  size?: "sm" | "default"
}) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading leading-snug font-medium",
        size === "sm"
          ? "text-sm"
          : "text-base group-data-[size=sm]/card:text-sm",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({
  className,
  flush,
  ...props
}: React.ComponentProps<"div"> & {
  /** Remove horizontal padding for edge-to-edge content like tables / 内容通栏，去掉水平内边距 */
  flush?: boolean
}) {
  return (
    <div
      data-slot="card-content"
      className={cn(flush ? "" : "px-(--card-spacing)", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl border-t bg-muted/50 p-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

/**
 * CardSection — titled section within a Card.
 * Supports `title` and `actions` props to replace the repeated 3 inline
 * patterns (CardHeader+CardTitle / Tailwind div / Flex+title+Button).
 * Render as a header row when `title` or `actions` is provided;
 * otherwise renders as a plain bordered partition div.
 */
function CardSection({
  className,
  title,
  actions,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  /** Section title text / 区块标题 */
  title?: React.ReactNode
  /** Right-side action area / 右侧操作区 */
  actions?: React.ReactNode
}) {
  return (
    <div
      data-slot="card-section"
      className={cn(
        "border-b border-border last:border-b-0",
        className
      )}
      {...props}
    >
      {title != null || actions != null ? (
        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-sm font-semibold">
            {title}
          </span>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      ) : null}
      {children}
    </div>
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  CardSection,
}
