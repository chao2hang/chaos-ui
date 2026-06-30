import { describe, it, expect } from "vitest";
import { QrCodeDisplay } from "./qrcode-display";
import type { QrCodeDisplayProps } from "./qrcode-display";

describe("qrcode-display", () => {
  it("exports QrCodeDisplay", () => {
    expect(QrCodeDisplay).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: QrCodeDisplayProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
