"use client";

import { cn } from "@/lib/utils";

/**
 * @component MobileGeolocation
 * @category business/mobile
 * @since 0.7.0
 * @description 移动端地理定位
 * @keywords mobile, geolocation
 * @example
 * <MobileGeolocation />
 */

interface MobileGeolocationProps {
  onLocate?: (coords: { lat: number; lng: number }) => void;
  className?: string;
}

function MobileGeolocation({ className }: MobileGeolocationProps) {
  return <div data-slot="mobile-geolocation" className={cn("", className)} />;
}

export { MobileGeolocation };
export type { MobileGeolocationProps };
