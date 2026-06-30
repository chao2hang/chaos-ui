import { describe, it, expect } from "vitest";
import { ResponsivePreview } from "./responsive-preview";
import type { ResponsivePreviewProps } from "./responsive-preview";

describe("responsive-preview", () => {
  it("exports ResponsivePreview", () => {
    expect(ResponsivePreview).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ResponsivePreviewProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
