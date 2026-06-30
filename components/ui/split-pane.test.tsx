import { describe, it, expect } from "vitest";
import { SplitPane } from "./split-pane";
import type { SplitPaneProps } from "./split-pane";

describe("split-pane", () => {
  it("exports SplitPane", () => {
    expect(SplitPane).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: SplitPaneProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
