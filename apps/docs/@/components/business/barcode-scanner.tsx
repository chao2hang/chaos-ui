"use client";

import * as React from "react";
import { QrCodeIcon, BarcodeIcon } from "@/components/ui/icons";

import { cn } from "@/lib/utils";

export interface BarcodeScannerProps extends Omit<
  React.ComponentProps<"div">,
  "onKeyDown"
> {
  /** Callback fired when a barcode is scanned / 扫码完成时的回调 */
  onScan: (barcode: string) => void;
  /** Whether the scanner is actively listening / 扫描器是否正在监听 */
  active?: boolean;
  /** Placeholder text for the input / 输入框占位文本 */
  placeholder?: string;
  /** Auto-focus the input on mount / 挂载时自动聚焦输入框 */
  autoFocus?: boolean;
  /** Keep scanning after each scan (clear and continue) / 每次扫描后继续扫描 */
  continuous?: boolean;
  /** Play a beep sound on successful scan / 扫描成功时播放提示音 */
  beepOnScan?: boolean;
}

/** Time threshold (ms) between keystrokes to be considered scanner input */
const SCAN_THRESHOLD = 50;

/**
 * @component BarcodeScanner
 * @category business/input
 * @since 0.2.0
 * @description Barcode scanner input that detects rapid keystrokes from hardware scanners (ending with Enter within 50ms threshold) / 条码扫描输入组件，检测硬件扫描器的快速按键输入（在 50ms 阈值内以回车结束）
 * @keywords barcode, scanner, hardware, input, scan, pos
 * @example
 * <BarcodeScanner onScan={(code) => console.log(code)} continuous />
 */
function BarcodeScanner({
  onScan,
  active = true,
  placeholder = "Scan barcode...",
  autoFocus = false,
  continuous = true,
  beepOnScan = true,
  className,
  ...props
}: BarcodeScannerProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const bufferRef = React.useRef<string>("");
  const lastKeyTimeRef = React.useRef<number>(0);

  const beep = React.useCallback(() => {
    if (!beepOnScan) return;
    try {
      const AudioCtx =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = new AudioCtx();
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.frequency.value = 1000;
      oscillator.type = "sine";
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.15);
    } catch {
      // Audio not available
    }
  }, [beepOnScan]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!active) return;

      const now = Date.now();
      const elapsed = now - lastKeyTimeRef.current;
      lastKeyTimeRef.current = now;

      if (e.key === "Enter") {
        const code = bufferRef.current.trim();
        if (code.length > 0 && elapsed < SCAN_THRESHOLD * 10) {
          // Rapid input ending with Enter → scanner input
          onScan(code);
          beep();
          bufferRef.current = "";
          if (!continuous) {
            if (inputRef.current) inputRef.current.blur();
          }
        }
        e.preventDefault();
        return;
      }

      // If too much time passed between keys, reset buffer (normal typing)
      if (elapsed > SCAN_THRESHOLD && bufferRef.current.length > 0) {
        bufferRef.current = "";
      }

      // Accumulate character
      if (e.key.length === 1) {
        bufferRef.current += e.key;
      }
    },
    [active, onScan, beep, continuous],
  );

  React.useEffect(() => {
    if (autoFocus && active && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus, active]);

  return (
    <div
      data-slot="barcode-scanner"
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      <div className="text-muted-foreground shrink-0">
        {continuous ? (
          <QrCodeIcon className="size-4" />
        ) : (
          <BarcodeIcon className="size-4" />
        )}
      </div>
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        disabled={!active}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        spellCheck={false}
        className="border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 h-8 w-full min-w-0 rounded-lg border px-2.5 py-1 text-sm transition-colors outline-none focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50"
      />
      <div className="text-muted-foreground shrink-0 text-xs">
        <BarcodeIcon className="hidden size-4 sm:block" />
      </div>
    </div>
  );
}

export { BarcodeScanner };
// BarcodeScannerProps is exported via the interface declaration above
