import { describe, it, expect } from "vitest";
import { AttachmentPreview } from "./attachment-preview";
import type { AttachmentPreviewProps } from "./attachment-preview";

describe("attachment-preview", () => {
  it("exports AttachmentPreview", () => {
    expect(AttachmentPreview).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: AttachmentPreviewProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
