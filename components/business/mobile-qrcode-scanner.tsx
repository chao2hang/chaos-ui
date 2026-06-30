"use client";

import { cn } from "@/lib/utils";

/**
 * @component MobileQrCodeScanner
 * @category business/mobile
 * @since 0.7.0
 * @description 移动端二维码扫描
 * @keywords mobile, qrcode, scanner
 * @example
 * <MobileQrCodeScanner />
 */

interface MobileQrCodeScannerProps {
  onScan?: (result: string) => void;
  className?: string;
}

function MobileQrCodeScanner({ className }: MobileQrCodeScannerProps) {
  return (
    <div data-slot="mobile-qrcode-scanner" className={cn("", className)} />
  );
}

export { MobileQrCodeScanner };
export type { MobileQrCodeScannerProps };
