import { describe, it, expect } from "vitest";
import { PasteUpload } from "./paste-upload";
import type { PasteUploadProps } from "./paste-upload";

describe("paste-upload", () => {
  it("exports PasteUpload", () => {
    expect(PasteUpload).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: PasteUploadProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
