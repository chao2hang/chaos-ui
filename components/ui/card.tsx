import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component Card
 * @category ui/shell
 * @since 0.2.0
 * @description A container component with header, content, and footer slots for structured content / 带有标题、内容和底部插槽的结构化容器组件
 * @keywords card, container, panel, shell
 * @example
 * <Card>
 *   <CardHeader><CardTitle>Title</CardTitle></CardHeader>
 *   <CardContent>Content</CardContent>
 * </Card>
 */
function Card({
  className,
  size = "default",
  flush,
  ...props
}: React.ComponentProps<"div"> & {
  size?: "default" | "sm";
  /** Remove padding on CardContent for edge-to-edge tables / 内容通栏 */
  flush?: boolean;
}) {
  return (
    <div
      data-slot="card"
      data-size={size}
      {...(flush ? { "data-flush": "" } : {})}
      className={cn(
        "group/card bg-card text-card-foreground ring-foreground/10 flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl py-(--card-spacing) text-sm ring-1 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        className,
      )}
      {...props}
    />
  );
}

/**
 * @component CardHeader
 * @category ui/shell
 * @since 0.2.0
 * @description Top section of a Card, typically containing title, description, and actions / 卡片顶部区域，通常包含标题、描述和操作按钮
 * @keywords card, header, title
 * @example
 * <CardHeader>
 *   <CardTitle>Title</CardTitle>
 *   <CardDescription>Description text</CardDescription>
 * </CardHeader>
 */
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
        className,
      )}
      {...props}
    />
  );
}

/**
 * @component CardTitle
 * @category ui/shell
 * @since 0.2.0
 * @description The heading text inside a CardHeader / 卡片标题文字
 * @keywords card, title, heading
 * @example
 * <CardTitle>Section Title</CardTitle>
 */
function CardTitle({
  className,
  size,
  ...props
}: React.ComponentProps<"div"> & {
  /** Explicit size override independent of Card size / 独立于 Card 的尺寸 */
  size?: "sm" | "default";
}) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading leading-snug font-medium",
        size === "sm"
          ? "text-sm"
          : "text-base group-data-[size=sm]/card:text-sm",
        className,
      )}
      {...props}
    />
  );
}

/**
 * @component CardDescription
 * @category ui/shell
 * @since 0.2.0
 * @description Supplementary text below the CardTitle / 卡片标题下方的补充说明文字
 * @keywords card, description, subtitle
 * @example
 * <CardDescription>Additional context about this card.</CardDescription>
 */
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

/**
 * @component CardAction
 * @category ui/shell
 * @since 0.2.0
 * @description An action area placed in the top-right corner of a CardHeader / 卡片头部右上角的操作区域
 * @keywords card, action, button, header
 * @example
 * <CardAction>
 *   <Button size="sm">Action</Button>
 * </CardAction>
 */
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

/**
 * @component CardContent
 * @category ui/shell
 * @since 0.2.0
 * @description The main body area of a Card, with optional flush padding for edge-to-edge content / 卡片主体内容区，支持通栏模式
 * @keywords card, content, body
 * @example
 * <CardContent>Main card content goes here.</CardContent>
 */
function CardContent({
  className,
  flush,
  ...props
}: React.ComponentProps<"div"> & {
  /** Remove horizontal padding for edge-to-edge content like tables / 内容通栏，去掉水平内边距 */
  flush?: boolean;
}) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        flush ? "" : "px-(--card-spacing)",
        // When parent Card has flush, also remove padding via group variant
        "group-data-[flush]/card:px-0",
        className,
      )}
      {...props}
    />
  );
}

/**
 * @component CardFooter
 * @category ui/shell
 * @since 0.2.0
 * @description Bottom section of a Card, typically for action buttons or summary / 卡片底部区域，通常放置操作按钮或摘要信息
 * @keywords card, footer, actions
 * @example
 * <CardFooter>
 *   <Button>Save</Button>
 * </CardFooter>
 */
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "bg-muted/50 flex items-center rounded-b-xl border-t p-(--card-spacing)",
        className,
      )}
      {...props}
    />
  );
}

/**
 * @component CardSection
 * @category ui/shell
 * @since 0.2.0
 * @description Titled section within a Card with optional header actions / 卡片中的带标题分区，支持可选的头部操作按钮
 * @keywords card, section, divider, partition
 * @example
 * <CardSection title="Details" actions={<Button size="sm">Edit</Button>}>
 *   Content here
 * </CardSection>
 *
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
  title?: React.ReactNode;
  /** Right-side action area / 右侧操作区 */
  actions?: React.ReactNode;
}) {
  return (
    <div
      data-slot="card-section"
      className={cn("border-border border-b last:border-b-0", className)}
      {...props}
    >
      {title != null || actions != null ? (
        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-sm font-semibold">{title}</span>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      ) : null}
      {children}
    </div>
  );
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
};
