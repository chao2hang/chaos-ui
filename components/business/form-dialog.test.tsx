import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FormDialog } from "./form-dialog";
import type { FormDialogField } from "./form-dialog";

const fields: FormDialogField[] = [
  { key: "name", label: "名称", required: true },
  {
    key: "status",
    label: "状态",
    type: "select",
    options: [
      { label: "启用", value: "OPEN" },
      { label: "停用", value: "CLOSED" },
    ],
  },
];

describe("FormDialog", () => {
  it("renders title and field labels when open", () => {
    render(
      <FormDialog
        open
        title="新增"
        fields={fields}
        onOpenChange={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );
    expect(screen.getByText("新增")).toBeDefined();
    expect(screen.getByText("名称")).toBeDefined();
    expect(screen.getByText("状态")).toBeDefined();
  });

  it("submits current values", () => {
    const onSubmit = vi.fn();
    render(
      <FormDialog
        open
        title="新增"
        fields={fields}
        record={{ name: "Acme", status: "OPEN" }}
        onOpenChange={vi.fn()}
        onSubmit={onSubmit}
      />,
    );
    fireEvent.click(screen.getByText("确定"));
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Acme", status: "OPEN" }),
    );
  });

  it("cancel calls onOpenChange(false)", () => {
    const onOpenChange = vi.fn();
    render(
      <FormDialog
        open
        title="新增"
        fields={fields}
        onOpenChange={onOpenChange}
        onSubmit={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByText("取消"));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
