import { describe, it, expect } from "vitest";
import { EmbedLayout } from "./embed-layout";
import type { EmbedLayoutProps } from "./embed-layout";

describe("embed-layout", () => {
  it("exports EmbedLayout", () => {
    expect(EmbedLayout).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: EmbedLayoutProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
