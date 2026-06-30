import { describe, it, expect } from "vitest";
import { ImMessage } from "./im-message";
import type { ImMessageProps } from "./im-message";

describe("im-message", () => {
  it("exports ImMessage", () => {
    expect(ImMessage).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ImMessageProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
