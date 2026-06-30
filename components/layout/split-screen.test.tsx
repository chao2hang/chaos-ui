import { describe, it, expect } from "vitest";
import { SplitScreen } from "./split-screen";
import type { SplitScreenProps } from "./split-screen";

describe("split-screen", () => {
  it("exports SplitScreen", () => {
    expect(SplitScreen).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: SplitScreenProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
