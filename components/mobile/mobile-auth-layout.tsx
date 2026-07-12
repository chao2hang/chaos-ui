"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface MobileAuthLayoutProps {
  children: React.ReactNode;
  className?: string;
}

function MobileAuthLayout({ children, className }: MobileAuthLayoutProps) {
  return (
    <div
      className={cn(
        "from-primary/10 via-background to-secondary/10 flex h-full min-h-0 items-center justify-center bg-gradient-to-br p-4",
        className,
      )}
    >
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}

export { MobileAuthLayout };
export type { MobileAuthLayoutProps };
