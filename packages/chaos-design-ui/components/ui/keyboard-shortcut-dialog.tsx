"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { KeyboardShortcut } from "@/components/ui/keyboard-shortcut";

const keyboardShortcutDialogVariants = cva("", {
  variants: {
    size: {
      default: "",
      sm: "",
      lg: "",
    },
  },
  defaultVariants: { size: "default" },
});

interface ShortcutGroup {
  title: string;
  shortcuts: { keys: string | string[]; description: string }[];
}

interface KeyboardShortcutDialogProps
  extends
    React.ComponentProps<"div">,
    VariantProps<typeof keyboardShortcutDialogVariants> {
  /** Whether the dialog is open */
  open?: boolean;
  /** Called when the dialog should close */
  onClose?: () => void;
  /** Shortcut groups to display */
  groups?: ShortcutGroup[];
}

function KeyboardShortcutDialog({
  className,
  size,
  open = false,
  onClose,
  groups = [],
  ...props
}: KeyboardShortcutDialogProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose?.();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      data-slot="keyboard-shortcut-dialog"
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        keyboardShortcutDialogVariants({ size }),
        className,
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
      {...props}
    >
      <div
        data-slot="keyboard-shortcut-dialog-content"
        className="bg-popover w-full max-w-lg rounded-lg border p-6 shadow-lg"
        role="dialog"
        aria-modal="true"
        aria-label="Keyboard shortcuts"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Keyboard Shortcuts</h2>
          <button
            type="button"
            onClick={onClose}
            className="hover:bg-accent rounded p-1"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="max-h-[60vh] space-y-4 overflow-auto">
          {groups.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              No shortcuts available.
            </p>
          ) : (
            groups.map((group, gi) => (
              <div key={gi}>
                <h3 className="text-muted-foreground mb-2 text-sm font-medium">
                  {group.title}
                </h3>
                <div className="space-y-1.5">
                  {group.shortcuts.map((shortcut, si) => (
                    <div
                      key={si}
                      className="flex items-center justify-between text-sm"
                    >
                      <span>{shortcut.description}</span>
                      <KeyboardShortcut keys={shortcut.keys} size="sm" />
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export { KeyboardShortcutDialog, keyboardShortcutDialogVariants };
