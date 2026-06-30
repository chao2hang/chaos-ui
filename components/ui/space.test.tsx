import { describe, it, expect } from "vitest";
import { Space } from "./space";
import type { SpaceProps } from "./space";

describe("space", () => {
  it("exports Space", () => {
    expect(Space).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: SpaceProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
