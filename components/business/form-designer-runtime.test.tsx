import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FormDesignerRuntime } from "./form-designer-runtime";
import type {
  FormDesignerRuntimeProps,
  RuntimeField,
} from "./form-designer-runtime";

describe("FormDesignerRuntime", () => {
  it("renders field labels and the submit button", () => {
    const schema: RuntimeField[] = [
      { id: "name", type: "text", label: "姓名", required: true },
      { id: "note", type: "textarea", label: "备注" },
    ];
    render(<FormDesignerRuntime schema={schema} />);
    expect(screen.getByText("姓名")).toBeDefined();
    expect(screen.getByText("备注")).toBeDefined();
    expect(screen.getByRole("button", { name: "提交" })).toBeDefined();
  });

  it("renders initial values", () => {
    render(
      <FormDesignerRuntime
        schema={[{ id: "name", type: "text", label: "姓名" }]}
        value={{ name: "张三" }}
      />,
    );
    expect(screen.getByDisplayValue("张三")).toBeDefined();
  });

  it("renders an empty state when the schema has no fields", () => {
    render(<FormDesignerRuntime schema={[]} />);
    expect(screen.getByText("暂无可填写的字段。")).toBeDefined();
  });

  it("accepts an object-shaped schema with a fields array", () => {
    render(
      <FormDesignerRuntime
        schema={{ fields: [{ id: "x", type: "text", label: "X" }] }}
      />,
    );
    expect(screen.getByText("X")).toBeDefined();
  });

  it("exports types", () => {
    const _field: RuntimeField = {
      id: "x",
      type: "text",
      label: "L",
    };
    const _props: FormDesignerRuntimeProps = { schema: [_field] };
    expect(_field.id).toBe("x");
    expect(_props.schema).toBeDefined();
  });
});
