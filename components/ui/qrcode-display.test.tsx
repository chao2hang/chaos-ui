import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
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

  it("renders the qrcode-display data-slot", () => {
    const { container } = render(
      <QrCodeDisplay value="https://example.com" size={128} />,
    );
    const root = container.querySelector('[data-slot="qrcode-display"]');
    expect(root).not.toBeNull();
  });

  it("renders the inner QRCode component", () => {
    const { container } = render(
      <QrCodeDisplay value="https://example.com" size={128} />,
    );
    // QRCode renders its own data-slot="qrcode"
    const innerQr = container.querySelector('[data-slot="qrcode"]');
    expect(innerQr).not.toBeNull();
  });

  it("shows value text when showText is true", () => {
    const { getByText } = render(
      <QrCodeDisplay value="https://example.com" showText />,
    );
    expect(getByText("https://example.com")).toBeDefined();
  });

  it("hides value text when showText is false", () => {
    const { queryByText } = render(
      <QrCodeDisplay value="https://example.com" showText={false} />,
    );
    expect(queryByText("https://example.com")).toBeNull();
  });

  it("applies custom className to root wrapper", () => {
    const { container } = render(
      <QrCodeDisplay value="test" className="my-qr" />,
    );
    const root = container.querySelector('[data-slot="qrcode-display"]');
    expect(root?.classList.contains("my-qr")).toBe(true);
  });
});
