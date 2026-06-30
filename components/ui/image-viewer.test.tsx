import { describe, it, expect } from "vitest";
import { ImageViewer } from "./image-viewer";
import type { ImageViewerProps, ImageViewerImage } from "./image-viewer";

describe("image-viewer", () => {
  it("exports ImageViewer", () => {
    expect(ImageViewer).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ImageViewerProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: ImageViewerImage | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
