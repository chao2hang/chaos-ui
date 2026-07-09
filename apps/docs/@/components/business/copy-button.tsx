"use client";
import * as React from "react";
import { CopyIcon, CheckIcon } from "lucide-react";
import { cn } from "@chaos_team/chaos-ui/lib";
import { Button } from "@chaos_team/chaos-ui/ui";
import { useCopyToClipboard } from "@chaos_team/chaos-ui/hooks";

interface CopyButtonProps {
  text: string;
  label?: string;
  copiedLabel?: string;
  variant?: "default" | "ghost" | "outline";
  className?: string;
}

function CopyButton({
  text,
  label = "复制",
  copiedLabel = "已复制",
  variant = "ghost",
  className,
}: CopyButtonProps) {
  const [copied, copy] = useCopyToClipboard();

  const handleClick = () => {
    copy(text);
  };

  return (
    <Button
      type="button"
      variant={variant}
      size="sm"
      onClick={handleClick}
      className={cn("gap-1.5", className)}
    >
      {copied ? <CheckIcon className="text-success" /> : <CopyIcon />}
      {copied ? copiedLabel : label}
    </Button>
  );
}

CopyButton.displayName = "CopyButton";

export { CopyButton };
export type { CopyButtonProps };
