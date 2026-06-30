import { describe, it, expect } from "vitest";
import {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  luminance,
  contrastRatio,
  meetsWCAGAA,
  lighten,
  darken,
  generatePalette,
} from "@/lib/color";

describe("lib/color", () => {
  it("hexToRgb", () => {
    expect(hexToRgb("#ffffff")).toEqual({ r: 255, g: 255, b: 255 });
    expect(hexToRgb("#000")).toEqual({ r: 0, g: 0, b: 0 });
    expect(hexToRgb("invalid")).toBeNull();
  });
  it("rgbToHex", () => {
    expect(rgbToHex(255, 255, 255)).toBe("#ffffff");
    expect(rgbToHex(0, 0, 0)).toBe("#000000");
  });
  it("rgbToHsl/hslToRgb roundtrip", () => {
    const hsl = rgbToHsl({ r: 255, g: 0, b: 0 });
    const rgb = hslToRgb(hsl);
    expect(Math.round(rgb.r)).toBe(255);
  });
  it("luminance", () => {
    expect(luminance("#ffffff")).toBeGreaterThan(0.9);
    expect(luminance("#000000")).toBe(0);
  });
  it("contrastRatio", () => {
    expect(contrastRatio("#000", "#fff")).toBeCloseTo(21, 0);
  });
  it("meetsWCAGAA", () => {
    expect(meetsWCAGAA("#000", "#fff")).toBe(true);
    expect(meetsWCAGAA("#777", "#888")).toBe(false);
  });
  it("lighten/darken", () => {
    expect(lighten("#000000", 0.5)).toMatch(/^#/);
    expect(darken("#ffffff", 0.5)).toMatch(/^#/);
  });
  it("generatePalette", () => {
    const palette = generatePalette("#336699");
    expect(palette.length).toBe(10);
  });
});
