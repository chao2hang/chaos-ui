import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { EditableDescriptions } from "./editable-descriptions";

describe("EditableDescriptions", () => {
  it("renders items", () => {
    render(
      <EditableDescriptions
        items={[
          { label: "Name", value: "Alice" },
          { label: "Age", value: "30" },
        ]}
      />,
    );
    expect(screen.getByText("Alice")).toBeDefined();
    expect(screen.getByText("30")).toBeDefined();
    // labels may be concatenated with ":"
    expect(document.body.textContent ?? "").toContain("Name");
    expect(document.body.textContent ?? "").toContain("Age");
  });

  it("exports EditableDescriptions", () => {
    expect(EditableDescriptions).toBeDefined();
  });
});
