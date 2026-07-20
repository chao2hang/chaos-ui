"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { MapPinIcon, RefreshCwIcon } from "@/components/ui/icons";
import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";

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
  const dir =
    axis === "lat" ? (value >= 0 ? "N" : "S") : value >= 0 ? "E" : "W";
  return `${Math.abs(value).toFixed(6)}° ${dir}`;
}

function MobileGeolocation({ onLocate, className }: MobileGeolocationProps) {
  const { t } = useTranslation("mobile");
  const [status, setStatus] = React.useState<LocateStatus>("idle");
  const [coords, setCoords] = React.useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [error, setError] = React.useState<string>("");

  const locate = React.useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setStatus("unsupported");
      setError(
        t("mobileGeolocation.unsupported", {
          defaultValue: "当前环境不支持定位",
        }),
      );
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
            ? t("mobileGeolocation.permissionDenied", {
                defaultValue: "定位权限被拒绝",
              })
            : err.code === err.POSITION_UNAVAILABLE
              ? t("mobileGeolocation.unavailable", {
                  defaultValue: "无法获取位置信息",
                })
              : t("mobileGeolocation.timeout", {
                  defaultValue: "定位超时",
                }),
        );
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    );
  }, [onLocate, t]);

  const statusText =
    status === "locating"
      ? t("mobileGeolocation.locating", { defaultValue: "正在定位…" })
      : status === "success"
        ? t("mobileGeolocation.success", { defaultValue: "定位成功" })
        : status === "denied" || status === "unsupported"
          ? error || t("mobileGeolocation.failed", { defaultValue: "定位失败" })
          : t("mobileGeolocation.idle", {
              defaultValue: "点击按钮获取当前位置",
            });

  return (
    <div
      data-slot="mobile-geolocation"
      className={cn(
        "bg-card flex flex-col gap-3 rounded-lg border p-4",
        className,
      )}
    >
      <div className="flex items-center gap-2 text-sm">
        <MapPinIcon className="text-primary size-4" aria-hidden="true" />
        <span className="text-muted-foreground flex-1">{statusText}</span>
        <button
          type="button"
          onClick={locate}
          disabled={status === "locating"}
          className="bg-primary text-primary-foreground inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium disabled:opacity-50"
        >
          <RefreshCwIcon
            className={cn("size-3.5", status === "locating" && "animate-spin")}
            aria-hidden="true"
          />
          {coords
            ? t("mobileGeolocation.relocate", { defaultValue: "重新定位" })
            : t("mobileGeolocation.locate", { defaultValue: "获取定位" })}
        </button>
      </div>
      {coords ? (
        <dl className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-muted/50 rounded-md p-2">
            <dt className="text-muted-foreground text-xs">
              {t("mobileGeolocation.latitude", { defaultValue: "纬度" })}
            </dt>
            <dd className="tabular-nums">{formatCoord(coords.lat, "lat")}</dd>
          </div>
          <div className="bg-muted/50 rounded-md p-2">
            <dt className="text-muted-foreground text-xs">
              {t("mobileGeolocation.longitude", { defaultValue: "经度" })}
            </dt>
            <dd className="tabular-nums">{formatCoord(coords.lng, "lng")}</dd>
          </div>
        </dl>
      ) : (
        <div
          className="text-muted-foreground flex h-24 items-center justify-center rounded-md border border-dashed text-xs"
          role="presentation"
        >
          {t("mobileGeolocation.empty", { defaultValue: "暂无位置数据" })}
        </div>
      )}
    </div>
  );
}

export { MobileGeolocation };
export type { MobileGeolocationProps };
