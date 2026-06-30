import { describe, it, expect } from "vitest";
import { CreativePreview } from "./creative-preview";
import type {
  CreativePreviewMode,
  CreativePreviewViewport,
  CreativePreviewProps,
} from "./creative-preview";

describe("creative-preview", () => {
  it("exports CreativePreview", () => {
    expect(CreativePreview).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: CreativePreviewMode | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: CreativePreviewViewport | undefined = undefined;
    expect(_tc2).toBeUndefined();
    const _tc3: CreativePreviewProps | undefined = undefined;
    expect(_tc3).toBeUndefined();
  });
});
