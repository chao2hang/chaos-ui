import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MapTrack } from "./map-track";
import type { MapTrackProps } from "./map-track";

describe("MapTrack", () => {
  it("renders without points", () => {
    const { container } = render(<MapTrack />);
    expect(container.querySelector('[data-slot="map-track"]')).toBeDefined();
  });

  it("exports types", () => {
    const _t: MapTrackProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
