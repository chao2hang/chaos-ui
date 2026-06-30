import { describe, it, expect } from "vitest";
import { FileUpload, FileList } from "./file-upload";

describe("file-upload", () => {
  it("exports FileUpload", () => {
    expect(FileUpload).toBeDefined();
  });

  it("exports FileList", () => {
    expect(FileList).toBeDefined();
  });
});
