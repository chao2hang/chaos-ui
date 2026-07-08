// apps/docs/types/amap.d.ts
declare namespace AMap {
  class Map {
    constructor(container: string | HTMLElement, opts?: Record<string, unknown>);
    destroy(): void;
    setCenter(center: [number, number]): void;
    setZoom(zoom: number): void;
    add(obj: unknown): void;
    remove(obj: unknown): void;
    clearMap(): void;
    on(event: string, handler: (...args: unknown[]) => void): void;
    off(event: string, handler: (...args: unknown[]) => void): void;
  }
  class Marker {
    constructor(opts?: Record<string, unknown>);
    setPosition(pos: [number, number]): void;
    setContent(content: string | HTMLElement): void;
    setMap(map: Map | null): void;
    on(event: string, handler: (...args: unknown[]) => void): void;
  }
  class InfoWindow {
    constructor(opts?: Record<string, unknown>);
    open(map: Map, pos: [number, number]): void;
    close(): void;
  }
  class Polyline {
    constructor(opts?: Record<string, unknown>);
    setPath(path: Array<[number, number]>): void;
    setMap(map: Map | null): void;
  }
  type MapType = "normal" | "satellite";
  type LayerType = "road" | "building" | "transportation";
}
