import { describe, it, expect } from "vitest";
import { ImageGallery } from "./image-gallery";
import type { ImageGalleryProps } from "./image-gallery";

describe("image-gallery", () => {
  it("exports ImageGallery", () => {
    expect(ImageGallery).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ImageGalleryProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
