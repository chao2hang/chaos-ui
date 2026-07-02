import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MarkdownEditor } from "@/components/business/markdown-editor";

describe("MarkdownEditor", () => {
  it("renders editor container", () => {
    const { container } = render(<MarkdownEditor value="# Hello" />);
    expect(
      container.querySelector('[data-slot="markdown-editor"]'),
    ).toBeTruthy();
  });

  it("renders textarea with value", () => {
    render(<MarkdownEditor value="# Hello World" />);
    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    expect(textarea.value).toBe("# Hello World");
  });

  it("calls onChange when textarea value changes", () => {
    const handleChange = vi.fn();
    render(<MarkdownEditor value="" onChange={handleChange} />);
    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: "new text" } });
    expect(handleChange).toHaveBeenCalledWith("new text");
  });

  it("renders with custom className", () => {
    const { container } = render(
      <MarkdownEditor value="" className="custom-md" />,
    );
    const el = container.querySelector(
      '[data-slot="markdown-editor"]',
    ) as HTMLElement;
    expect(el.className).toContain("custom-md");
  });

  it("renders toolbar with formatting buttons", () => {
    const { container } = render(<MarkdownEditor value="" />);
    const buttons = container.querySelectorAll("button[aria-label]");
    const labels = Array.from(buttons).map((b) =>
      b.getAttribute("aria-label"),
    );
    expect(labels).toContain("粗体");
    expect(labels).toContain("斜体");
    expect(labels).toContain("标题1");
    expect(labels).toContain("链接");
    expect(labels).toContain("行内代码");
  });

  it("hides toolbar when toolbar={false}", () => {
    const { container } = render(
      <MarkdownEditor value="" toolbar={false} />,
    );
    const toolbar = container.querySelector('[role="toolbar"]');
    expect(toolbar).toBeNull();
  });

  it("shows only preview in preview mode", () => {
    const { container } = render(
      <MarkdownEditor value="# Test" mode="preview" />,
    );
    const textarea = container.querySelector("textarea");
    expect(textarea).toBeNull();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/markdown-editor");
    expect(mod.MarkdownEditor).toBeDefined();
  });
});
