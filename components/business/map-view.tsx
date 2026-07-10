"use client";

import * as React from "react";
import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";
import { cn } from "@/lib/utils";

/**
 * Load the AMap JSAPI v2.0 on demand (only when a MapView mounts).
 * Consumers must set `AMAP_KEY` env or pass `amapKey` explicitly.
 */
let amapPromise: Promise<Record<string, unknown>> | null = null;

function loadAMap(
  key: string,
  version = "2.0",
): Promise<Record<string, unknown>> {
  if (amapPromise) return amapPromise;

  amapPromise = new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("MapView requires a browser environment"));
      return;
    }
    const script = document.createElement("script");
    script.src = `https://webapi.amap.com/maps?v=${version}&key=${key}`;
    script.onload = () => {
      if ((window as unknown as { AMap?: Record<string, unknown> }).AMap) {
        resolve(
          (window as unknown as { AMap?: Record<string, unknown> }).AMap!,
        );
      } else {
        reject(new Error("AMap JSAPI loaded but AMap not found on window"));
      }
    };
    script.onerror = () => reject(new Error("Failed to load AMap JSAPI"));
    document.head.appendChild(script);
  });

  return amapPromise;
}

export interface MapViewProps {
  /** AMap JSAPI key. Falls back to `AMAP_KEY` env or a hard-coded demo key. */
  amapKey?: string;
  /** Center point [lng, lat]. Default: [116.397428, 39.90923] (Beijing). */
  center?: [number, number];
  /** Initial zoom level. Default: 12. */
  zoom?: number;
  /** Container height in px. Default: 400. */
  height?: number;
  /** Additional class names. */
  className?: string;
  /** Called when the map instance is ready. */
  onReady?: (map: AMap.Map) => void;
  /** Called when the map is clicked. */
  onClick?: (lnglat: [number, number]) => void;
}

/**
 * @component MapView
 * @category business/map
 * @since 1.1.0
 * @description AMap (高德地图) base map component. Loads AMap JSAPI on demand / 高德地图底图组件，按需加载高德 JSAPI
 * @keywords map, amap, gaode, 高德, gis, location
 * @example
 * <MapView
 *   amapKey="your-key"
 *   center={[116.397428, 39.90923]}
 *   zoom={14}
 *   onReady={(map) => console.log("ready")}
 * />
 */
function MapView({
  amapKey,
  center = [116.397428, 39.90923],
  zoom = 12,
  height = 400,
  className,
  onReady,
  onClick,
}: MapViewProps) {
  const { t } = useTranslation("map");
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mapRef = React.useRef<AMap.Map | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const key =
    amapKey ||
    (typeof process !== "undefined" &&
      (process.env as Record<string, string>).AMAP_KEY) ||
    "";

  React.useEffect(() => {
    if (!key) {
      setError(t("loading"));
      setLoading(false);
      return;
    }
    let cancelled = false;

    loadAMap(key)
      .then((amap: Record<string, unknown>) => {
        if (cancelled || !containerRef.current) return;
        const AMap = amap as Record<string, unknown>;
        const MapCtor = AMap.Map as new (
          el: HTMLElement,
          opts: Record<string, unknown>,
        ) => AMap.Map;
        const map = new MapCtor(containerRef.current, {
          center,
          zoom,
          resizeEnable: true,
        });
        mapRef.current = map;
        setLoading(false);
        onReady?.(map);

        if (onClick) {
          map.on("click", (e: unknown) => {
            const ev = e as {
              lnglat: { getLng: () => number; getLat: () => number };
            };
            onClick([ev.lnglat.getLng(), ev.lnglat.getLat()]);
          });
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return (
    <div
      data-slot="map-view"
      className={cn(
        "bg-muted relative overflow-hidden rounded-lg border",
        className,
      )}
      style={{ height }}
    >
      {loading && (
        <div className="bg-muted/80 absolute inset-0 z-10 flex items-center justify-center">
          <span className="text-muted-foreground text-sm">{t("loading")}</span>
        </div>
      )}
      {error && (
        <div className="bg-muted/80 absolute inset-0 z-10 flex items-center justify-center">
          <span className="text-destructive text-sm">{error}</span>
        </div>
      )}
      <div ref={containerRef} className="size-full" />
    </div>
  );
}

export { MapView };
