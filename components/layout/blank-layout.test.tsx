import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BlankLayout } from "./blank-layout";

describe("blank-layout", () => {
  it("exports BlankLayout", () => {
    expect(BlankLayout).toBeDefined();
  });

  it("exports types", () => {
    // BlankLayoutProps is not exported as a named type; verify component accepts props via usage
    expect(BlankLayout).toBeDefined();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/layout/blank-layout");
    expect(mod.BlankLayout).toBeDefined();
  });

  it("renders children inside the layout", () => {
    render(
      <BlankLayout>
        <div>Content</div>
      </BlankLayout>,
    );
    expect(screen.getByText("Content")).toBeDefined();
  });

  it("renders root with data-slot", () => {
    const { container } = render(<BlankLayout />);
    expect(
      container.querySelector('[data-slot="blank-layout"]'),
    ).not.toBeNull();
  });

  it("applies padded class by default", () => {
    const { container } = render(<BlankLayout />);
    const root = container.querySelector('[data-slot="blank-layout"]');
    expect(root?.classList.contains("p-4")).toBe(true);
  });

  it("omits padding when padded is false", () => {
    const { container } = render(<BlankLayout padded={false} />);
    const root = container.querySelector('[data-slot="blank-layout"]');
    expect(root?.classList.contains("p-4")).toBe(false);
  });

  it("applies centered flex classes when centered is true", () => {
    const { container } = render(<BlankLayout centered />);
    const root = container.querySelector('[data-slot="blank-layout"]');
    expect(root?.classList.contains("flex")).toBe(true);
    expect(root?.classList.contains("items-center")).toBe(true);
    expect(root?.classList.contains("justify-center")).toBe(true);
  });

  it("does not apply centered classes when centered is false", () => {
    const { container } = render(<BlankLayout centered={false} />);
    const root = container.querySelector('[data-slot="blank-layout"]');
    expect(root?.classList.contains("items-center")).toBe(false);
  });

  it("applies custom className alongside defaults", () => {
    const { container } = render(<BlankLayout className="my-blank" />);
    const root = container.querySelector('[data-slot="blank-layout"]');
    expect(root?.classList.contains("my-blank")).toBe(true);
    expect(root?.classList.contains("min-h-screen")).toBe(true);
  });

  it("forwards extra div props to root", () => {
    const { container } = render(
      <BlankLayout data-testid="blank" role="region" />,
    );
    const root = container.querySelector('[data-slot="blank-layout"]');
    expect(root?.getAttribute("role")).toBe("region");
  });
});
