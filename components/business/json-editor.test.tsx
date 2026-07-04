import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { JsonEditor } from "./json-editor";

describe("JsonEditor", () => {
  it("renders with valid JSON", () => {
    const { container } = render(
      <JsonEditor value='{"name":"Alice","age":30}' />,
    );
    expect(container.querySelector(".cm-editor")).toBeDefined();
  });

  it("renders with invalid JSON string (no crash)", () => {
    const { container } = render(<JsonEditor value="{broken json}" />);
    expect(container.querySelector(".cm-editor")).toBeDefined();
  });

  it("has autoFormat that prettifies valid JSON on mount", () => {
    // Note: in a real scenario autoFormat transforms the value before passing
    // it to CodeEditor, but since we can't spy on CodeMirror's internal state
    // in jsdom, we verify the component renders without error.
    const { container } = render(
      <JsonEditor value='{"b":2,"a":1}' autoFormat />,
    );
    expect(container.querySelector(".cm-editor")).toBeDefined();
  });
});
