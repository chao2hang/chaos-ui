import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// ─── Typography.Text ───────────────────────────────────────────────

const textVariants = cva("", {
  variants: {
    type: {
      default: "",
      secondary: "text-muted-foreground",
      success: "text-success",
      warning: "text-warning",
      danger: "text-destructive",
      disabled: "text-muted-foreground/50 pointer-events-none",
    },
    strong: {
      true: "font-semibold",
      false: "",
    },
    italic: {
      true: "italic",
      false: "",
    },
    underline: {
      true: "underline underline-offset-4",
      false: "",
    },
    delete: {
      true: "line-through",
      false: "",
    },
    code: {
      true: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
      false: "",
    },
    mark: {
      true: "bg-yellow-200 dark:bg-yellow-800",
      false: "",
    },
    keyboard: {
      true: "inline-flex items-center rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground",
      false: "",
    },
  },
  defaultVariants: {
    type: "default",
    strong: false,
    italic: false,
    underline: false,
    delete: false,
    code: false,
    mark: false,
    keyboard: false,
  },
});

interface TextProps
  extends React.ComponentProps<"span">, VariantProps<typeof textVariants> {}

function Text({
  className,
  type,
  strong,
  italic,
  underline,
  delete: del,
  code,
  mark,
  keyboard,
  children,
  ...props
}: TextProps) {
  let content = children;

  return (
    <span
      data-slot="typography-text"
      className={cn(
        textVariants({
          type,
          strong,
          italic,
          underline,
          delete: del,
          code,
          mark,
          keyboard,
        }),
        className,
      )}
      {...props}
    >
      {content}
    </span>
  );
}

// ─── Typography.Title ──────────────────────────────────────────────

const titleVariants = cva("font-bold tracking-tight", {
  variants: {
    level: {
      1: "text-4xl leading-tight",
      2: "text-3xl leading-tight",
      3: "text-2xl leading-snug",
      4: "text-xl leading-snug",
      5: "text-lg leading-normal",
      6: "text-base leading-normal",
    },
  },
  defaultVariants: { level: 1 },
});

interface TitleProps
  extends React.ComponentProps<"h1">, VariantProps<typeof titleVariants> {}

function Title({ className, level = 1, children, ...props }: TitleProps) {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;

  return (
    <Tag
      data-slot="typography-title"
      className={cn(titleVariants({ level }), className)}
      {...props}
    >
      {children}
    </Tag>
  );
}

// ─── Typography.Paragraph ──────────────────────────────────────────

const paragraphVariants = cva("", {
  variants: {
    size: {
      default: "text-sm leading-relaxed",
      sm: "text-xs leading-relaxed",
      lg: "text-base leading-relaxed",
    },
  },
  defaultVariants: { size: "default" },
});

interface ParagraphProps
  extends React.ComponentProps<"p">, VariantProps<typeof paragraphVariants> {}

function Paragraph({ className, size, children, ...props }: ParagraphProps) {
  return (
    <p
      data-slot="typography-paragraph"
      className={cn(paragraphVariants({ size }), className)}
      {...props}
    >
      {children}
    </p>
  );
}

// ─── Typography.Link ───────────────────────────────────────────────

const linkVariants = cva(
  "inline-flex items-center gap-1 font-medium underline underline-offset-4 transition-colors hover:opacity-80",
  {
    variants: {
      variant: {
        default: "text-primary",
        muted: "text-muted-foreground",
        destructive: "text-destructive",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

interface LinkProps
  extends React.ComponentProps<"a">, VariantProps<typeof linkVariants> {}

function Link({ className, variant, children, ...props }: LinkProps) {
  return (
    <a
      data-slot="typography-link"
      className={cn(linkVariants({ variant }), className)}
      {...props}
    >
      {children}
    </a>
  );
}

// ─── Typography (namespace export) ─────────────────────────────────
// Typography itself is also a renderable root component for Storybook compatibility.

function TypographyRoot({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div data-slot="typography" className={className} {...props}>
      {children}
    </div>
  );
}

const Typography = Object.assign(TypographyRoot, {
  Title,
  Paragraph,
  Text,
  Link,
});

export {
  Typography,
  Title,
  Paragraph,
  Text,
  Link,
  titleVariants,
  textVariants,
  paragraphVariants,
  linkVariants,
};
