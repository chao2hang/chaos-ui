"use client";

import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";
import { MobilePageHeader } from "@chaos_team/chaos-ui/mobile";

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
    <div className={cn("bg-background min-h-screen", className)}>
      {title && (
        <MobilePageHeader
          title={title}
          description={description}
          actions={actions}
          onBack={onBack}
          onMenu={onMenu}
        />
      )}
      <main className="p-4 md:p-6">{children}</main>
    </div>
  );
}

export { MobileDashboardLayout };
export type { MobileDashboardLayoutProps };
