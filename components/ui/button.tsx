import * as React from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    /** Leading icon, rendered before children / 前置图标 */
    icon?: React.ReactNode;
    /** Trailing icon, rendered after children / 后置图标 */
    iconRight?: React.ReactNode;
    /** Show loading spinner and disable the button / 显示加载并禁用 */
    loading?: boolean;
  };

/**
 * @component Button
 * @category ui/primitives
 * @since 0.2.0
 * @description Interactive button with multiple variants, sizes, icons, and loading state / 交互按钮，支持多种变体、尺寸、图标与加载态
 * @keywords button, action, submit, click, icon, loading
 * @example
 * <Button variant="default" size="default">Click me</Button>
 * <Button variant="outline" icon={<SettingsIcon />}>Settings</Button>
 * <Button loading>Saving…</Button>
 */
function Button({
  className,
  variant = "default",
  size = "default",
  icon,
  iconRight,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const leadingIcon = loading ? (
    <Spinner size="sm" color="current" label="Loading" className="size-[1em]" />
  ) : (
    icon
  );
  const hasIcon = leadingIcon != null || iconRight != null;

  const computedClassName = React.useMemo(
    () => cn(buttonVariants({ variant, size, className })),
    [variant, size, className],
  );

  return (
    <ButtonPrimitive
      data-slot="button"
      data-loading={loading || undefined}
      className={computedClassName}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {hasIcon ? (
        <>
          {leadingIcon != null && (
            <span data-icon="inline-start" className="shrink-0">
              {leadingIcon}
            </span>
          )}
          {children}
          {iconRight != null && !loading && (
            <span data-icon="inline-end" className="shrink-0">
              {iconRight}
            </span>
          )}
        </>
      ) : (
        children
      )}
    </ButtonPrimitive>
  );
}

export { Button, buttonVariants };

const MemoizedButton = React.memo(Button);
export { MemoizedButton as ButtonMemo };
