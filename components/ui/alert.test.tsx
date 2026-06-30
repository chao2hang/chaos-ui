import { describe, it, expect } from "vitest";
import { Alert, AlertTitle, AlertDescription, alertVariants } from "./alert";
import type { AlertProps, AlertVariant } from "./alert";

describe("alert", () => {
  it("exports Alert", () => {
    expect(Alert).toBeDefined();
  });

  it("exports AlertTitle", () => {
    expect(AlertTitle).toBeDefined();
  });

  it("exports AlertDescription", () => {
    expect(AlertDescription).toBeDefined();
  });

  it("exports alertVariants", () => {
    expect(alertVariants).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: AlertProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: AlertVariant | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
