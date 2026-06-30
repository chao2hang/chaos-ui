import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MobileQrCodeScanner } from "./mobile-qrcode-scanner";
import type { MobileQrCodeScannerProps } from "./mobile-qrcode-scanner";

// jsdom has no mediaDevices and no BarcodeDetector; the component must degrade
// to a visible "unsupported" state with a manual-input fallback.

describe("MobileQrCodeScanner", () => {
  beforeEach(() => {
    Object.defineProperty(navigator, "mediaDevices", {
      configurable: true,
      value: undefined,
    });
    delete (window as unknown as { BarcodeDetector?: unknown }).BarcodeDetector;
  });

  it("renders an unsupported status message", () => {
    render(<MobileQrCodeScanner />);
    expect(screen.getByText("当前环境不支持扫码，请手动输入")).toBeDefined();
  });

  it("renders a manual input fallback", () => {
    render(<MobileQrCodeScanner />);
    expect(screen.getByPlaceholderText("手动输入二维码内容")).toBeDefined();
    expect(screen.getByRole("button", { name: "确认" })).toBeDefined();
  });

  it("invokes onScan with the manually entered value", () => {
    let scanned = "";
    render(<MobileQrCodeScanner onScan={(v) => (scanned = v)} />);
    fireEvent.change(screen.getByPlaceholderText("手动输入二维码内容"), {
      target: { value: "https://example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: "确认" }));
    expect(scanned).toBe("https://example.com");
  });

  it("exports types", () => {
    const _t: MobileQrCodeScannerProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
