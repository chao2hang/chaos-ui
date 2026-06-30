"use client";

import { cn } from "@/lib/utils";

/**
 * @component PreferencePanel
 * @category business/ux
 * @since 0.7.0
 * @description 偏好设置面板
 * @keywords preference, panel
 * @example
 * <PreferencePanel />
 */

interface PreferencePanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
}

function PreferencePanel({ className }: PreferencePanelProps) {
  return (
    <div data-slot="preference-panel" className={cn("", className)}>
      {null}
    </div>
  );
}

export { PreferencePanel };
export type { PreferencePanelProps };
