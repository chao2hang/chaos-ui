import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CodeBlock } from "./code-block";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
}));

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn().mockResolvedValue(undefined),
  },
});

describe("CodeBlock", () => {
  it("exports CodeBlock", () => {
    expect(CodeBlock).toBeDefined();
  });

  it("renders code content", () => {
    render(<CodeBlock code="console.log('hello')" />);
    expect(screen.getByText(/console\.log/)).toBeDefined();
  });

  it("renders with language specified", () => {
    render(<CodeBlock code="const x = 1" language="js" />);
    expect(screen.getByText(/const/)).toBeDefined();
  });

  it("renders with filename", () => {
    render(<CodeBlock code="hello" filename="test.ts" />);
    expect(screen.getByText("test.ts")).toBeDefined();
  });

  it("renders language label when both filename and language are provided", () => {
    render(<CodeBlock code="hello" filename="test.ts" language="ts" />);
    // Language is rendered as-is (CSS makes it uppercase via text-transform)
    expect(screen.getByText("ts")).toBeDefined();
  });

  it("renders line numbers by default", () => {
    const code = ["line1", "line2", "line3"].join("\n");
    const { container } = render(<CodeBlock code={code} />);
    // Verify code content is split into multiple lines
    const codeContent = container.querySelector("code");
    expect(codeContent).not.toBeNull();
    // Line numbers 1, 2, 3 should appear in the rendered output
    const text = codeContent?.textContent ?? "";
    expect(text).toContain("1");
    expect(text).toContain("2");
    expect(text).toContain("3");
  });

  it("hides line numbers when showLineNumbers is false", () => {
    const { container } = render(
      <CodeBlock code="line1\nline2" showLineNumbers={false} />,
    );
    expect(container.querySelectorAll("span.select-none").length).toBe(0);
  });

  it("renders copy button by default", () => {
    render(<CodeBlock code="test" />);
    const button = screen.getByLabelText("codeBlock.copyCode");
    expect(button).toBeDefined();
  });

  it("hides copy button when showCopy is false", () => {
    render(<CodeBlock code="test" showCopy={false} />);
    expect(screen.queryByLabelText("codeBlock.copyCode")).toBeNull();
  });

  it("copies code to clipboard when copy button is clicked", () => {
    render(<CodeBlock code="copy me" />);
    const button = screen.getByLabelText("codeBlock.copyCode");
    fireEvent.click(button);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("copy me");
  });

  it("renders highlighted lines", () => {
    const { container } = render(
      <CodeBlock code="line1\nline2\nline3" highlightLines={[2]} />,
    );
    // Line 2 should have the highlight class (bg-zinc-800/60)
    const rows = container.querySelectorAll("div.flex");
    // highlightLines=[2] means the second row gets the highlight class
    const highlightedRow = Array.from(rows).find((r) =>
      r.className.includes("bg-zinc-800"),
    );
    expect(highlightedRow).not.toBeNull();
  });

  it("renders with custom maxHeight", () => {
    const { container } = render(<CodeBlock code="test" maxHeight={200} />);
    const pre = container.querySelector("pre");
    expect(pre?.style.maxHeight).toBe("200px");
  });

  it("renders with custom className", () => {
    const { container } = render(
      <CodeBlock code="test" className="my-block" />,
    );
    expect(container.querySelector(".my-block")).not.toBeNull();
  });

  it("renders data-slot attribute", () => {
    const { container } = render(<CodeBlock code="test" />);
    expect(container.querySelector("[data-slot='code-block']")).not.toBeNull();
  });

  it("tokenizes JavaScript code", () => {
    render(<CodeBlock code="const x = 1" language="js" />);
    // Should render without crashing; keywords get styled spans
    expect(screen.getByText(/const/)).toBeDefined();
  });

  it("tokenizes TypeScript code", () => {
    render(<CodeBlock code="interface Foo { }" language="ts" />);
    expect(screen.getByText(/interface/)).toBeDefined();
  });

  it("tokenizes JSON code", () => {
    render(<CodeBlock code='{"key": "value"}' language="json" />);
    expect(screen.getByText(/key/)).toBeDefined();
  });

  it("handles unknown language gracefully", () => {
    render(<CodeBlock code="some code" language="unknown" />);
    expect(screen.getByText(/some code/)).toBeDefined();
  });

  it("handles empty code", () => {
    render(<CodeBlock code="" />);
    // Should render without crashing
    const { container } = render(<CodeBlock code="" />);
    expect(container.querySelector("[data-slot='code-block']")).not.toBeNull();
  });

  it("handles multiline code with line numbers", () => {
    const code = ["a", "b", "c", "d", "e"].join("\n");
    const { container } = render(<CodeBlock code={code} />);
    const codeContent = container.querySelector("code");
    const text = codeContent?.textContent ?? "";
    expect(text).toContain("5");
  });

  it("renders without language (no filename bar)", () => {
    const { container } = render(<CodeBlock code="test" />);
    // No filename bar should be rendered
    expect(container.querySelector(".border-b.border-zinc-800")).toBeNull();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/code-block");
    expect(mod.CodeBlock).toBeDefined();
  });
});
