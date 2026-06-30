import { describe, it, expect } from "vitest";
import { OTPField, OTPFieldSeparator } from "./otp-field";

describe("otp-field", () => {
  it("exports OTPField", () => {
    expect(OTPField).toBeDefined();
  });

  it("exports OTPFieldSeparator", () => {
    expect(OTPFieldSeparator).toBeDefined();
  });
});
