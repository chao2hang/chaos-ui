import { describe, it, expect } from "vitest";
import { Result } from "./result";
import type { ResultProps, ResultStatus } from "./result";

describe("result", () => {
  it("exports Result", () => {
    expect(Result).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ResultProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: ResultStatus | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
