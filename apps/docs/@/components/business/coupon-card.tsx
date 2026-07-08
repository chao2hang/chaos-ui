"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface CouponCardProps {
  /** Coupon value display (e.g. "¥50" or "20% OFF"). */
  value: string;
  /** Coupon description or conditions. */
  description?: string;
  /** Expiration date string. */
  expiresAt?: string;
  /** Whether the coupon has been used. */
  used?: boolean;
  /** Called when user clicks "Use" / "Claim". */
  onUse?: () => void;
  /** Additional class names. */
  className?: string;
}

/**
 * @component CouponCard
 * @category business/marketing
 * @since 1.1.0
 * @description Coupon card displaying value, description, expiry, and a use button / 优惠券卡片
 * @keywords coupon, discount, promotion, card, marketing
 * @example
 * <CouponCard value="¥50" description="Orders over ¥200" expiresAt="2026-12-31" onUse={handleClaim} />
 */
function CouponCard({
  value,
  description,
  expiresAt,
  used,
  onUse,
  className,
}: CouponCardProps) {
  return (
    <div
      data-slot="coupon-card"
      className={cn(
        "bg-card relative flex items-center gap-4 overflow-hidden rounded-lg border p-4",
        used && "opacity-50",
        className,
      )}
    >
      {/* Dashed cut line visual */}
      <div className="border-border absolute inset-y-0 left-24 w-px border-l border-dashed" />

      <div className="flex w-24 shrink-0 flex-col items-center justify-center">
        <span className="text-primary text-xl font-bold">{value}</span>
        {expiresAt && (
          <span className="text-muted-foreground mt-0.5 text-[0.65rem]">
            Until {expiresAt}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 pl-4">
        {description && <p className="text-sm">{description}</p>}
        {used && <span className="text-muted-foreground text-xs">Used</span>}
      </div>

      {!used && onUse && (
        <Button variant="outline" size="sm" onClick={onUse}>
          Use
        </Button>
      )}
    </div>
  );
}

export { CouponCard };
