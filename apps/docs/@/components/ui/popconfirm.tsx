"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const popconfirmVariants = cva(
  "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none",
  {
    variants: {
      align: {
        center: "",
        start: "",
        end: "",
      },
      side: {
        top: "mb-2",
        bottom: "mt-2",
        left: "mr-2",
        right: "ml-2",
      },
    },
    defaultVariants: { side: "top" },
  },
);

interface PopconfirmProps
  extends React.ComponentProps<"div">, VariantProps<typeof popconfirmVariants> {
  /** Whether the popconfirm is open */
  open?: boolean;
  /** Called when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Title text */
  title: React.ReactNode;
  /** Description text */
  description?: React.ReactNode;
  /** Text for confirm button */
  confirmText?: string;
  /** Text for cancel button */
  cancelText?: string;
  /** Called when confirmed */
  onConfirm?: () => void;
  /** Called when cancelled */
  onCancel?: () => void;
  /** The trigger element */
  children: React.ReactNode;
}

function Popconfirm({
  className,
  open: controlledOpen,
  onOpenChange,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  side = "top",
  children,
  ...props
}: PopconfirmProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isOpen = controlledOpen ?? internalOpen;
  const ref = React.useRef<HTMLDivElement>(null);

  const setOpen = (value: boolean) => {
    if (controlledOpen === undefined) setInternalOpen(value);
    onOpenChange?.(value);
  };

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleConfirm = () => {
    onConfirm?.();
    setOpen(false);
  };

  const handleCancel = () => {
    onCancel?.();
    setOpen(false);
  };

  return (
    <div
      ref={ref}
      data-slot="popconfirm"
      className={cn("relative inline-block", className)}
    >
      <span onClick={() => setOpen(!isOpen)} className="cursor-pointer">
        {children}
      </span>

      {isOpen && (
        <div
          data-slot="popconfirm-content"
          className={cn(
            "absolute",
            popconfirmVariants({ side }),
            side === "top" && "bottom-full left-1/2 -translate-x-1/2",
            side === "bottom" && "top-full left-1/2 -translate-x-1/2",
            side === "left" && "top-1/2 right-full -translate-y-1/2",
            side === "right" && "top-1/2 left-full -translate-y-1/2",
          )}
          {...props}
        >
          <div className="flex items-start gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-warning mt-0.5 shrink-0"
              aria-hidden="true"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <line x1="12" x2="12" y1="9" y2="13" />
              <line x1="12" x2="12.01" y1="17" y2="17" />
            </svg>
            <div className="flex-1">
              <div className="text-sm font-medium">{title}</div>
              {description && (
                <div className="text-muted-foreground mt-1 text-sm">
                  {description}
                </div>
              )}
            </div>
          </div>
          <div className="mt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="border-input hover:bg-accent hover:text-accent-foreground inline-flex h-8 items-center rounded-md border bg-transparent px-3 text-xs"
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-8 items-center rounded-md px-3 text-xs"
            >
              {confirmText}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export { Popconfirm, popconfirmVariants };
