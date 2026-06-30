import { describe, it, expect } from "vitest";
import { Countdown } from "./countdown";
import type { CountdownProps, CountdownFormat } from "./countdown";

describe("countdown", () => {
  it("exports Countdown", () => {
    expect(Countdown).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: CountdownProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: CountdownFormat | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
