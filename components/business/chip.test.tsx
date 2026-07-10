import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Chip } from "./chip";

vi.mock("react-i18next", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as Record<string, unknown>),
    useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
  };
});

describe("Chip", () => {
  it("exports Chip", () => {
    expect(Chip).toBeDefined();
  });

  it("renders its children text", () => {
    render(<Chip>Apple</Chip>);
    expect(screen.getByText("Apple")).toBeDefined();
  });

  it("defaults to the default variant and exposes data-variant", () => {
    const { container } = render(<Chip>Default</Chip>);
    const root = container.querySelector('[data-slot="chip"]') as HTMLElement;
    expect(root).not.toBeNull();
    expect(root.getAttribute("data-variant")).toBe("default");
  });

  it("renders a leading icon when provided", () => {
    const { container } = render(
      <Chip icon={<span data-testid="lead-icon">★</span>}>Starred</Chip>,
    );
    expect(screen.getByTestId("lead-icon")).toBeDefined();
    expect(screen.getByText("Starred")).toBeDefined();
    void container;
  });

  it("does not render a remove button when removable is false", () => {
    render(<Chip>NoRemove</Chip>);
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("renders a remove button with an accessible label when removable", () => {
    render(<Chip removable>Removable</Chip>);
    expect(screen.getByRole("button", { name: "chip.remove" })).toBeDefined();
  });

  it("calls onRemove when the remove button is clicked", () => {
    const onRemove = vi.fn();
    render(
      <Chip removable onRemove={onRemove}>
        Removable
      </Chip>,
    );
    fireEvent.click(screen.getByRole("button", { name: "chip.remove" }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it("applies each variant to data-variant", () => {
    const variants = [
      "default",
      "primary",
      "success",
      "warning",
      "destructive",
      "info",
      "outline",
    ] as const;
    for (const variant of variants) {
      const { unmount } = render(<Chip variant={variant}>{variant}</Chip>);
      const root = screen
        .getByText(variant)
        .closest('[data-slot="chip"]') as HTMLElement;
      expect(root.getAttribute("data-variant")).toBe(variant);
      unmount();
    }
  });

  it("applies size classes for each size", () => {
    for (const size of ["sm", "default", "lg"] as const) {
      const { unmount } = render(<Chip size={size}>{size}</Chip>);
      const root = screen
        .getByText(size)
        .closest('[data-slot="chip"]') as HTMLElement;
      expect(root.className.length).toBeGreaterThan(0);
      unmount();
    }
  });

  it("forwards extra span props", () => {
    render(
      <Chip data-testid="chip" title="tooltip">
        X
      </Chip>,
    );
    const root = screen.getByTestId("chip");
    expect(root.getAttribute("title")).toBe("tooltip");
  });

  it("merges a custom className", () => {
    render(
      <Chip className="my-cls" data-testid="chip">
        Y
      </Chip>,
    );
    expect(screen.getByTestId("chip").className).toContain("my-cls");
  });
});
