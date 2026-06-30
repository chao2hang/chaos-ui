import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ErrorLayout } from "./error-layout";

describe("error-layout", () => {
  it("exports ErrorLayout", () => {
    expect(ErrorLayout).toBeDefined();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/layout/error-layout");
    expect(mod.ErrorLayout).toBeDefined();
  });

  it("renders children inside the layout root", () => {
    render(
      <ErrorLayout>
        <h1>Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </ErrorLayout>,
    );
    expect(screen.getByText("Page Not Found")).toBeDefined();
    expect(screen.getByText("The page you are looking for does not exist.")).toBeDefined();
  });

  it("applies data-slot attribute on the root element", () => {
    const { container } = render(<ErrorLayout><span>boom</span></ErrorLayout>);
    const root = container.querySelector('[data-slot="error-layout"]');
    expect(root).not.toBeNull();
    expect(root?.tagName).toBe("DIV");
  });

  it("renders an action button child and forwards extra div props", () => {
    render(
      <ErrorLayout role="alert" aria-live="assertive">
        <button type="button">Go Home</button>
      </ErrorLayout>,
    );
    const btn = screen.getByText("Go Home");
    expect(btn.tagName).toBe("BUTTON");
    const root = screen.getByRole("alert");
    expect(root.getAttribute("aria-live")).toBe("assertive");
  });

  it("applies a custom className merged onto the root", () => {
    const { container } = render(
      <ErrorLayout className="custom-error">
        <span>x</span>
      </ErrorLayout>,
    );
    const root = container.querySelector('[data-slot="error-layout"]');
    expect(root?.classList.contains("custom-error")).toBe(true);
  });

  it("renders nothing extra when children are empty", () => {
    const { container } = render(<ErrorLayout />);
    const root = container.querySelector('[data-slot="error-layout"]');
    expect(root).not.toBeNull();
    expect(root?.textContent).toBe("");
  });

  it("applies default layout classes for centering and background", () => {
    const { container } = render(<ErrorLayout />);
    const root = container.querySelector('[data-slot="error-layout"]');
    expect(root?.classList.contains("min-h-screen")).toBe(true);
    expect(root?.classList.contains("flex")).toBe(true);
    expect(root?.classList.contains("items-center")).toBe(true);
    expect(root?.classList.contains("justify-center")).toBe(true);
    expect(root?.classList.contains("bg-muted/30")).toBe(true);
    expect(root?.classList.contains("p-4")).toBe(true);
  });

  it("renders multiple children of mixed types", () => {
    render(
      <ErrorLayout>
        <h1>404</h1>
        <p>Page Not Found</p>
        <button type="button">Go Home</button>
      </ErrorLayout>,
    );
    expect(screen.getByText("404")).toBeDefined();
    expect(screen.getByText("Page Not Found")).toBeDefined();
    expect(screen.getByText("Go Home")).toBeDefined();
  });
});
