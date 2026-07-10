import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ResponsivePreview } from "./responsive-preview";
import type { ResponsivePreviewProps } from "./responsive-preview";

vi.mock("react-i18next", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as Record<string, unknown>),
    useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
  };
});

describe("ResponsivePreview", () => {
  it("exports ResponsivePreview", () => {
    expect(ResponsivePreview).toBeDefined();
  });

  it("exports types", () => {
    const _tc: ResponsivePreviewProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders children inside the frame", () => {
    render(
      <ResponsivePreview>
        <div>Hello Preview</div>
      </ResponsivePreview>,
    );
    expect(screen.getByText("Hello Preview")).toBeDefined();
  });

  it("renders device label with dimensions (desktop default)", () => {
    render(
      <ResponsivePreview>
        <div>x</div>
      </ResponsivePreview>,
    );
    // label format: "<label> (<width> × <height>)"
    expect(screen.getByText(/1024 × 768/)).toBeDefined();
  });

  it("renders mobile device label and dims", () => {
    render(
      <ResponsivePreview device="mobile">
        <div>x</div>
      </ResponsivePreview>,
    );
    expect(screen.getByText(/375 × 667/)).toBeDefined();
  });

  it("renders tablet device label and dims", () => {
    render(
      <ResponsivePreview device="tablet">
        <div>x</div>
      </ResponsivePreview>,
    );
    expect(screen.getByText(/768 × 1024/)).toBeDefined();
  });

  it("hides the label when showLabel=false", () => {
    render(
      <ResponsivePreview showLabel={false}>
        <div>x</div>
      </ResponsivePreview>,
    );
    expect(screen.queryByText(/×/)).toBeNull();
  });

  it("renders full-width frame when showFrame=false", () => {
    const { container } = render(
      <ResponsivePreview showFrame={false}>
        <div>x</div>
      </ResponsivePreview>,
    );
    // the inner frame div has no shadow-lg class
    const frame = container.querySelector(".border.rounded-lg");
    expect(frame?.className).not.toContain("shadow-lg");
  });

  it("applies custom className", () => {
    const { container } = render(
      <ResponsivePreview className="my-preview">
        <div>x</div>
      </ResponsivePreview>,
    );
    expect(container.firstChild).toBeDefined();
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain("my-preview");
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/responsive-preview");
    expect(mod.ResponsivePreview).toBeDefined();
  });
});
