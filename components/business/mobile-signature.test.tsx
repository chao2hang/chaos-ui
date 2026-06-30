import { describe, it, expect } from "vitest";
import { MobileSignature } from "./mobile-signature";
import type { MobileSignatureProps } from "./mobile-signature";

describe("mobile-signature", () => {
  it("exports MobileSignature", () => {
    expect(MobileSignature).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: MobileSignatureProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
