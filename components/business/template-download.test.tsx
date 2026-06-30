import { describe, it, expect } from "vitest";
import { TemplateDownload } from "./template-download";
import type { TemplateDownloadProps } from "./template-download";

describe("template-download", () => {
  it("exports TemplateDownload", () => {
    expect(TemplateDownload).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: TemplateDownloadProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
