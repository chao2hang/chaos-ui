import { describe, it, expect } from "vitest";
import { barIndexFromClientX, clamp, indexFromClientX } from "./chart-hover";

describe("chart-hover", () => {
  it("clamp bounds values", () => {
    expect(clamp(5, 0, 3)).toBe(3);
    expect(clamp(-1, 0, 3)).toBe(0);
    expect(clamp(2, 0, 3)).toBe(2);
  });

  it("indexFromClientX maps mid-plot to middle index", () => {
    // chartWidth 320, pad 8, len 5 → step = (320-16)/4 = 76
    // index 2 at x = 8 + 2*76 = 160
    const idx = indexFromClientX(160, 0, 320, 8, 320, 5);
    expect(idx).toBe(2);
  });

  it("indexFromClientX clamps edges", () => {
    expect(indexFromClientX(-50, 0, 320, 8, 320, 6)).toBe(0);
    expect(indexFromClientX(999, 0, 320, 8, 320, 6)).toBe(5);
  });

  it("indexFromClientX returns 0 for single point", () => {
    expect(indexFromClientX(100, 0, 320, 8, 320, 1)).toBe(0);
  });

  it("barIndexFromClientX picks nearest bar center", () => {
    // barW 36, gap 16, n=3 → centers at 16+18=34, 68+18=86, 120+18=138
    expect(barIndexFromClientX(34, 0, 200, 200, 3, 36, 16)).toBe(0);
    expect(barIndexFromClientX(86, 0, 200, 200, 3, 36, 16)).toBe(1);
    expect(barIndexFromClientX(138, 0, 200, 200, 3, 36, 16)).toBe(2);
  });
});
