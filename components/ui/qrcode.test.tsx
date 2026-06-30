import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { QRCode } from "./qrcode";
import type { QRCodeProps } from "./qrcode";

describe("QRCode", () => {
  it("exports QRCode", () => {
    expect(QRCode).toBeDefined();
  });

  it("renders a container with data-slot", async () => {
    const { container } = render(<QRCode value="https://example.com" />);
    expect(
      container.querySelector('[data-slot="qrcode"]'),
    ).not.toBeNull();
    // svg data is set asynchronously
    await waitFor(() => {
      const span = container.querySelector(
        '[data-slot="qrcode"] span',
      ) as HTMLElement;
      expect(span.innerHTML).not.toBe("");
    });
  });

  it("injects an svg into the span after generation", async () => {
    const { container } = render(<QRCode value="hello" />);
    await waitFor(() => {
      const span = container.querySelector(
        '[data-slot="qrcode"] span',
      ) as HTMLElement;
      expect(span.innerHTML.toLowerCase()).toContain("<svg");
    });
  });

  it("renders a canvas when renderAs=canvas", async () => {
    const { container } = render(
      <QRCode value="canvas-test" renderAs="canvas" />,
    );
    expect(
      container.querySelector('[data-slot="qrcode"] canvas'),
    ).not.toBeNull();
  });

  it("renders error fallback when generation fails", async () => {
    // An empty value triggers an error from the qrcode library.
    render(<QRCode value="" />);
    await waitFor(() => {
      expect(screen.getByText("QR Error")).toBeDefined();
    });
    const errEl = document.querySelector(
      '[data-slot="qrcode"]',
    ) as HTMLElement;
    expect(errEl.className).toContain("border-destructive");
  });

  it("applies custom className", () => {
    const { container } = render(
      <QRCode value="x" className="my-qr" />,
    );
    const el = container.querySelector(
      '[data-slot="qrcode"]',
    ) as HTMLElement;
    expect(el.className).toContain("my-qr");
  });

  it("exports types", () => {
    const _tc1: QRCodeProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    // touch defaults shape to satisfy type usage
    const _p: QRCodeProps = { value: "x", size: 64, level: "H" };
    expect(_p.value).toBe("x");
  });
});
