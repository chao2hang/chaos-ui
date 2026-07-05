"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface RedPacketProps {
  /** Amount or greeting text. */
  label: string;
  /** Subtitle. */
  subtitle?: string;
  /** Whether the red packet has been opened. */
  opened?: boolean;
  /** Called when user clicks to open. */
  onOpen?: () => void;
  /** Additional class names. */
  className?: string;
}

/**
 * @component RedPacket
 * @category business/marketing
 * @since 1.1.0
 * @description Traditional red packet UI for promotional campaigns / 红包组件，用于营销活动
 * @keywords red-packet, hongbao, promotion, gift, marketing
 * @example
 * <RedPacket label="¥8.88" subtitle="Click to receive" onOpen={() => doOpen()} />
 */
function RedPacket({
  label,
  subtitle,
  opened,
  onOpen,
  className,
}: RedPacketProps) {
  return (
    <div
      data-slot="red-packet"
      className={cn(
        "bg-destructive text-destructive-foreground relative flex w-48 flex-col items-center justify-center gap-2 rounded-lg p-6",
        opened && "bg-muted text-muted-foreground opacity-75",
        className,
      )}
    >
      <div className="border-destructive-foreground flex h-16 w-16 items-center justify-center rounded-full border-2">
        <span className="text-2xl">🧧</span>
      </div>
      <span className="text-lg font-bold">{label}</span>
      {subtitle && <span className="text-xs opacity-80">{subtitle}</span>}
      {!opened && onOpen && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onOpen}
          className="bg-destructive-foreground text-destructive hover:bg-destructive-foreground/90 mt-1"
        >
          Open
        </Button>
      )}
    </div>
  );
}

export { RedPacket };
