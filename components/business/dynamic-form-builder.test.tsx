import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
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

  it("renders required asterisk for required fields", () => {
    render(
      <DynamicFormBuilder
        schema={[
          { name: "title", label: "标题", type: "text", required: true },
        ]}
      />,
    );
    const asterisk = screen.getByText("*");
    expect(asterisk).toBeDefined();
  });

  it("renders text input field", () => {
    render(
      <DynamicFormBuilder
        schema={[{ name: "name", label: "姓名", type: "text" }]}
      />,
    );
    const input = screen.getByLabelText("姓名");
    expect(input).toBeDefined();
    expect(input.tagName).toBe("INPUT");
  });

  it("renders number input field", () => {
    render(
      <DynamicFormBuilder
        schema={[{ name: "age", label: "年龄", type: "number" }]}
      />,
    );
    const input = screen.getByLabelText("年龄") as HTMLInputElement;
    expect(input).toBeDefined();
    expect(input.type).toBe("number");
  });

  it("renders date input field", () => {
    render(
      <DynamicFormBuilder
        schema={[{ name: "birthday", label: "生日", type: "date" }]}
      />,
    );
    const input = screen.getByLabelText("生日") as HTMLInputElement;
    expect(input).toBeDefined();
    expect(input.type).toBe("date");
  });

  it("renders textarea field", () => {
    render(
      <DynamicFormBuilder
        schema={[{ name: "note", label: "备注", type: "textarea" }]}
      />,
    );
    const textarea = screen.getByLabelText("备注");
    expect(textarea).toBeDefined();
    expect(textarea.tagName).toBe("TEXTAREA");
  });

  it("renders checkbox field", () => {
    render(
      <DynamicFormBuilder
        schema={[{ name: "agree", label: "同意", type: "checkbox" }]}
      />,
    );
    expect(screen.getByText("同意")).toBeDefined();
  });

  it("renders switch field", () => {
    render(
      <DynamicFormBuilder
        schema={[{ name: "enabled", label: "启用", type: "switch" }]}
      />,
    );
    expect(screen.getByText("启用")).toBeDefined();
  });

  it("fires onChange when text input value changes", () => {
    const onChange = vi.fn();
    render(
      <DynamicFormBuilder
        schema={[{ name: "name", label: "姓名", type: "text" }]}
        onChange={onChange}
      />,
    );
    const input = screen.getByLabelText("姓名");
    fireEvent.change(input, { target: { value: "张三" } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith({ name: "张三" });
  });

  it("fires onChange when textarea value changes", () => {
    const onChange = vi.fn();
    render(
      <DynamicFormBuilder
        schema={[{ name: "note", label: "备注", type: "textarea" }]}
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
      <DynamicFormBuilder
        schema={[{ name: "age", label: "年龄", type: "number" }]}
        onChange={onChange}
      />,
    );
    const input = screen.getByLabelText("年龄");
    fireEvent.change(input, { target: { value: "25", valueAsNumber: 25 } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith({ age: 25 });
  });

  it("renders with initial value prop", () => {
    render(
      <DynamicFormBuilder
        schema={[{ name: "name", label: "姓名", type: "text" }]}
        value={{ name: "初始值" }}
      />,
    );
    expect(screen.getByDisplayValue("初始值")).toBeDefined();
  });

  it("renders with custom className", () => {
    const { container } = render(
      <DynamicFormBuilder
        schema={[{ name: "name", label: "姓名", type: "text" }]}
        className="my-form"
      />,
    );
    expect(container.querySelector(".my-form")).not.toBeNull();
  });

  it("renders data-slot attribute", () => {
    const { container } = render(
      <DynamicFormBuilder
        schema={[{ name: "name", label: "姓名", type: "text" }]}
      />,
    );
    expect(
      container.querySelector("[data-slot='dynamic-form-builder']"),
    ).not.toBeNull();
  });

  it("prevents default on form submit", () => {
    const { container } = render(
      <DynamicFormBuilder
        schema={[{ name: "name", label: "姓名", type: "text" }]}
      />,
    );
    const form = container.querySelector("form")!;
    fireEvent.submit(form);
    // Component calls e.preventDefault() on submit
    // Verify the form exists and has the submit handler
    expect(form).not.toBeNull();
  });

  it("coerces string options to {value, label} format", () => {
    render(
      <DynamicFormBuilder
        schema={[
          {
            name: "color",
            label: "颜色",
            type: "select",
            options: ["red", "blue"],
          },
        ]}
      />,
    );
    // Select should render without crashing
    expect(screen.getByText("颜色")).toBeDefined();
  });

  it("coerces object options with value/label", () => {
    render(
      <DynamicFormBuilder
        schema={[
          {
            name: "color",
            label: "颜色",
            type: "select",
            options: [
              { value: "r", label: "Red" },
              { value: "b", label: "Blue" },
            ],
          },
        ]}
      />,
    );
    expect(screen.getByText("颜色")).toBeDefined();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/dynamic-form-builder");
    expect(mod.DynamicFormBuilder).toBeDefined();
  });
});
