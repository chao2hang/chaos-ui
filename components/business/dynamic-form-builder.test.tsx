import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DynamicFormBuilder } from "./dynamic-form-builder";
import type { DynamicFormBuilderProps } from "./dynamic-form-builder";

describe("DynamicFormBuilder", () => {
  it("exports a Props type", () => {
    const t: DynamicFormBuilderProps = {
      schema: [{ name: "title", label: "标题", type: "text" }],
    };
    expect(t.schema).toHaveLength(1);
  });

  it("renders field labels from the schema", () => {
    render(
      <DynamicFormBuilder
        schema={[
          { name: "title", label: "活动标题", type: "text", required: true },
          { name: "note", label: "备注", type: "textarea" },
        ]}
      />,
    );
    expect(screen.getByText("活动标题")).toBeDefined();
    expect(screen.getByText("备注")).toBeDefined();
  });

  it("renders an empty-state message when schema is empty", () => {
    render(<DynamicFormBuilder schema={[]} />);
    expect(screen.getByText("暂无字段")).toBeDefined();
  });
});
