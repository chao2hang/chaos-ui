import { describe, it, expect } from "vitest";
import { DialogFormBody, FormStack } from "./dialog-form-body";
import type { DialogFormBodyProps, FormStackProps } from "./dialog-form-body";

describe("dialog-form-body", () => {
  it("exports DialogFormBody", () => {
    expect(DialogFormBody).toBeDefined();
  });

  it("exports FormStack", () => {
    expect(FormStack).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: DialogFormBodyProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: FormStackProps | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
