"use client";

import * as React from "react";
import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";
import { cn } from "@/lib/utils";

interface ResponsivePreviewProps {
  children: React.ReactNode;
  device?: "mobile" | "tablet" | "desktop";
  showFrame?: boolean;
  showLabel?: boolean;
  className?: string;
}

/**
 * @component ResponsivePreview
 * @category business/ux
 * @since 0.2.0
 * @description Preview content at mobile, tablet, or desktop viewport sizes in a framed container / 在移动端、平板或桌面视口尺寸的框架容器中预览内容
 * @keywords responsive, preview, mobile, tablet, desktop, viewport
 * @example
 * <ResponsivePreview device="mobile">
 *   <MyComponent />
 * </ResponsivePreview>
 */
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
    <div
      data-slot="responsive-preview"
      className={cn("flex flex-col items-center gap-2", className)}
    >
      {showLabel && (
        <div className="text-muted-foreground text-xs font-medium">
          {size.label} ({size.width} × {size.height})
        </div>
      )}
      <div
        className={cn(
          "bg-background overflow-hidden rounded-lg border",
          showFrame && "shadow-lg",
        )}
        style={{
          width: showFrame ? Math.min(size.width, 800) : "100%",
          height: showFrame ? Math.min(size.height, 600) : "auto",
        }}
      >
        <div className="h-full w-full overflow-auto">{children}</div>
      </div>
    </div>
  );
}

export { ResponsivePreview };
export type { ResponsivePreviewProps };
