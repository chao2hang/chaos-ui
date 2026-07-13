"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { XIcon } from "@/components/ui/icons";

export interface MobileShareSheetProps {
  /** Whether the sheet is open. */
  open?: boolean;
  /** Called when the sheet is dismissed. */
  onClose?: () => void;
  /** URL to share. */
  /** Share title. */
  title?: string;
  /** Share platforms to show. */
  platforms?: {
    id: string;
    label: string;
    color?: string;
    onClick: () => void;
  }[];
  /** Additional class names. */
  className?: string;
}

/**
 * @component MobileShareSheet
 * @category mobile/share
 * @since 1.1.0
 * @description Bottom sheet for mobile sharing with platform buttons / 移动端底部分享面板
 * @keywords mobile, share, sheet, social, wechat, action-sheet
 * @example
 * <MobileShareSheet
 *   open={isOpen}
 *   onClose={() => setOpen(false)}
 *   url="https://example.com"
 *   platforms={[
 *     { id: "wechat", label: "WeChat", onClick: shareWechat },
 *     { id: "link", label: "Copy Link", onClick: copyLink },
 *   ]}
 * />
 */
function MobileShareSheet({
  open,
  onClose,
  title,
  platforms = [],
  className,
}: MobileShareSheetProps) {
  if (!open) return null;

  return (
    <div
      data-slot="mobile-share-sheet"
      className={cn("fixed inset-0 z-50", className)}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Sheet */}
      <div className="bg-background animate-in fade-in-0 slide-in-from-bottom-4 absolute inset-x-0 bottom-0 rounded-t-2xl p-4 pb-[max(1rem,env(safe-area-inset-bottom))] duration-200">
        {/* Handle */}
        <div className="bg-muted mx-auto mb-4 h-1 w-10 rounded-full" />

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Share</h2>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            aria-label="Close"
          >
            <XIcon />
          </Button>
        </div>

        {title && <p className="text-muted-foreground mb-3 text-sm">{title}</p>}

        <div className="grid grid-cols-4 gap-3">
          {platforms.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={p.onClick}
              className="hover:bg-muted flex flex-col items-center gap-1.5 rounded-lg p-2 text-center text-xs transition-colors active:scale-95"
            >
              <div
                className="flex size-12 items-center justify-center rounded-full"
                style={{
                  backgroundColor: p.color ? `${p.color}20` : undefined,
                }}
              >
                <span
                  className="text-base font-bold"
                  style={{ color: p.color || undefined }}
                >
                  {p.label[0]}
                </span>
              </div>
              <span className="text-muted-foreground">{p.label}</span>
            </button>
          ))}
        </div>

        <Button variant="ghost" className="mt-4 w-full" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

export { MobileShareSheet };
