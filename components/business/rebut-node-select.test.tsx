import { describe, it, expect } from "vitest";
import { RebutNodeSelect } from "./rebut-node-select";
import type { RebutNodeSelectProps } from "./rebut-node-select";

describe("rebut-node-select", () => {
  it("exports RebutNodeSelect", () => {
    expect(RebutNodeSelect).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: RebutNodeSelectProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
