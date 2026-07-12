import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DictManageDialog, type DictManageItem } from "./dict-manage-dialog";

const sample: DictManageItem[] = [
  { value: "open", label: "开启" },
  { value: "closed", label: "已关闭", disabled: true },
];

describe("DictManageDialog", () => {
  it("renders list when open", () => {
    render(<DictManageDialog open items={sample} onOpenChange={vi.fn()} />);
    expect(screen.getByText("字典管理")).toBeDefined();
    expect(screen.getByText("开启")).toBeDefined();
    expect(screen.getByText("已关闭")).toBeDefined();
    expect(
      document.body.querySelector('[data-slot="dict-manage-list"]'),
    ).not.toBeNull();
    expect(
      document.body.querySelector('[data-disabled="true"]'),
    ).not.toBeNull();
  });

  it("filters by search", () => {
    render(<DictManageDialog open items={sample} onOpenChange={vi.fn()} />);
    fireEvent.change(screen.getByPlaceholderText("搜索标签或值…"), {
      target: { value: "开" },
    });
    expect(screen.getByText("开启")).toBeDefined();
    expect(screen.queryByText("已关闭")).toBeNull();
  });

  it("creates an item via onCreate and onChange", async () => {
    const onChange = vi.fn();
    const onCreate = vi.fn().mockResolvedValue({
      value: "pending",
      label: "待处理",
    });
    render(
      <DictManageDialog
        open
        items={sample}
        onChange={onChange}
        onCreate={onCreate}
        onOpenChange={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByText("新增"));
    fireEvent.change(screen.getByLabelText("标签"), {
      target: { value: "待处理" },
    });
    fireEvent.change(screen.getByLabelText("值"), {
      target: { value: "pending" },
    });
    fireEvent.click(screen.getByText("保存"));
    await waitFor(() => {
      expect(onCreate).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
    });
    const last = onChange.mock.calls.at(-1)?.[0] as DictManageItem[];
    expect(last.some((i) => i.value === "pending")).toBe(true);
  });

  it("rejects empty label", () => {
    render(<DictManageDialog open items={sample} onOpenChange={vi.fn()} />);
    fireEvent.click(screen.getByText("新增"));
    fireEvent.click(screen.getByText("保存"));
    expect(screen.getByText("标签不能为空")).toBeDefined();
  });

  it("deletes an item", async () => {
    const onChange = vi.fn();
    const onDelete = vi.fn().mockResolvedValue(undefined);
    render(
      <DictManageDialog
        open
        items={sample}
        onChange={onChange}
        onDelete={onDelete}
        onOpenChange={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByLabelText("删除 开启"));
    await waitFor(() => {
      expect(onDelete).toHaveBeenCalled();
    });
    const last = onChange.mock.calls.at(-1)?.[0] as DictManageItem[];
    expect(last.find((i) => i.value === "open")).toBeUndefined();
  });

  it("loads remote items on open", async () => {
    const onLoad = vi.fn().mockResolvedValue([{ value: "a", label: "Alpha" }]);
    const onChange = vi.fn();
    render(
      <DictManageDialog
        open
        categoryCode="gender"
        items={[]}
        onLoad={onLoad}
        onChange={onChange}
        onOpenChange={vi.fn()}
      />,
    );
    await waitFor(() => {
      expect(onLoad).toHaveBeenCalledWith("gender");
    });
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith([
        expect.objectContaining({ value: "a", label: "Alpha" }),
      ]);
    });
  });

  it("closes via footer button", () => {
    const onOpenChange = vi.fn();
    render(
      <DictManageDialog open items={sample} onOpenChange={onOpenChange} />,
    );
    fireEvent.click(screen.getByRole("button", { name: "关闭" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
