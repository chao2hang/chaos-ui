"use client";

import { cn } from "@/lib/utils";

/**
 * @component MobileCamera
 * @category business/mobile
 * @since 0.7.0
 * @description 移动端相机
 * @keywords mobile, camera
 * @example
 * <MobileCamera />
 */

interface MobileCameraProps {
  onCapture?: (blob: Blob) => void;
  className?: string;
}

function MobileCamera({ className }: MobileCameraProps) {
  return <div data-slot="mobile-camera" className={cn("", className)} />;
}

export { MobileCamera };
export type { MobileCameraProps };
