import { describe, it, expect } from "vitest";
import { ChatImageGallery } from "./chat-image-gallery";
import type { ChatImageGalleryProps } from "./chat-image-gallery";

describe("chat-image-gallery", () => {
  it("exports ChatImageGallery", () => {
    expect(ChatImageGallery).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ChatImageGalleryProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
