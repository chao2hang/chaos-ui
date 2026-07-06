"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

interface GlobalLoadingProps {
  loading?: boolean;
  text?: string;
  fullscreen?: boolean;
}

function GlobalLoading({
  loading = true,
  text = "加载中...",
  fullscreen = true,
}: GlobalLoadingProps) {
  if (!loading) return null;

  return (
    <div
      data-slot="global-loading"
      className={cn(
        "bg-background/80 z-50 flex flex-col items-center justify-center gap-3 backdrop-blur-sm",
        fullscreen ? "fixed inset-0" : "absolute inset-0 rounded-lg",
      )}
    >
      <Loader2Icon className="text-primary size-8 animate-spin" />
      <p className="text-muted-foreground text-sm">{text}</p>
    </div>
  );
}

export { GlobalLoading };
export type { GlobalLoadingProps };
