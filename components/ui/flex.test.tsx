import { describe, it, expect } from "vitest";
import { Flex } from "./flex";
import type { FlexProps } from "./flex";

describe("flex", () => {
  it("exports Flex", () => {
    expect(Flex).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: FlexProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
