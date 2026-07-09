"use client";

import * as React from "react";
import { CopyIcon, CheckIcon } from "@/components/ui/icons";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

export interface CopyButtonProps
  extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  /** Text content to copy to clipboard / 要复制到剪贴板的文本 */
  text: string;
  /** Callback fired after successful copy / 复制成功后的回调 */
  onCopied?: (text: string) => void;
  /** Duration in ms to show the checkmark after copy / 复制后显示勾选图标的持续时间（毫秒） */
  timeout?: number;
  /** Whether to show the copy/check icon / 是否显示复制/勾选图标 */
  icon?: boolean;
}

/**
 * @component CopyButton
 * @category ui/actions
 * @since 0.2.0
 * @description One-click copy-to-clipboard button with a checkmark feedback indicator / 一键复制到剪贴板的按钮，带勾选反馈指示器
 * @keywords copy, clipboard, button, paste, copy-to-clipboard
 * @example
 * <CopyButton text="Hello world" />
 * <CopyButton text="Hello" variant="outline" size="sm">Copy me</CopyButton>
 */
function CopyButton({
  text,
  onCopied,
  timeout = 2000,
  variant = "outline",
  size = "default",
  icon = true,
  className,
  children,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (timerRef.current != null) clearTimeout(timerRef.current);
    };
  }, []);

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      onCopied?.(text);
      if (timerRef.current != null) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), timeout);
    } catch {
      // Fallback for non-secure contexts
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        onCopied?.(text);
        if (timerRef.current != null) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setCopied(false), timeout);
      } catch {
        // ignore
      }
      document.body.removeChild(textarea);
    }
  }, [text, onCopied, timeout]);

  return (
    <button
      type="button"
      data-slot="copy-button"
      className={cn(buttonVariants({ variant, size }), className)}
      onClick={handleCopy}
      {...props}
    >
      {icon && (
        <span data-icon="inline-start" className="shrink-0">
          {copied ? <CheckIcon /> : <CopyIcon />}
        </span>
      )}
      {children ?? (copied ? "Copied!" : "Copy")}
    </button>
  );
}

export { CopyButton };
// CopyButtonProps is exported via the interface declaration above
