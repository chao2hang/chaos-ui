import { describe, it, expect } from "vitest";
import { Image, ImageGroup } from "./image";
import type { ImageProps } from "./image";

describe("image", () => {
  it("exports Image", () => {
    expect(Image).toBeDefined();
  });

  it("exports ImageGroup", () => {
    expect(ImageGroup).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ImageProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
