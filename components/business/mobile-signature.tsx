"use client";

import { cn } from "@/lib/utils";

/**
 * @component MobileSignature
 * @category business/mobile
 * @since 0.7.0
 * @description 移动端签名
 * @keywords mobile, signature
 * @example
 * <MobileSignature />
 */

interface MobileSignatureProps {
  onSave?: (blob: Blob) => void;
  className?: string;
}

function MobileSignature({ className }: MobileSignatureProps) {
  return <div data-slot="mobile-signature" className={cn("", className)} />;
}

export { MobileSignature };
export type { MobileSignatureProps };
