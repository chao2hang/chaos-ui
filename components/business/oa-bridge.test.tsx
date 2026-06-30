import { describe, it, expect } from "vitest";
import { OaBridge } from "./oa-bridge";
import type { OaBridgeProps } from "./oa-bridge";

describe("oa-bridge", () => {
  it("exports OaBridge", () => {
    expect(OaBridge).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: OaBridgeProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
