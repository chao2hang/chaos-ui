/**
 * Global type declarations for AMap (高德地图 JSAPI v2.0).
 *
 * AMap is loaded at runtime via a dynamic script tag in MapView.
 * This file provides the minimum type surface needed for the map
 * components to compile cleanly.
 */

declare namespace AMap {
  interface MapOptions {
    center?: [number, number];
    zoom?: number;
    resizeEnable?: boolean;
  }

  interface Map {
    on(event: string, handler: (...args: unknown[]) => void): void;
    setFitView(overlays: unknown[]): void;
  }

  interface MarkerOptions {
    position?: [number, number];
    title?: string;
    icon?: string | Icon;
    zIndex?: number;
    label?: { content: string; direction?: string };
  }

  interface Marker {
    setMap(map: Map | null): void;
    setPosition(pos: [number, number]): void;
    setLabel(opts: { content: string; direction?: string }): void;
  }

  interface IconOptions {
    size?: Size;
    image?: string;
    imageSize?: Size;
  }

  interface Icon {}

  interface Size {
    new (w: number, h: number): Size;
  }

  interface PolylineOptions {
    path?: [number, number][];
    strokeColor?: string;
    strokeWeight?: number;
    strokeOpacity?: number;
    lineJoin?: string;
  }

  interface Polyline {
    setMap(map: Map | null): void;
  }

  interface MarkerClustererOptions {
    gridSize?: number;
    maxZoom?: number;
  }

  interface MarkerClusterer {
    clearMarkers(): void;
  }

  // Constructor-style access (runtime: new AMap.Map(...))
  const Map: { new (container: HTMLElement, opts: MapOptions): Map };
  const Marker: { new (opts: MarkerOptions): Marker };
  const Icon: { new (opts: IconOptions): Icon };
  const Size: Size;
  const Polyline: { new (opts: PolylineOptions): Polyline };
  const MarkerClusterer: {
    new (map: Map, markers: Marker[], opts: MarkerClustererOptions): MarkerClusterer;
  };
}

interface Window {
  AMap?: typeof AMap;
}
