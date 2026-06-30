import { describe, it, expect } from "vitest";
import { FullscreenToggle } from "./fullscreen-toggle";
import type { FullscreenToggleProps } from "./fullscreen-toggle";

describe("fullscreen-toggle", () => {
  it("exports FullscreenToggle", () => {
    expect(FullscreenToggle).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: FullscreenToggleProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
