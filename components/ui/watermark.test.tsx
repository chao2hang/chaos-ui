import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { Watermark } from "@/components/ui/watermark";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
}));

describe("Watermark", () => {
  it("renders without crashing with default gap", () => {
    const { container } = render(<Watermark text="DRAFT" />);
    expect(container.querySelector('[data-slot="watermark"]')).not.toBeNull();
  });

  it("renders with inline gap array (no infinite re-render)", () => {
    // Inline gap array recreates every render; the effect must use destructured
    // primitives (gapX/gapY) so it doesn't recompute tiles + rebind resize
    // every render. This test mainly guards against the re-render storm.
    const { container } = render(
      <Watermark text="DRAFT" gap={[100, 80]} fullPage />,
    );
    expect(container.querySelector('[data-slot="watermark"]')).not.toBeNull();
  });

  it("renders non-fullPage mode", () => {
    const { container } = render(
      <Watermark text="DRAFT" fullPage={false} />,
    );
    expect(container.querySelector('[data-slot="watermark"]')).not.toBeNull();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/ui/watermark");
    expect(mod.Watermark).toBeDefined();
  });
});
