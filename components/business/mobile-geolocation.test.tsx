import { describe, it, expect } from "vitest";
import { MobileGeolocation } from "./mobile-geolocation";
import type { MobileGeolocationProps } from "./mobile-geolocation";

describe("mobile-geolocation", () => {
  it("exports MobileGeolocation", () => {
    expect(MobileGeolocation).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: MobileGeolocationProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
