"use client";

import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";
import { Button } from "@chaos_team/chaos-ui/ui";
import { SignatureIcon, CheckIcon } from "@chaos_team/chaos-ui/ui-icons";

/**
 * @component SignActionButton
 * @category business/finance
 * @since 0.7.0
 * @description 签收操作按钮。未签收时展示“签收”，已签收时展示“已签收”且禁用。
 * @param onSign 点击签收回调
 * @param signed 是否已签收
 * @param label 自定义按钮文案
 * @example
 * <SignActionButton onSign={() => {}} />
 */

interface SignActionButtonProps {
  onSign?: () => void;
  signed?: boolean;
  label?: string;
  className?: string;
}

function SignActionButton({
  onSign,
  signed = false,
  label,
  className,
}: SignActionButtonProps) {
  const text = label ?? (signed ? "已签收" : "签收");

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (signed) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSign?.();
    }
  };

  return (
    <span
      data-slot="sign-action-button"
      className={cn("inline-flex", className)}
    >
      <Button
        type="button"
        variant={signed ? "secondary" : "default"}
        onClick={signed ? undefined : onSign}
        onKeyDown={handleKeyDown}
        disabled={signed}
        aria-label={text}
        aria-pressed={signed}
        icon={signed ? <CheckIcon /> : <SignatureIcon />}
      >
        {text}
      </Button>
    </span>
  );
}

export { SignActionButton };
export type { SignActionButtonProps };
