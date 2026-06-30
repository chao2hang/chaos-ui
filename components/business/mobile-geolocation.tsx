"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { MapPinIcon, RefreshCwIcon } from "@/components/ui/icons";

/**
 * @component MobileGeolocation
 * @category business/mobile
 * @since 0.7.0
 * @description 移动端地理定位 — 调用浏览器 Geolocation API 获取经纬度，并以文本与简易坐标格展示。
 * @keywords mobile, geolocation
 * @param onLocate 定位成功回调，参数为 { lat, lng }。
 * @example
 * <MobileGeolocation onLocate={(c) => submit(c)} />
 */

interface MobileGeolocationProps {
  onLocate?: (coords: { lat: number; lng: number }) => void;
  className?: string;
}

type LocateStatus = "idle" | "locating" | "success" | "denied" | "unsupported";

function formatCoord(value: number, axis: "lat" | "lng") {
  const dir = axis === "lat" ? (value >= 0 ? "N" : "S") : value >= 0 ? "E" : "W";
  return `${Math.abs(value).toFixed(6)}° ${dir}`;
}

function MobileGeolocation({ onLocate, className }: MobileGeolocationProps) {
  const [status, setStatus] = React.useState<LocateStatus>("idle");
  const [coords, setCoords] = React.useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = React.useState<string>("");

  const locate = React.useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setStatus("unsupported");
      setError("当前环境不支持定位");
      return;
    }
    setStatus("locating");
    setError("");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const next = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCoords(next);
        setStatus("success");
        onLocate?.(next);
      },
      (err) => {
        setStatus("denied");
        setError(
          err.code === err.PERMISSION_DENIED
            ? "定位权限被拒绝"
            : err.code === err.POSITION_UNAVAILABLE
              ? "无法获取位置信息"
              : "定位超时",
        );
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    );
  }, [onLocate]);

  const statusText =
    status === "locating"
      ? "正在定位…"
      : status === "success"
        ? "定位成功"
        : status === "denied" || status === "unsupported"
          ? error || "定位失败"
          : "点击按钮获取当前位置";

  return (
    <div
      data-slot="mobile-geolocation"
      className={cn("flex flex-col gap-3 rounded-lg border bg-card p-4", className)}
    >
      <div className="flex items-center gap-2 text-sm">
        <MapPinIcon className="size-4 text-primary" aria-hidden="true" />
        <span className="flex-1 text-muted-foreground">{statusText}</span>
        <button
          type="button"
          onClick={locate}
          disabled={status === "locating"}
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground disabled:opacity-50"
        >
          <RefreshCwIcon
            className={cn("size-3.5", status === "locating" && "animate-spin")}
            aria-hidden="true"
          />
          {coords ? "重新定位" : "获取定位"}
        </button>
      </div>
      {coords ? (
        <dl className="grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-md bg-muted/50 p-2">
            <dt className="text-xs text-muted-foreground">纬度</dt>
            <dd className="tabular-nums">{formatCoord(coords.lat, "lat")}</dd>
          </div>
          <div className="rounded-md bg-muted/50 p-2">
            <dt className="text-xs text-muted-foreground">经度</dt>
            <dd className="tabular-nums">{formatCoord(coords.lng, "lng")}</dd>
          </div>
        </dl>
      ) : (
        <div
          className="flex h-24 items-center justify-center rounded-md border border-dashed text-xs text-muted-foreground"
          role="presentation"
        >
          暂无位置数据
        </div>
      )}
    </div>
  );
}

export { MobileGeolocation };
export type { MobileGeolocationProps };
