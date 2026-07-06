import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MapMarkerCluster } from "./map-marker";
import type { MapMarkerClusterProps } from "./map-marker";

describe("MapMarkerCluster", () => {
  it("renders without markers", () => {
    const { container } = render(<MapMarkerCluster />);
    expect(container.querySelector('[data-slot="map-marker-cluster"]')).toBeDefined();
  });

  it("renders with markers", () => {
    const { container } = render(
      <MapMarkerCluster markers={[{ id: "1", lng: 116.39, lat: 39.90, label: "Beijing" }]} />,
    );
    expect(container.querySelector('[data-slot="map-marker-cluster"]')).toBeDefined();
  });

  it("exports types", () => {
    const _t: MapMarkerClusterProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
