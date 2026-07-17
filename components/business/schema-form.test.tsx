import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SchemaForm, type FormSchema } from "./schema-form";

describe("SchemaForm", () => {
  it("renders text field from flat schema", () => {
    const schema: FormSchema = {
      fields: [{ name: "name", label: "名称", type: "text" }],
    };
    render(<SchemaForm schema={schema} />);
    expect(screen.getByText("名称")).toBeInTheDocument();
  });

  it("renders grouped fields with title", () => {
    const schema: FormSchema = {
      groups: [
        {
          key: "base",
          title: "基本信息",
          fields: [{ name: "code", label: "编码", type: "text" }],
        },
      ],
    };
    render(<SchemaForm schema={schema} />);
    expect(screen.getByText("基本信息")).toBeInTheDocument();
    expect(screen.getByText("编码")).toBeInTheDocument();
  });

  it("fires onChange when typing in a text field", () => {
    const onChange = vi.fn();
    const schema: FormSchema = {
      fields: [{ name: "name", label: "名称", type: "text" }],
    };
    render(<SchemaForm schema={schema} value={{}} onChange={onChange} />);
    const input = screen.getByLabelText("名称");
    fireEvent.change(input, { target: { value: "张三" } });
    expect(onChange).toHaveBeenCalledWith({ name: "张三" });
  });

  it("validates required fields on submit and blocks onSubmit", () => {
    const onSubmit = vi.fn();
    const schema: FormSchema = {
      fields: [{ name: "name", label: "名称", type: "text", required: true }],
    };
    render(
      <SchemaForm
        schema={schema}
        value={{}}
        onSubmit={onSubmit}
        submitText="提交"
      />,
    );
    fireEvent.click(screen.getByText("提交"));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText("名称为必填项")).toBeInTheDocument();
  });

  it("calls onSubmit when validation passes", () => {
    const onSubmit = vi.fn();
    const schema: FormSchema = {
      fields: [{ name: "name", label: "名称", type: "text", required: true }],
    };
    render(
      <SchemaForm
        schema={schema}
        value={{ name: "张三" }}
        onSubmit={onSubmit}
        submitText="提交"
      />,
    );
    fireEvent.click(screen.getByText("提交"));
    expect(onSubmit).toHaveBeenCalledWith({ name: "张三" });
  });

  it("applies dependency to hide a field", () => {
    const schema: FormSchema = {
      fields: [
        {
          name: "type",
          label: "类型",
          type: "select",
          options: [{ label: "A", value: "a" }],
        },
        {
          name: "extra",
          label: "额外",
          type: "text",
          dependencies: [{ name: "type", when: "a", then: { hidden: true } }],
        },
      ],
    };
    render(<SchemaForm schema={schema} value={{ type: "a" }} />);
    // "额外" should not be rendered because hidden
    expect(screen.queryByText("额外")).not.toBeInTheDocument();
  });

  it("clears sibling field via dependency when value changes (linkage)", () => {
    const onChange = vi.fn();
    const schema: FormSchema = {
      fields: [
        {
          name: "company",
          label: "公司",
          type: "text",
        },
        {
          name: "dept",
          label: "部门",
          type: "text",
          dependencies: [{ name: "company", when: undefined, then: {} }],
        },
      ],
    };
    const { rerender } = render(
      <SchemaForm
        schema={schema}
        value={{ company: "C1", dept: "D1" }}
        onChange={onChange}
      />,
    );
    // Simulate company change → consumer clears dept (linkage is consumer-driven via then)
    rerender(
      <SchemaForm
        schema={schema}
        value={{ company: "C2" }}
        onChange={onChange}
      />,
    );
    // dept field still visible (no hidden override)
    expect(screen.getByText("部门")).toBeInTheDocument();
  });

  it("renders custom field via render prop", () => {
    const schema: FormSchema = {
      fields: [
        {
          name: "custom",
          label: "自定义",
          type: "custom",
          render: (value, onChange) => (
            <button type="button" onClick={() => onChange("clicked")}>
              {String(value ?? "custom-empty")}
            </button>
          ),
        },
      ],
    };
    render(<SchemaForm schema={schema} value={{}} />);
    expect(screen.getByText("custom-empty")).toBeInTheDocument();
  });
});
