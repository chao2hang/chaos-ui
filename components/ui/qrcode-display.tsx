"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { QRCode } from "./qrcode";

/**
 * @component QrCodeDisplay
 * @category ui/display
 * @since 0.7.0
 * @deprecated Use `QRCode` directly. `QrCodeDisplay` is a thin wrapper over `QRCode`
 * that additionally supports rendering the value as a caption below the code. The
 * previous implementation used a pseudo-QR CSS matrix that was not scannable — this
 * version forwards to `QRCode` for real, scannable output. Will be removed in 2.0.
 * @description 二维码展示组件 — 内部转发到 `QRCode`（`qrcode` 库生成真实可扫码的二维码），
 * 兼容旧 `showText` 用法在底部展示值。/ Thin `QRCode` wrapper that keeps the legacy
 * `showText` caption option; produces a real, scannable QR code.
 * @keywords qrcode, qr, display, scan
 * @example
 * <QrCodeDisplay value="https://example.com" size={128} showText />
 */
interface QrCodeDisplayProps extends React.ComponentProps<"div"> {
  /** QR code value / 二维码内容 */
  value: string;
  /** Size in px / 尺寸 */
  size?: number;
  /** Show the value text below / 是否显示值文本 */
  showText?: boolean;
}

function QrCodeDisplay({
  value,
  size = 128,
  showText = false,
  className,
  ...props
}: QrCodeDisplayProps) {
  return (
    <div
      data-slot="qrcode-display"
      className={cn("inline-flex flex-col items-center gap-1", className)}
      {...props}
    >
      <QRCode value={value} size={size} />
      {showText && (
        <span className="text-muted-foreground font-mono text-xs">{value}</span>
      )}
    </div>
  );
}

export { QrCodeDisplay };
export type { QrCodeDisplayProps };
