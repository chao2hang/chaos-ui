import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FormDesigner } from "./form-designer";
import type { FormDesignerProps, FormDesignerField } from "./form-designer";

describe("FormDesigner", () => {
  it("renders the designer heading", () => {
    render(<FormDesigner fields={[]} />);
    expect(screen.getByText("表单设计器")).toBeDefined();
  });

  it("renders existing field labels", () => {
    render(
      <FormDesigner
        fields={[
          { id: "1", type: "text", label: "客户名称", required: true },
          { id: "2", type: "number", label: "金额" },
        ]}
      />,
    );
    expect(screen.getByDisplayValue("客户名称")).toBeDefined();
    expect(screen.getByDisplayValue("金额")).toBeDefined();
    expect(screen.getByText("共 2 个字段。")).toBeDefined();
  });

  it("renders an empty state when there are no fields", () => {
    render(<FormDesigner fields={[]} />);
    expect(screen.getByText("暂无字段，请在上方添加。")).toBeDefined();
  });

  it("exports types", () => {
    const _field: FormDesignerField = {
      id: "x",
      type: "text",
      label: "L",
    };
    const _props: FormDesignerProps = { fields: [_field] };
    expect(_field.id).toBe("x");
    expect(_props.fields.length).toBe(1);
  });
});
