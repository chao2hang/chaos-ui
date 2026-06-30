import { describe, it, expect } from "vitest";
import { VirtualList } from "./virtual-list";
import type { VirtualListProps } from "./virtual-list";

describe("virtual-list", () => {
  it("exports VirtualList", () => {
    expect(VirtualList).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: VirtualListProps<unknown> | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
