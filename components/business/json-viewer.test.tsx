import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { JsonViewer } from "./json-viewer";

vi.mock("react-i18next", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as Record<string, unknown>),
    useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
  };
});

describe("JsonViewer", () => {
  it("renders primitive values: string, number, boolean, null", () => {
    const { container } = render(
      <JsonViewer data={{ s: "hi", n: 7, b: false, x: null }} />,
    );
    expect(container.querySelector('[data-slot="json-viewer"]')).not.toBeNull();
    expect(screen.getByText('"hi"')).toBeDefined();
    expect(screen.getByText("7")).toBeDefined();
    expect(screen.getByText("false")).toBeDefined();
    expect(screen.getByText("null")).toBeDefined();
  });

  it("renders collapsed toggles for nested objects and arrays", () => {
    render(
      <JsonViewer
        data={{ obj: { a: 1 }, arr: [1, 2] }}
        defaultCollapsedDepth={1}
      />,
    );
    // Root (depth 0) is open; its children obj/arr (depth 1) are collapsed,
    // so both render a collapsed toggle button.
    const toggles = screen.getAllByText(/[{[]\d+[}\]]/);
    expect(toggles.length).toBeGreaterThanOrEqual(2);
  });

  it("expands a collapsed node on toggle click", () => {
    render(<JsonViewer data={{ obj: { a: 1 } }} defaultCollapsedDepth={1} />);
    // Root (depth 0) is open, "obj" (depth 1) is collapsed: inner key "a"
    // is not rendered yet (KeyName renders `"a": `, value span renders `1`).
    expect(screen.queryByText((c) => c.includes('"a"'))).toBeNull();
    // Both root and "obj" toggles show "{1}"; pick the collapsed (▶) one.
    const toggles = screen.getAllByText(/▶ \{1\}/);
    expect(toggles.length).toBe(1);
    fireEvent.click(toggles[0]!);
    // After expanding, the inner key `"a": ` and value `1` are rendered.
    expect(screen.getByText((c) => c.includes('"a"'))).toBeDefined();
    expect(screen.getByText("1")).toBeDefined();
  });

  it("renders empty array and empty object tokens", () => {
    render(<JsonViewer data={{ ea: [], eo: {} }} />);
    expect(screen.getByText("[]")).toBeDefined();
    expect(screen.getByText("{}")).toBeDefined();
  });

  it("renders the copy button with aria-label", () => {
    render(<JsonViewer data={{ a: 1 }} />);
    expect(screen.getByLabelText("jsonViewer.copyJson")).toBeDefined();
  });

  it("hides copy button when showCopy=false", () => {
    render(<JsonViewer data={{ a: 1 }} showCopy={false} />);
    expect(screen.queryByLabelText("jsonViewer.copyJson")).toBeNull();
  });

  it("renders a top-level array with index key names", () => {
    render(<JsonViewer data={["x", "y"]} />);
    expect(screen.getByText('"x"')).toBeDefined();
    expect(screen.getByText('"y"')).toBeDefined();
  });

  it("exports JsonViewer", () => {
    expect(JsonViewer).toBeDefined();
  });
});
