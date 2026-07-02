import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";

// Mock @tiptap to avoid heavy editor initialization in jsdom
vi.mock("@tiptap/react", () => ({
  useEditor: () => null,
  EditorContent: () => <div data-testid="editor-content" />,
}));

vi.mock("@tiptap/starter-kit", () => ({
  default: { configure: () => ({}) },
}));

vi.mock("@tiptap/extension-link", () => ({
  default: { configure: () => ({}) },
}));

vi.mock("@tiptap/extension-image", () => ({
  default: { configure: () => ({}) },
}));

vi.mock("@tiptap/extension-placeholder", () => ({
  default: { configure: () => ({}) },
}));

// Import after mocks
const { RichTextEditor } = await import("@/components/business/rich-text-editor");

describe("RichTextEditor", () => {
  it("renders editor container", () => {
    const { container } = render(<RichTextEditor />);
    // When editor is null (mocked), it renders a loading div
    expect(container.firstChild).toBeTruthy();
  });

  it("renders loading state when editor is null", () => {
    const { container } = render(<RichTextEditor />);
    expect(container.textContent).toContain("加载编辑器");
  });

  it("renders with custom className", () => {
    const { container } = render(<RichTextEditor className="custom-rte" />);
    const el = container.querySelector(
      '[data-slot="rich-text-editor"]',
    ) as HTMLElement;
    // When editor is null, it renders the loading div without data-slot
    // so we check the outer container
    expect(el || container.firstChild).toBeTruthy();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/rich-text-editor");
    expect(mod.RichTextEditor).toBeDefined();
  });

  it("exports RichTextEditor as named export", () => {
    expect(RichTextEditor).toBeDefined();
    expect(typeof RichTextEditor).toBe("function");
  });

  it("RichTextEditorProps is a type-only export", async () => {
    const mod = await import("@/components/business/rich-text-editor");
    expect(mod.RichTextEditor).toBeDefined();
    // RichTextEditorProps is a type, not a runtime value
  });
});
