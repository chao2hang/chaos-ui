"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Lightweight marker data contract. Consumers pass this array to
 * `MapMarkerCluster` which renders it on the parent `MapView` instance.
 */
export interface MapMarkerData {
  /** Unique id for the marker. */
  id: string;
  /** Longitude. */
  lng: number;
  /** Latitude. */
  lat: number;
  /** Label shown in the marker tooltip or info window. */
  label: string;
  /** Optional popup content (HTML string). */
  content?: string;
  /** Optional icon URL. Falls back to the default AMap marker icon. */
  icon?: string;
}

export interface MapMarkerClusterProps {
  /** AMap instance returned from MapView's `onReady`. */
  map?: AMap.Map | null;
  /** Marker data array. */
  markers?: MapMarkerData[];
  /** Cluster enabled. Default true. */
  cluster?: boolean;
  /** Additional class names on the wrapper div (used for layout only). */
  className?: string;
}

/**
 * @component MapMarkerCluster
 * @category business/map
 * @since 1.1.0
 * @description AMap marker layer with optional point clustering. Accepts a
 * map instance (from MapView onReady) and array of marker data / 高德地图标点图层，支持点聚合
 * @keywords map, marker, cluster, amap, gaode, gis
 * @example
 * <MapMarkerCluster
 *   map={amapInstance}
 *   markers={[
 *     { id: "1", lng: 116.39, lat: 39.91, label: "Store A" },
 *   ]}
 * />
 */
function MapMarkerCluster({
  map,
  markers = [],
  cluster = true,
  className,
}: MapMarkerClusterProps) {
  const clusterRef = React.useRef<AMap.MarkerClusterer | null>(null);
  const markerInstancesRef = React.useRef<AMap.Marker[]>([]);

  React.useEffect(() => {
    if (!map) return;

    // Clean previous markers
    if (clusterRef.current) {
      clusterRef.current.clearMarkers();
      clusterRef.current = null;
    }
    markerInstancesRef.current.forEach((m) => m.setMap(null));
    markerInstancesRef.current = [];

    if (markers.length === 0) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const AMap = (window as Record<string, any>).AMap;
    if (!AMap) return;

    const instances = markers.map((d) => {
      const marker = new AMap.Marker({
        position: [d.lng, d.lat],
        title: d.label,
        icon: d.icon || undefined,
      });

      if (d.content) {
        marker.setLabel({
          content: d.content,
          direction: "top",
        });
      }

      return marker;
    });

    if (cluster && AMap.MarkerClusterer) {
      const cl = new AMap.MarkerClusterer(map, instances, {
        gridSize: 80,
        maxZoom: 18,
      });
      clusterRef.current = cl;
    } else {
      instances.forEach((m) => m.setMap(map));
    }

    markerInstancesRef.current = instances;

    return () => {
      if (clusterRef.current) {
        clusterRef.current.clearMarkers();
        clusterRef.current = null;
      }
      markerInstancesRef.current.forEach((m) => m.setMap(null));
      markerInstancesRef.current = [];
    };
  }, [map, markers, cluster]);

  return (
    <div
      data-slot="map-marker-cluster"
      className={cn("hidden", className)}
      aria-hidden
    />
  );
}

export { MapMarkerCluster };
export { MapMarkerCluster as MapMarker };
