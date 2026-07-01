import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
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

  it("renders text input field", () => {
    render(
      <FormDesignerRuntime
        schema={[{ id: "name", type: "text", label: "姓名" }]}
      />,
    );
    const input = screen.getByLabelText("姓名");
    expect(input).toBeDefined();
    expect(input.tagName).toBe("INPUT");
  });

  it("renders textarea field", () => {
    render(
      <FormDesignerRuntime
        schema={[{ id: "note", type: "textarea", label: "备注" }]}
      />,
    );
    const textarea = screen.getByLabelText("备注");
    expect(textarea).toBeDefined();
    expect(textarea.tagName).toBe("TEXTAREA");
  });

  it("renders number input field", () => {
    render(
      <FormDesignerRuntime
        schema={[{ id: "age", type: "number", label: "年龄" }]}
      />,
    );
    const input = screen.getByLabelText("年龄") as HTMLInputElement;
    expect(input).toBeDefined();
    expect(input.type).toBe("number");
  });

  it("renders date input field", () => {
    render(
      <FormDesignerRuntime
        schema={[{ id: "birthday", type: "date", label: "生日" }]}
      />,
    );
    const input = screen.getByLabelText("生日") as HTMLInputElement;
    expect(input).toBeDefined();
    expect(input.type).toBe("date");
  });

  it("renders checkbox field", () => {
    render(
      <FormDesignerRuntime
        schema={[{ id: "agree", type: "checkbox", label: "同意" }]}
      />,
    );
    expect(screen.getByText("同意")).toBeDefined();
  });

  it("renders required asterisk for required fields", () => {
    render(
      <FormDesignerRuntime
        schema={[{ id: "name", type: "text", label: "姓名", required: true }]}
      />,
    );
    const asterisk = screen.getByText("*");
    expect(asterisk).toBeDefined();
  });

  it("fires onChange when text input value changes", () => {
    const onChange = vi.fn();
    render(
      <FormDesignerRuntime
        schema={[{ id: "name", type: "text", label: "姓名" }]}
        onChange={onChange}
      />,
    );
    const input = screen.getByLabelText("姓名");
    fireEvent.change(input, { target: { value: "李四" } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith({ name: "李四" });
  });

  it("fires onChange when textarea value changes", () => {
    const onChange = vi.fn();
    render(
      <FormDesignerRuntime
        schema={[{ id: "note", type: "textarea", label: "备注" }]}
        onChange={onChange}
      />,
    );
    const textarea = screen.getByLabelText("备注");
    fireEvent.change(textarea, { target: { value: "hello" } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith({ note: "hello" });
  });

  it("fires onChange when number input value changes", () => {
    const onChange = vi.fn();
    render(
      <FormDesignerRuntime
        schema={[{ id: "age", type: "number", label: "年龄" }]}
        onChange={onChange}
      />,
    );
    const input = screen.getByLabelText("年龄");
    fireEvent.change(input, { target: { value: "30" } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith({ age: 30 });
  });

  it("fires onChange with empty string when number input is cleared", () => {
    const onChange = vi.fn();
    render(
      <FormDesignerRuntime
        schema={[{ id: "age", type: "number", label: "年龄" }]}
        value={{ age: 30 }}
        onChange={onChange}
      />,
    );
    const input = screen.getByLabelText("年龄");
    fireEvent.change(input, { target: { value: "" } });
    expect(onChange).toHaveBeenCalledWith({ age: "" });
  });

  it("fires onChange when date input value changes", () => {
    const onChange = vi.fn();
    render(
      <FormDesignerRuntime
        schema={[{ id: "birthday", type: "date", label: "生日" }]}
        onChange={onChange}
      />,
    );
    const input = screen.getByLabelText("生日");
    fireEvent.change(input, { target: { value: "2024-01-01" } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith({ birthday: "2024-01-01" });
  });

  it("fires onChange on form submit", () => {
    const onChange = vi.fn();
    render(
      <FormDesignerRuntime
        schema={[{ id: "name", type: "text", label: "姓名" }]}
        value={{ name: "测试" }}
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "提交" }));
    expect(onChange).toHaveBeenCalledWith({ name: "测试" });
  });

  it("renders with custom className", () => {
    const { container } = render(
      <FormDesignerRuntime
        schema={[{ id: "name", type: "text", label: "姓名" }]}
        className="my-form"
      />,
    );
    expect(container.querySelector(".my-form")).not.toBeNull();
  });

  it("renders data-slot attribute", () => {
    const { container } = render(
      <FormDesignerRuntime
        schema={[{ id: "name", type: "text", label: "姓名" }]}
      />,
    );
    expect(
      container.querySelector("[data-slot='form-designer-runtime']"),
    ).not.toBeNull();
  });

  it("renders placeholder on text input", () => {
    render(
      <FormDesignerRuntime
        schema={[
          {
            id: "name",
            type: "text",
            label: "姓名",
            placeholder: "请输入姓名",
          },
        ]}
      />,
    );
    const input = screen.getByPlaceholderText("请输入姓名");
    expect(input).toBeDefined();
  });

  it("renders placeholder on textarea", () => {
    render(
      <FormDesignerRuntime
        schema={[
          {
            id: "note",
            type: "textarea",
            label: "备注",
            placeholder: "请输入备注",
          },
        ]}
      />,
    );
    const textarea = screen.getByPlaceholderText("请输入备注");
    expect(textarea).toBeDefined();
  });

  it("handles invalid schema gracefully (returns empty fields)", () => {
    render(<FormDesignerRuntime schema={null} />);
    expect(screen.getByText("暂无可填写的字段。")).toBeDefined();
  });

  it("handles schema with invalid shape gracefully", () => {
    render(<FormDesignerRuntime schema={{ invalid: true }} />);
    expect(screen.getByText("暂无可填写的字段。")).toBeDefined();
  });

  it("renders multiple field types in one form", () => {
    const schema: RuntimeField[] = [
      { id: "name", type: "text", label: "姓名" },
      { id: "note", type: "textarea", label: "备注" },
      { id: "age", type: "number", label: "年龄" },
      { id: "birthday", type: "date", label: "生日" },
    ];
    render(<FormDesignerRuntime schema={schema} />);
    expect(screen.getByText("姓名")).toBeDefined();
    expect(screen.getByText("备注")).toBeDefined();
    expect(screen.getByText("年龄")).toBeDefined();
    expect(screen.getByText("生日")).toBeDefined();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/form-designer-runtime");
    expect(mod.FormDesignerRuntime).toBeDefined();
  });
});
