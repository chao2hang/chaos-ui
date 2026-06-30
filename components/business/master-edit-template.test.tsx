import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MasterEditTemplate } from "./master-edit-template";
import type { MasterEditTemplateProps } from "./master-edit-template";

describe("MasterEditTemplate", () => {
  it("renders title and children", () => {
    render(
      <MasterEditTemplate title="编辑供应商">
        <p>表单字段</p>
      </MasterEditTemplate>,
    );
    expect(screen.getByText("编辑供应商")).toBeDefined();
    expect(screen.getByText("表单字段")).toBeDefined();
    expect(screen.getByRole("region", { name: "编辑页 编辑供应商" })).toBeDefined();
  });

  it("uses the default title when none provided", () => {
    render(<MasterEditTemplate>表单</MasterEditTemplate>);
    expect(screen.getByText("编辑")).toBeDefined();
  });

  it("shows loading label when saving", () => {
    render(
      <MasterEditTemplate title="编辑" onSave={() => {}} loading>
        <p>表单</p>
      </MasterEditTemplate>,
    );
    expect(screen.getByText("保存中")).toBeDefined();
  });

  it("disables save and cancel buttons while loading", () => {
    render(
      <MasterEditTemplate title="编辑" onSave={() => {}} onCancel={() => {}} loading>
        <p>表单</p>
      </MasterEditTemplate>,
    );
    expect(screen.getByText("保存中").closest("button")).toBeDisabled();
    expect(screen.getByText("取消").closest("button")).toBeDisabled();
  });

  it("marks the save button aria-busy while loading", () => {
    render(
      <MasterEditTemplate title="编辑" onSave={() => {}} loading>
        <p>表单</p>
      </MasterEditTemplate>,
    );
    const saveBtn = screen.getByText("保存中").closest("button");
    expect(saveBtn).toHaveAttribute("aria-busy", "true");
  });

  it("invokes onSave and onCancel", () => {
    const onSave = vi.fn();
    const onCancel = vi.fn();
    render(
      <MasterEditTemplate title="编辑" onSave={onSave} onCancel={onCancel}>
        <p>表单</p>
      </MasterEditTemplate>,
    );
    fireEvent.click(screen.getByText("保存"));
    fireEvent.click(screen.getByText("取消"));
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("invokes onBack via back button", () => {
    const onBack = vi.fn();
    render(
      <MasterEditTemplate title="编辑" onBack={onBack}>
        <p>表单</p>
      </MasterEditTemplate>,
    );
    fireEvent.click(screen.getByLabelText("返回"));
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it("omits back, save and cancel buttons when callbacks are absent", () => {
    render(<MasterEditTemplate title="编辑">表单</MasterEditTemplate>);
    expect(screen.queryByLabelText("返回")).toBeNull();
    expect(screen.queryByText("保存")).toBeNull();
    expect(screen.queryByText("取消")).toBeNull();
  });

  it("applies a custom className", () => {
    const { container } = render(
      <MasterEditTemplate title="编辑" className="custom-cls">
        表单
      </MasterEditTemplate>,
    );
    expect(container.firstChild).toHaveClass("custom-cls");
  });

  it("exports types", () => {
    const _tc: MasterEditTemplateProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });
});
