import { describe, it, expect } from "vitest";
import { MobileQrCodeScanner } from "./mobile-qrcode-scanner";
import type { MobileQrCodeScannerProps } from "./mobile-qrcode-scanner";

describe("mobile-qrcode-scanner", () => {
  it("exports MobileQrCodeScanner", () => {
    expect(MobileQrCodeScanner).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: MobileQrCodeScannerProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
