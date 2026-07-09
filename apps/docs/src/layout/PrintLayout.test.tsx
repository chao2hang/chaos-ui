import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PrintLayout } from "@chaos_team/chaos-ui/layout";

describe("PrintLayout", () => {
  it("renders children inside the print root", () => {
    render(
      <PrintLayout>
        <h1>Invoice 001</h1>
      </PrintLayout>,
    );
    expect(
      screen.getByRole("heading", { name: "Invoice 001" }),
    ).toBeInTheDocument();
  });

  it("marks the container as the print root and applies the print-layout slot", () => {
    const { container } = render(
      <PrintLayout>
        <span>body</span>
      </PrintLayout>,
    );
    const el = container.querySelector(
      '[data-slot="print-layout"]',
    ) as HTMLElement;
    expect(el).toBeTruthy();
    expect(el.getAttribute("data-print-root")).not.toBeNull();
    expect(el.className).toContain("max-w-3xl");
  });

  it("injects a print stylesheet on mount and removes it on unmount", () => {
    const { unmount } = render(
      <PrintLayout>
        <span>body</span>
      </PrintLayout>,
    );
    const style = document.head.querySelector("style[data-print-layout]");
    expect(style).toBeTruthy();
    expect(style?.textContent).toContain("@media print");
    expect(style?.textContent).toContain("data-print-root");

    unmount();
    expect(document.head.querySelector("style[data-print-layout]")).toBeNull();
  });

  it("merges custom className", () => {
    const { container } = render(
      <PrintLayout className="my-print">
        <span>x</span>
      </PrintLayout>,
    );
    const el = container.querySelector(
      '[data-slot="print-layout"]',
    ) as HTMLElement;
    expect(el.className).toContain("my-print");
  });
});
