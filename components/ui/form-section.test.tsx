import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FormSection, formSectionVariants } from "./form-section";
import type { FormSectionProps } from "./form-section";

describe("FormSection", () => {
  it("exports FormSection", () => {
    expect(FormSection).toBeDefined();
  });

  it("exports formSectionVariants", () => {
    expect(formSectionVariants).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: FormSectionProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });

  it("renders title and children", () => {
    render(
      <FormSection title="Basic Info">
        <input aria-label="name" />
      </FormSection>,
    );
    expect(screen.getByText("Basic Info")).toBeDefined();
    expect(screen.getByLabelText("name")).toBeDefined();
  });

  it("renders description under title", () => {
    render(
      <FormSection title="Info" description="Fill these out">
        body
      </FormSection>,
    );
    expect(screen.getByText("Fill these out")).toBeDefined();
  });

  it("renders a required asterisk when required", () => {
    render(
      <FormSection title="Contact" required>
        body
      </FormSection>,
    );
    const heading = screen.getByText("Contact");
    expect(heading.textContent).toContain("*");
  });

  it("renders extra node in the header", () => {
    render(
      <FormSection title="Sec" extra={<button type="button">Edit</button>}>
        body
      </FormSection>,
    );
    expect(screen.getByText("Edit")).toBeDefined();
  });

  it("renders children without a header when no title/description", () => {
    const { container } = render(
      <FormSection>
        <span>child</span>
      </FormSection>,
    );
    expect(screen.getByText("child")).toBeDefined();
    // No h3 header should be rendered.
    expect(container.querySelector("h3")).toBeNull();
  });

  it("applies the elevated variant", () => {
    const { container } = render(
      <FormSection variant="elevated" title="t">
        x
      </FormSection>,
    );
    const root = container.querySelector(
      '[data-slot="form-section"]',
    ) as HTMLElement;
    expect(root.className).toContain("shadow-sm");
  });

  it("applies the flat variant", () => {
    const { container } = render(
      <FormSection variant="flat" title="t">
        x
      </FormSection>,
    );
    const root = container.querySelector(
      '[data-slot="form-section"]',
    ) as HTMLElement;
    expect(root.className).toContain("border-0");
    expect(root.className).toContain("bg-transparent");
  });

  it("merges a custom className", () => {
    const { container } = render(
      <FormSection className="my-sec" title="t">
        x
      </FormSection>,
    );
    const root = container.querySelector(
      '[data-slot="form-section"]',
    ) as HTMLElement;
    expect(root.className).toContain("my-sec");
  });

  it("starts expanded and renders children when not collapsible", () => {
    render(
      <FormSection title="t">
        <span>visible-body</span>
      </FormSection>,
    );
    expect(screen.getByText("visible-body")).toBeDefined();
  });

  it("is expanded by default when collapsible (children visible)", () => {
    render(
      <FormSection title="t" collapsible>
        <span>collapsible-body</span>
      </FormSection>,
    );
    expect(screen.getByText("collapsible-body")).toBeDefined();
  });

  it("starts collapsed when defaultCollapsed is true (children hidden)", () => {
    const { container } = render(
      <FormSection title="t" collapsible defaultCollapsed>
        <span>hidden-body</span>
      </FormSection>,
    );
    expect(screen.queryByText("hidden-body")).toBeNull();
    const root = container.querySelector(
      '[data-slot="form-section"]',
    ) as HTMLElement;
    expect(root.getAttribute("data-collapsed")).toBe("true");
  });

  it("toggles collapsed state on header click when collapsible", () => {
    render(
      <FormSection title="toggleme" collapsible defaultCollapsed>
        <span>toggle-body</span>
      </FormSection>,
    );
    // initially hidden
    expect(screen.queryByText("toggle-body")).toBeNull();
    // click header to expand
    fireEvent.click(screen.getByText("toggleme"));
    expect(screen.getByText("toggle-body")).toBeDefined();
    // click again to collapse
    fireEvent.click(screen.getByText("toggleme"));
    expect(screen.queryByText("toggle-body")).toBeNull();
  });

  it("does not toggle when not collapsible (clicking header does nothing)", () => {
    render(
      <FormSection title="notcollapsible">
        <span>always-body</span>
      </FormSection>,
    );
    fireEvent.click(screen.getByText("notcollapsible"));
    expect(screen.getByText("always-body")).toBeDefined();
  });

  it("forwards extra div props to root", () => {
    render(
      <FormSection title="t" data-testid="fs-root">
        x
      </FormSection>,
    );
    expect(screen.getByTestId("fs-root")).toBeDefined();
  });
});

describe("formSectionVariants", () => {
  it("returns class string for default variant", () => {
    expect(formSectionVariants()).toContain("rounded-lg");
  });

  it("returns class string for elevated variant", () => {
    expect(formSectionVariants({ variant: "elevated" })).toContain("shadow-sm");
  });
});
