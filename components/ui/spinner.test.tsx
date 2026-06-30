import { describe, it, expect } from "vitest";
import { Spinner } from "./spinner";
import type { SpinnerProps } from "./spinner";

describe("spinner", () => {
  it("exports Spinner", () => {
    expect(Spinner).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: SpinnerProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
