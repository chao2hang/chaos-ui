import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PrintTemplateBuilder } from "./print-template-builder";
import type { PrintTemplateBuilderProps, PrintTemplateModel } from "./print-template-builder";

describe("PrintTemplateBuilder", () => {
  it("exports the component and types", () => {
    expect(PrintTemplateBuilder).toBeDefined();
    const _tc: PrintTemplateBuilderProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders an empty state and the title input by default", () => {
    render(<PrintTemplateBuilder />);
    expect(screen.getByText("打印模板构建器")).toBeDefined();
    expect(screen.getByPlaceholderText("请输入模板标题")).toBeDefined();
    expect(screen.getByText("暂无字段，点击“添加字段”开始构建模板")).toBeDefined();
  });

  it("renders provided template fields", () => {
    const template: PrintTemplateModel = {
      title: "Invoice",
      fields: [{ label: "客户", key: "customer" }],
    };
    render(<PrintTemplateBuilder template={template} />);
    expect(screen.getByDisplayValue("Invoice")).toBeDefined();
    expect(screen.getByDisplayValue("客户")).toBeDefined();
    expect(screen.getByDisplayValue("customer")).toBeDefined();
  });

  it("calls onChange when editing the title", () => {
    const onChange = vi.fn();
    render(<PrintTemplateBuilder template={{ title: "Old", fields: [] }} onChange={onChange} />);
    fireEvent.change(screen.getByDisplayValue("Old"), { target: { value: "New" } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith({ title: "New", fields: [] });
  });

  it("adds a field via the add button", () => {
    const onChange = vi.fn();
    render(<PrintTemplateBuilder template={{ title: "T", fields: [] }} onChange={onChange} />);
    fireEvent.click(screen.getByText("添加字段"));
    expect(onChange).toHaveBeenCalledWith({ title: "T", fields: [{ label: "" }] });
  });
});
