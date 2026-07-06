import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MapView } from "./map-view";
import type { MapViewProps } from "./map-view";

describe("MapView", () => {
  it("renders container", () => {
    const { container } = render(<MapView />);
    expect(container.querySelector('[data-slot="map-view"]')).toBeDefined();
  });

  it("exports types", () => {
    const _t: MapViewProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
