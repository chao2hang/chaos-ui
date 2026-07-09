"use client";

import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";

interface MobileAuthLayoutProps {
  children: React.ReactNode;
  logo?: React.ReactNode;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  className?: string;
}

function MobileAuthLayout({
  children,
  logo,
  title,
  description,
  footer,
  className,
}: MobileAuthLayoutProps) {
  return (
    <div
      className={cn("bg-background min-h-screen px-5 pt-14 pb-8", className)}
    >
      {logo && <div className="mb-6 flex justify-center">{logo}</div>}
      {(title || description) && (
        <div className="mb-8">
          {title && (
            <h1 className="text-foreground text-2xl font-bold tracking-tight">
              {title}
            </h1>
          )}
          {description && (
            <p className="text-muted-foreground mt-2 text-sm">{description}</p>
          )}
        </div>
      )}
      <div className="w-full">{children}</div>
      {footer && (
        <div className="text-muted-foreground mt-8 text-center text-sm">
          {footer}
        </div>
      )}
    </div>
  );
}

export { MobileAuthLayout };
export type { MobileAuthLayoutProps };
