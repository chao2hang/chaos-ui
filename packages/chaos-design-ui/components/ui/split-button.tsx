"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const splitButtonVariants = cva("inline-flex isolate", {
  variants: {
    size: {
      default: "",
      sm: "",
      lg: "",
    },
    variant: {
      default: "",
      outline: "",
      ghost: "",
    },
  },
  defaultVariants: { size: "default", variant: "default" },
});

const buttonBaseVariants = cva(
  "inline-flex items-center justify-center gap-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-6",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

interface SplitButtonItem {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
}

interface SplitButtonProps
  extends
    Omit<React.ComponentProps<"div">, "onClick">,
    VariantProps<typeof splitButtonVariants> {
  /** Main button label */
  label: React.ReactNode;
  /** Main button click handler */
  onClick?: () => void;
  /** Dropdown menu items */
  items?: SplitButtonItem[];
  /** Called when a dropdown item is selected */
  onSelect?: (key: string) => void;
  disabled?: boolean;
}

function SplitButton({
  className,
  size = "default",
  variant = "default",
  label,
  onClick,
  items = [],
  onSelect,
  disabled,
  ...props
}: SplitButtonProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      data-slot="split-button"
      className={cn(splitButtonVariants({ size, variant }), className)}
      {...props}
    >
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={cn(
          buttonBaseVariants({ variant, size }),
          "rounded-l-md rounded-r-none",
          items.length > 0 && "border-primary-foreground/20 border-r",
        )}
      >
        {label}
      </button>
      {items.length > 0 && (
        <>
          <button
            type="button"
            disabled={disabled}
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              buttonBaseVariants({ variant, size }),
              "rounded-l-none rounded-r-md px-2",
            )}
            aria-expanded={isOpen}
            aria-haspopup="menu"
            aria-label="More options"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          {isOpen && (
            <div className="bg-popover absolute top-full right-0 z-50 mt-1 min-w-[160px] rounded-md border p-1 shadow-md">
              <ul role="menu">
                {items.map((item) => (
                  <li
                    key={item.key}
                    role="menuitem"
                    aria-disabled={item.disabled}
                    className={cn(
                      "hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none",
                      item.disabled && "pointer-events-none opacity-50",
                      item.danger && "text-destructive hover:bg-destructive/10",
                    )}
                    onClick={() => {
                      if (!item.disabled) {
                        onSelect?.(item.key);
                        setIsOpen(false);
                      }
                    }}
                  >
                    {item.icon && (
                      <span className="size-4 shrink-0">{item.icon}</span>
                    )}
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export { SplitButton, splitButtonVariants };
