import { describe, it, expect } from "vitest";
import {
  Slider,
  SliderControl,
  SliderTrack,
  SliderIndicator,
  SliderThumb,
} from "./slider";

describe("slider", () => {
  it("exports Slider", () => {
    expect(Slider).toBeDefined();
  });

  it("exports SliderControl", () => {
    expect(SliderControl).toBeDefined();
  });

  it("exports SliderTrack", () => {
    expect(SliderTrack).toBeDefined();
  });

  it("exports SliderIndicator", () => {
    expect(SliderIndicator).toBeDefined();
  });

  it("exports SliderThumb", () => {
    expect(SliderThumb).toBeDefined();
  });
});
