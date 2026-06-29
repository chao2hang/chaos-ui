"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { MobilePageHeader } from "@/components/mobile/mobile-page-header";

interface MobileDashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  onBack?: () => void;
  onMenu?: () => void;
  className?: string;
}

function MobileDashboardLayout({
  children,
  title,
  description,
  actions,
  onBack,
  onMenu,
  className,
}: MobileDashboardLayoutProps) {
  return (
    <div className={cn("min-h-screen bg-background", className)}>
      {title && (
        <MobilePageHeader
          title={title}
          {...(description !== undefined ? { description } : {})}
          {...(actions !== undefined ? { actions } : {})}
          {...(onBack !== undefined ? { onBack } : {})}
          {...(onMenu !== undefined ? { onMenu } : {})}
        />
      )}
      <main className="p-4 md:p-6">{children}</main>
    </div>
  );
}

export { MobileDashboardLayout };
export type { MobileDashboardLayoutProps };
