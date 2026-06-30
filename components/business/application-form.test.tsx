import { describe, it, expect } from "vitest";
import { ApplicationForm } from "./application-form";
import type { ApplicationFormProps } from "./application-form";

describe("application-form", () => {
  it("exports ApplicationForm", () => {
    expect(ApplicationForm).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ApplicationFormProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
