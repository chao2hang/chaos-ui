"use client";

import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";

export interface MapTrackPoint {
  /** Longitude. */
  lng: number;
  /** Latitude. */
  lat: number;
  /** Timestamp or label. */
  time?: string;
}

export interface MapTrackProps {
  /** AMap instance from MapView's `onReady`. */
  map?: AMap.Map | null;
  /** Track point array in chronological order. */
  points?: MapTrackPoint[];
  /** Whether the track animation is playing. */
  playing?: boolean;
  /** Playback speed multiplier. Default: 10 (10 points per tick). */
  speed?: number;
  /** Track line color. Default: "#1677FF". */
  color?: string;
  /** Called when playback starts. */
  onStart?: () => void;
  /** Called when playback ends (reaches last point). */
  onEnd?: () => void;
  /** Additional class names. */
  className?: string;
}

/**
 * @component MapTrack
 * @category business/map
 * @since 1.1.0
 * @description Animated track playback on AMap. Renders a polyline and a moving marker / 高德地图轨迹回放，绘制轨迹线与移动标点
 * @keywords map, track, polyline, animation, gis, logistics
 * @example
 * <MapTrack
 *   map={amapInstance}
 *   points={[{lng:116.39,lat:39.91,time:"10:00"},{lng:116.40,lat:39.92,time:"10:05"}]}
 *   playing
 * />
 */
function MapTrack({
  map,
  points = [],
  playing = false,
  speed = 10,
  color = "#1677FF",
  onStart,
  onEnd,
  className,
}: MapTrackProps) {
  const polylineRef = React.useRef<AMap.Polyline | null>(null);
  const carMarkerRef = React.useRef<AMap.Marker | null>(null);
  const indexRef = React.useRef(0);
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  // Draw the full track polyline
  React.useEffect(() => {
    if (!map) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const AMap = (window as Record<string, any>).AMap;
    if (!AMap) return;

    // Remove previous
    if (polylineRef.current) {
      polylineRef.current.setMap(null);
      polylineRef.current = null;
    }
    if (points.length < 2) return;

    const path = points.map((p) => [p.lng, p.lat] as [number, number]);
    const polyline = new AMap.Polyline({
      path,
      strokeColor: color,
      strokeWeight: 4,
      strokeOpacity: 0.7,
      lineJoin: "round",
    });
    polyline.setMap(map);
    polylineRef.current = polyline;

    // @ts-ignore setFitView may not exist in AMap type definitions
    map.setFitView([polyline]);

    return () => {
      polyline.setMap(null);
      polylineRef.current = null;
    };
  }, [map, points, color]);

  // Animate a moving marker along the path
  React.useEffect(() => {
    if (!map || points.length === 0) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const AMap = (window as Record<string, any>).AMap;
    if (!AMap) return;

    // Create the moving marker if not exists
    if (!carMarkerRef.current) {
      carMarkerRef.current = new AMap.Marker({
        position: [points[0]!.lng, points[0]!.lat],
        icon: new AMap.Icon({
          size: new AMap.Size(26, 26),
          image:
            "data:image/svg+xml," +
            encodeURIComponent(
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="' +
                color +
                '"><circle cx="12" cy="12" r="10" fill-opacity="0.3"/><circle cx="12" cy="12" r="5"/></svg>',
            ),
          imageSize: new AMap.Size(26, 26),
        }),
        zIndex: 100,
      });
      carMarkerRef.current?.setMap(map);
    }

    if (!playing) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    onStart?.();
    indexRef.current = 0;

    timerRef.current = setInterval(() => {
      indexRef.current += speed;
      if (indexRef.current >= points.length - 1) {
        indexRef.current = points.length - 1;
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        onEnd?.();
      }
      const pt = points[indexRef.current]!;
      carMarkerRef.current?.setPosition([pt.lng, pt.lat]);
    }, 100);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [map, points, playing, speed, color, onStart, onEnd]);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (polylineRef.current) {
        polylineRef.current.setMap(null);
        polylineRef.current = null;
      }
      if (carMarkerRef.current) {
        carMarkerRef.current.setMap(null);
        carMarkerRef.current = null;
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  return (
    <div
      data-slot="map-track"
      className={cn("hidden", className)}
      aria-hidden
    />
  );
}

export { MapTrack };
