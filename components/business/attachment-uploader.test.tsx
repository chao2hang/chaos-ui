import { describe, it, expect } from "vitest";
import { AttachmentUploader } from "./attachment-uploader";
import type { AttachmentUploaderProps } from "./attachment-uploader";

describe("attachment-uploader", () => {
  it("exports AttachmentUploader", () => {
    expect(AttachmentUploader).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: AttachmentUploaderProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
