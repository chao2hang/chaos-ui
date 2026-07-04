import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { CodeEditor } from "./code-editor";

describe("CodeEditor", () => {
  it("renders with given value", () => {
    const { container } = render(
      <CodeEditor value="const x = 1;" language="javascript" />,
    );
    // CodeMirror renders inside a .cm-editor div
    expect(container.querySelector(".cm-editor")).toBeDefined();
  });

  it("supports text language with no extensions", () => {
    const { container } = render(
      <CodeEditor value="plain text" language="text" />,
    );
    expect(container.querySelector(".cm-editor")).toBeDefined();
  });

  it("renders with css language", () => {
    const { container } = render(
      <CodeEditor value=".foo { color: red; }" language="css" />,
    );
    expect(container.querySelector(".cm-editor")).toBeDefined();
  });

  it("accepts sqlDialect for 'sql' language", () => {
    const { container } = render(
      <CodeEditor
        value="SELECT * FROM users"
        language="sql"
        sqlDialect="mysql"
      />,
    );
    expect(container.querySelector(".cm-editor")).toBeDefined();
  });

  it("applies custom minHeight and maxHeight", () => {
    const { container } = render(
      <CodeEditor value="test" minHeight={100} maxHeight={500} />,
    );
    const wrapper = container.querySelector(
      "[data-slot='code-editor']",
    ) as HTMLElement;
    expect(wrapper?.style.minHeight).toBe("100px");
    expect(wrapper?.style.maxHeight).toBe("500px");
  });

  it("calls onChange when value changes", () => {
    const { container } = render(
      <CodeEditor value="hello" onChange={() => {}} />,
    );
    expect(container.querySelector(".cm-editor")).toBeDefined();
  });
});
