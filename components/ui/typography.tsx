import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component Typography
 * @category ui/primitives
 * @since 0.2.0
 * @description 排版组件族 / Typography component suite (Heading, Text, Paragraph, etc.)
 * @keywords typography, text, heading, title, paragraph, code, blockquote
 * @example
 * <Typography.H1>Title</Typography.H1>
 * <Typography.Text muted>Muted text</Typography.Text>
 * <Typography.Paragraph>Body text</Typography.Paragraph>
 */

const headingLevels = [1, 2, 3, 4, 5, 6] as const;
type HeadingLevel = (typeof headingLevels)[number];

const headingSizeMap: Record<HeadingLevel, string> = {
  1: "text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl",
  2: "text-2xl font-semibold tracking-tight md:text-3xl",
  3: "text-xl font-semibold tracking-tight md:text-2xl",
  4: "text-lg font-semibold md:text-xl",
  5: "text-base font-semibold md:text-lg",
  6: "text-sm font-semibold md:text-base",
};

function createHeading(level: HeadingLevel) {
  const Tag = `h${level}` as React.ElementType;
  const Heading = React.forwardRef<
    HTMLHeadingElement,
    React.ComponentProps<"h1">
  >(({ className, ...props }, ref) => (
    <Tag
      ref={ref}
      data-slot={`h${level}`}
      className={cn(headingSizeMap[level], className)}
      {...props}
    />
  ));
  Heading.displayName = `Typography.H${level}`;
  return Heading;
}

const H1 = createHeading(1);
const H2 = createHeading(2);
const H3 = createHeading(3);
const H4 = createHeading(4);
const H5 = createHeading(5);
const H6 = createHeading(6);

interface TextProps extends React.ComponentProps<"span"> {
  /** Text size / 文本大小 */
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl";
  /** Text weight / 文本粗细 */
  weight?: "normal" | "medium" | "semibold" | "bold";
  /** Text color variant / 文本颜色 */
  variant?: "default" | "muted" | "primary" | "secondary" | "destructive" | "success" | "warning";
  /** Whether text is italic / 是否斜体 */
  italic?: boolean;
  /** Whether text is underlined / 是否下划线 */
  underline?: boolean;
  /** Whether text is strikethrough / 是否删除线 */
  strike?: boolean;
  /** Whether text is truncated / 是否截断 */
  truncate?: boolean;
}

const textSizeMap: Record<string, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
};

const textWeightMap: Record<string, string> = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const textVariantMap: Record<string, string> = {
  default: "text-foreground",
  muted: "text-muted-foreground",
  primary: "text-primary",
  secondary: "text-secondary-foreground",
  destructive: "text-destructive",
  success: "text-emerald-600 dark:text-emerald-400",
  warning: "text-amber-600 dark:text-amber-400",
};

function Text({
  className,
  size = "base",
  weight = "normal",
  variant = "default",
  italic = false,
  underline = false,
  strike = false,
  truncate = false,
  ...props
}: TextProps) {
  return (
    <span
      data-slot="text"
      className={cn(
        textSizeMap[size],
        textWeightMap[weight],
        textVariantMap[variant],
        italic && "italic",
        underline && "underline underline-offset-4",
        strike && "line-through",
        truncate && "truncate",
        className,
      )}
      {...props}
    />
  );
}

interface ParagraphProps extends React.ComponentProps<"p"> {
  /** Whether text is muted / 是否为静默文本 */
  muted?: boolean;
  /** Whether text is truncated / 是否截断 */
  truncate?: boolean;
  /** Whether to allow select-all on triple click / 是否允许三击全选 */
  lead?: boolean;
}

function Paragraph({
  className,
  muted = false,
  truncate = false,
  lead = false,
  ...props
}: ParagraphProps) {
  return (
    <p
      data-slot="paragraph"
      className={cn(
        "text-base leading-relaxed",
        muted && "text-muted-foreground",
        lead && "text-lg text-muted-foreground",
        truncate && "truncate",
        className,
      )}
      {...props}
    />
  );
}

function Blockquote({
  className,
  ...props
}: React.ComponentProps<"blockquote">) {
  return (
    <blockquote
      data-slot="blockquote"
      className={cn(
        "border-l-4 border-primary pl-4 italic text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

function InlineCode({ className, ...props }: React.ComponentProps<"code">) {
  return (
    <code
      data-slot="code"
      className={cn(
        "rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground",
        className,
      )}
      {...props}
    />
  );
}

function Lead({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="lead"
      className={cn(
        "text-xl text-muted-foreground leading-relaxed",
        className,
      )}
      {...props}
    />
  );
}

function Large({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="large"
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  );
}

function Small({ className, ...props }: React.ComponentProps<"small">) {
  return (
    <small
      data-slot="small"
      className={cn("text-sm font-medium leading-none", className)}
      {...props}
    />
  );
}

function Muted({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="muted"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function List({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="list"
      className={cn(
        "ml-6 list-disc [&>li]:mt-2 [&>li]:leading-relaxed",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Typography — namespace aggregating all typography primitives (H1–H6, Text,
 * Paragraph, Blockquote, InlineCode, ...). Public API; also re-exported as
 * individual named components.
 */
const Typography = {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Text,
  Paragraph,
  Blockquote,
  InlineCode,
  Lead,
  Large,
  Small,
  Muted,
  List,
};

export {
  Typography,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Text,
  Paragraph,
  Blockquote,
  InlineCode,
  Lead,
  Large,
  Small,
  Muted,
  List,
};
export type { TextProps, ParagraphProps };
