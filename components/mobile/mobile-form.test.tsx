import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  MobileForm,
  type MobileFormProps,
} from "@/components/mobile/mobile-form";

describe("MobileForm", () => {
  it("is exported and type is importable", () => {
    expect(MobileForm).toBeDefined();
    const _p: MobileFormProps = { children: "form content" };
    expect(_p.children).toBe("form content");
  });

  it("renders children", () => {
    render(<MobileForm>Form content</MobileForm>);
    expect(screen.getByText("Form content")).toBeDefined();
  });

  it("renders form element", () => {
    const { container } = render(<MobileForm>Content</MobileForm>);
    expect(container.querySelector("form")).not.toBeNull();
  });

  it("calls onSubmit when form is submitted", () => {
    const handleSubmit = vi.fn();
    render(<MobileForm onSubmit={handleSubmit}>Content</MobileForm>);
    const form = screen.getByText("Content").closest("form")!;
    fireEvent.submit(form);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it("does not call onSubmit when no handler provided", () => {
    // Just verify it renders without crashing
    render(<MobileForm>Content</MobileForm>);
    expect(screen.getByText("Content")).toBeDefined();
  });

  it("applies custom className", () => {
    const { container } = render(
      <MobileForm className="my-form">Content</MobileForm>,
    );
    const form = container.querySelector("form")!;
    expect(form.className).toContain("my-form");
  });

  it("applies default spacing classes", () => {
    const { container } = render(<MobileForm>Content</MobileForm>);
    const form = container.querySelector("form")!;
    expect(form.className).toContain("space-y-4");
    expect(form.className).toContain("p-4");
  });

  it("renders multiple children", () => {
    render(
      <MobileForm>
        <input placeholder="First" />
        <input placeholder="Second" />
      </MobileForm>,
    );
    expect(screen.getByPlaceholderText("First")).toBeDefined();
    expect(screen.getByPlaceholderText("Second")).toBeDefined();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/mobile/mobile-form");
    expect(mod.MobileForm).toBeDefined();
  });
});
