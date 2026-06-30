import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  FormGrid,
  FormGridItem,
  formGridVariants,
} from "./form-grid";
import type { FormGridProps, FormGridItemProps } from "./form-grid";

describe("FormGrid", () => {
  it("exports FormGrid", () => {
    expect(FormGrid).toBeDefined();
  });

  it("exports FormGridItem", () => {
    expect(FormGridItem).toBeDefined();
  });

  it("exports formGridVariants", () => {
    expect(formGridVariants).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: FormGridProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: FormGridItemProps | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });

  it("renders children inside the form-grid slot", () => {
    const { container } = render(
      <FormGrid>
        <span>field a</span>
        <span>field b</span>
      </FormGrid>,
    );
    const root = container.querySelector('[data-slot="form-grid"]');
    expect(root).not.toBeNull();
    expect(screen.getByText("field a")).toBeDefined();
    expect(screen.getByText("field b")).toBeDefined();
  });

  it("applies default (2 columns, default gap) classes", () => {
    const { container } = render(<FormGrid>x</FormGrid>);
    const root = container.querySelector(
      '[data-slot="form-grid"]',
    ) as HTMLElement;
    expect(root.className).toContain("sm:grid-cols-2");
    expect(root.className).toContain("gap-4");
  });

  it("applies 3-column layout", () => {
    const { container } = render(
      <FormGrid columns={3}>x</FormGrid>,
    );
    const root = container.querySelector(
      '[data-slot="form-grid"]',
    ) as HTMLElement;
    expect(root.className).toContain("lg:grid-cols-3");
  });

  it("applies 4-column layout", () => {
    const { container } = render(
      <FormGrid columns={4}>x</FormGrid>,
    );
    const root = container.querySelector(
      '[data-slot="form-grid"]',
    ) as HTMLElement;
    expect(root.className).toContain("lg:grid-cols-4");
  });

  it("applies 1-column layout", () => {
    const { container } = render(
      <FormGrid columns={1}>x</FormGrid>,
    );
    const root = container.querySelector(
      '[data-slot="form-grid"]',
    ) as HTMLElement;
    expect(root.className).toContain("grid-cols-1");
  });

  it("applies sm gap", () => {
    const { container } = render(<FormGrid gap="sm">x</FormGrid>);
    const root = container.querySelector(
      '[data-slot="form-grid"]',
    ) as HTMLElement;
    expect(root.className).toContain("gap-2");
  });

  it("applies lg gap", () => {
    const { container } = render(<FormGrid gap="lg">x</FormGrid>);
    const root = container.querySelector(
      '[data-slot="form-grid"]',
    ) as HTMLElement;
    expect(root.className).toContain("gap-6");
  });

  it("merges a custom className", () => {
    const { container } = render(
      <FormGrid className="my-grid">x</FormGrid>,
    );
    const root = container.querySelector(
      '[data-slot="form-grid"]',
    ) as HTMLElement;
    expect(root.className).toContain("my-grid");
  });

  it("forwards extra div props", () => {
    render(<FormGrid data-testid="fg">x</FormGrid>);
    expect(screen.getByTestId("fg")).toBeDefined();
  });
});

describe("FormGridItem", () => {
  it("renders children inside the form-grid-item slot", () => {
    const { container } = render(
      <FormGridItem>
        <span>cell</span>
      </FormGridItem>,
    );
    const root = container.querySelector('[data-slot="form-grid-item"]');
    expect(root).not.toBeNull();
    expect(screen.getByText("cell")).toBeDefined();
  });

  it("applies no span classes when span is 1/undefined", () => {
    const { container } = render(<FormGridItem>x</FormGridItem>);
    const root = container.querySelector(
      '[data-slot="form-grid-item"]',
    ) as HTMLElement;
    expect(root.className).not.toContain("col-span");
  });

  it("applies span=2 column-span classes", () => {
    const { container } = render(<FormGridItem span={2}>x</FormGridItem>);
    const root = container.querySelector(
      '[data-slot="form-grid-item"]',
    ) as HTMLElement;
    expect(root.className).toContain("sm:col-span-2");
  });

  it("applies span=3 column-span classes", () => {
    const { container } = render(<FormGridItem span={3}>x</FormGridItem>);
    const root = container.querySelector(
      '[data-slot="form-grid-item"]',
    ) as HTMLElement;
    expect(root.className).toContain("lg:col-span-3");
  });

  it("applies span=4 column-span classes", () => {
    const { container } = render(<FormGridItem span={4}>x</FormGridItem>);
    const root = container.querySelector(
      '[data-slot="form-grid-item"]',
    ) as HTMLElement;
    expect(root.className).toContain("lg:col-span-4");
  });

  it("merges a custom className", () => {
    const { container } = render(
      <FormGridItem className="my-item">x</FormGridItem>,
    );
    const root = container.querySelector(
      '[data-slot="form-grid-item"]',
    ) as HTMLElement;
    expect(root.className).toContain("my-item");
  });
});

describe("formGridVariants", () => {
  it("returns a class string for default variants", () => {
    const out = formGridVariants();
    expect(typeof out).toBe("string");
    expect(out).toContain("grid");
  });

  it("returns a class string for explicit column count", () => {
    expect(formGridVariants({ columns: 4 })).toContain("lg:grid-cols-4");
  });
});
