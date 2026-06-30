import { describe, it, expect } from "vitest";
import { MobileCamera } from "./mobile-camera";
import type { MobileCameraProps } from "./mobile-camera";

describe("mobile-camera", () => {
  it("exports MobileCamera", () => {
    expect(MobileCamera).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: MobileCameraProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
