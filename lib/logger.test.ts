import { describe, it, expect } from "vitest";
import { logger } from "./logger";
import type { LogLevel } from "./logger";

describe("logger", () => {
  it("exports logger", () => {
    expect(logger).toBeDefined();
  });
  it("exports types", () => {
    const _tc1: LogLevel | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
