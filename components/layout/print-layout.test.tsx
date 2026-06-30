import { describe, it, expect, afterAll } from "vitest";
import { render, screen } from "@testing-library/react";
import { PrintLayout } from "./print-layout";

describe("print-layout", () => {
  it("exports PrintLayout", () => {
    expect(PrintLayout).toBeDefined();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/layout/print-layout");
    expect(mod.PrintLayout).toBeDefined();
  });

  it("renders children inside the print root", () => {
    render(
      <PrintLayout>
        <h1>Invoice #1234</h1>
        <p>Total: $1,200.00</p>
      </PrintLayout>,
    );
    expect(screen.getByText("Invoice #1234")).toBeDefined();
    expect(screen.getByText("Total: $1,200.00")).toBeDefined();
  });

  it("applies data-slot and data-print-root attributes on the root", () => {
    const { container } = render(
      <PrintLayout>
        <span>content</span>
      </PrintLayout>,
    );
    const root = container.querySelector('[data-slot="print-layout"]');
    expect(root).not.toBeNull();
    // boolean attribute present (value is "true" in jsdom, but presence is what matters)
    expect(root?.hasAttribute("data-print-root")).toBe(true);
  });

  it("injects a print style tag into document.head on mount", () => {
    render(<PrintLayout><span>x</span></PrintLayout>);
    const style = document.head.querySelector('style[data-print-layout]');
    expect(style).not.toBeNull();
    expect(style?.textContent).toContain("@media print");
    expect(style?.textContent).toContain("[data-print-root]");
  });

  it("removes the print style tag on unmount", () => {
    const { unmount } = render(<PrintLayout><span>x</span></PrintLayout>);
    expect(document.head.querySelector('style[data-print-layout]')).not.toBeNull();
    unmount();
    expect(document.head.querySelector('style[data-print-layout]')).toBeNull();
  });

  it("applies a custom className merged onto the root", () => {
    const { container } = render(
      <PrintLayout className="custom-print">
        <span>x</span>
      </PrintLayout>,
    );
    const root = container.querySelector('[data-slot="print-layout"]');
    expect(root?.classList.contains("custom-print")).toBe(true);
  });

  it("forwards extra div props to the root element", () => {
    const { container } = render(
      <PrintLayout id="invoice-print" aria-label="Invoice print area">
        <span>x</span>
      </PrintLayout>,
    );
    const root = container.querySelector('[data-slot="print-layout"]');
    expect(root?.id).toBe("invoice-print");
    expect(root?.getAttribute("aria-label")).toBe("Invoice print area");
  });

  it("does not re-inject duplicate style tags across separate mounts after cleanup", () => {
    const { unmount: u1 } = render(<PrintLayout><span>a</span></PrintLayout>);
    u1();
    const { unmount: u2 } = render(<PrintLayout><span>b</span></PrintLayout>);
    const styles = document.head.querySelectorAll('style[data-print-layout]');
    expect(styles.length).toBe(1);
    u2();
  });

  // ---- Deeper interaction tests ----

  it("the injected style hides all body content in print and reveals the print root", () => {
    render(<PrintLayout><span>print me</span></PrintLayout>);
    const style = document.head.querySelector('style[data-print-layout]');
    expect(style?.textContent ?? "").toContain("body * { visibility: hidden;");
    expect(style?.textContent ?? "").toContain("[data-print-root], [data-print-root] * { visibility: visible;");
    expect(style?.textContent ?? "").toContain("position: absolute");
  });

  it("replaces (not duplicates) the style tag when re-mounted in the same document after cleanup", () => {
    const { unmount: u1 } = render(<PrintLayout><span>a</span></PrintLayout>);
    u1();
    expect(document.head.querySelectorAll('style[data-print-layout]').length).toBe(0);
    render(<PrintLayout><span>b</span></PrintLayout>);
    expect(document.head.querySelectorAll('style[data-print-layout]').length).toBe(1);
  });

  it("renders mixed children (headings, lists, tables) inside the print root", () => {
    render(
      <PrintLayout>
        <h1>Invoice #1234</h1>
        <table>
          <thead><tr><th>Item</th></tr></thead>
          <tbody><tr><td>Widget</td></tr></tbody>
        </table>
      </PrintLayout>,
    );
    expect(screen.getByText("Invoice #1234")).toBeDefined();
    expect(screen.getByText("Item").tagName).toBe("TH");
    expect(screen.getByText("Widget").tagName).toBe("TD");
  });

  it("combines a custom className with the base print classes on the root", () => {
    const { container } = render(
      <PrintLayout className="bg-paper">
        <span>x</span>
      </PrintLayout>,
    );
    const root = container.querySelector('[data-slot="print-layout"]');
    expect(root?.classList.contains("bg-paper")).toBe(true);
    expect(root?.classList.contains("max-w-3xl")).toBe(true);
  });

  it("the print root has no children when none are passed", () => {
    const { container } = render(<PrintLayout />);
    const root = container.querySelector('[data-slot="print-layout"]');
    expect(root?.textContent ?? "").toBe("");
  });

  it("marks the style element with the data-print-layout attribute for cleanup targeting", () => {
    render(<PrintLayout><span>x</span></PrintLayout>);
    const style = document.head.querySelector('style[data-print-layout]');
    expect(style?.getAttribute("data-print-layout")).not.toBeNull();
  });

  it("does not throw when the effect runs in a jsdom environment (document is defined)", () => {
    // In jsdom, `typeof document === "undefined"` is false, so the early-return
    // SSR guard (line 10) is intentionally not exercised here. This test confirms
    // the happy path runs without error in a browser-like environment.
    expect(() => render(<PrintLayout><span>x</span></PrintLayout>)).not.toThrow();
  });
});

// Ensure no leftover style tags leak between describe blocks.
afterAll(() => {
  const leftover = document.head.querySelector('style[data-print-layout]');
  if (leftover) leftover.remove();
});
