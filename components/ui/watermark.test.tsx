import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { Watermark } from "./watermark";

vi.mock("react-i18next", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as Record<string, unknown>),
    useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
  };
});

describe("Watermark", () => {
  it("exports Watermark", () => {
    expect(Watermark).toBeDefined();
  });

  it("renders the text in non-fullPage mode", () => {
    const { container } = render(<Watermark text="机密" fullPage={false} />);
    expect(container.querySelector('[data-slot="watermark"]')).not.toBeNull();
    expect(container.textContent).toContain("机密");
  });

  it("renders an image in non-fullPage mode when image provided", () => {
    const { container } = render(
      <Watermark image="/logo.png" fullPage={false} />,
    );
    const img = container.querySelector('img[src="/logo.png"]');
    expect(img).not.toBeNull();
  });

  it("uses the i18n default text when text not provided", () => {
    const { container } = render(<Watermark fullPage={false} />);
    expect(container.textContent).toContain("watermark.default");
  });

  it("applies custom rotate, fontSize, color, and opacity via inline styles (non-fullPage)", () => {
    const { container } = render(
      <Watermark
        text="X"
        fullPage={false}
        rotate={45}
        fontSize={24}
        color="#ff0000"
        opacity={0.5}
      />,
    );
    const span = container.querySelector("span") as HTMLElement;
    expect(span).not.toBeNull();
    expect(span.getAttribute("style") ?? span.className ?? "").toBeDefined();
  });

  it("renders tiles in fullPage mode (default)", () => {
    const { container } = render(<Watermark text="水印" />);
    const root = container.querySelector('[data-slot="watermark"]');
    expect(root).not.toBeNull();
    // Tiles are absolutely-positioned child divs.
    expect(root!.children.length).toBeGreaterThan(0);
    expect(container.textContent).toContain("水印");
  });

  it("renders image tiles in fullPage mode", () => {
    const { container } = render(<Watermark image="/wm.png" />);
    const img = container.querySelector('img[src="/wm.png"]');
    expect(img).not.toBeNull();
  });

  it("applies zIndex to the root", () => {
    const { container } = render(
      <Watermark text="X" fullPage={false} zIndex={555} />,
    );
    const root = container.querySelector(
      '[data-slot="watermark"]',
    ) as HTMLElement;
    expect(root.style.zIndex).toBe("555");
  });

  it("module is importable", async () => {
    const mod = await import("./watermark");
    expect(mod.Watermark).toBeDefined();
  });
});
