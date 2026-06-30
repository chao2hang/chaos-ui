import { describe, it, expect } from "vitest";
import { QRCode } from "./qrcode";
import type { QRCodeProps } from "./qrcode";

describe("qrcode", () => {
  it("exports QRCode", () => {
    expect(QRCode).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: QRCodeProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
