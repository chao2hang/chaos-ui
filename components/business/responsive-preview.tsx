"use client";

import * as React from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface ResponsivePreviewProps {
  children: React.ReactNode;
  device?: "mobile" | "tablet" | "desktop";
  showFrame?: boolean;
  showLabel?: boolean;
  className?: string;
}

function ResponsivePreview({
  children,
  device = "desktop",
  showFrame = true,
  showLabel = true,
  className,
}: ResponsivePreviewProps) {
  const { t } = useTranslation("marketing");

  const deviceSizes = {
    mobile: { width: 375, height: 667, label: t("responsivePreview.mobile") },
    tablet: { width: 768, height: 1024, label: t("responsivePreview.tablet") },
    desktop: {
      width: 1024,
      height: 768,
      label: t("responsivePreview.desktop"),
    },
  };

  const size = deviceSizes[device];

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      {showLabel && (
        <div className="text-xs text-muted-foreground font-medium">
          {size.label} ({size.width} × {size.height})
        </div>
      )}
      <div
        className={cn(
          "border rounded-lg overflow-hidden bg-background",
          showFrame && "shadow-lg",
        )}
        style={{
          width: showFrame ? Math.min(size.width, 800) : "100%",
          height: showFrame ? Math.min(size.height, 600) : "auto",
        }}
      >
        <div className="w-full h-full overflow-auto">{children}</div>
      </div>
    </div>
  );
}

export { ResponsivePreview };
export type { ResponsivePreviewProps };
