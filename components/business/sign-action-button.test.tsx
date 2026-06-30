import { describe, it, expect } from "vitest";
import { SignActionButton } from "./sign-action-button";
import type { SignActionButtonProps } from "./sign-action-button";

describe("sign-action-button", () => {
  it("exports SignActionButton", () => {
    expect(SignActionButton).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: SignActionButtonProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
