import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { RowActionsMenu } from "@/components/ui/row-actions-menu";
import type { RowMenuItem } from "@/components/ui/row-context-menu";

const items: RowMenuItem[] = [
  { key: "edit", label: "编辑", onClick: vi.fn() },
  { key: "sep", separator: true, label: "" },
  { key: "delete", label: "删除", danger: true, onClick: vi.fn() },
  { key: "locked", label: "重置密码", disabled: true, onClick: vi.fn() },
];

describe("RowActionsMenu", () => {
  it("exports RowActionsMenu", () => {
    expect(RowActionsMenu).toBeDefined();
    expect(typeof RowActionsMenu).toBe("function");
  });

  it("renders default trigger label 操作", () => {
    render(<RowActionsMenu items={items} />);
    expect(screen.getByText("操作")).toBeDefined();
  });

  it("opens menu and invokes item onClick (issue #52)", async () => {
    const onEdit = vi.fn();
    const menuItems: RowMenuItem[] = [
      { key: "edit", label: "编辑", onClick: onEdit },
      { key: "delete", label: "删除", danger: true },
    ];
    render(<RowActionsMenu items={menuItems} />);
    fireEvent.click(screen.getByText("操作"));
    const edit = await screen.findByText("编辑");
    fireEvent.click(edit);
    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it("falls back to onItemSelect when item has no onClick", async () => {
    const onItemSelect = vi.fn();
    render(
      <RowActionsMenu
        items={[{ key: "map", label: "映射" }]}
        onItemSelect={onItemSelect}
      />,
    );
    fireEvent.click(screen.getByText("操作"));
    fireEvent.click(await screen.findByText("映射"));
    expect(onItemSelect).toHaveBeenCalledWith(
      expect.objectContaining({ key: "map", label: "映射" }),
    );
  });

  it("does not call onClick for disabled items", async () => {
    const onLocked = vi.fn();
    render(
      <RowActionsMenu
        items={[
          {
            key: "locked",
            label: "重置密码",
            disabled: true,
            onClick: onLocked,
          },
        ]}
      />,
    );
    fireEvent.click(screen.getByText("操作"));
    const item = await screen.findByText("重置密码");
    fireEvent.click(item);
    expect(onLocked).not.toHaveBeenCalled();
  });

  it("supports custom triggerLabel", () => {
    render(<RowActionsMenu items={items} triggerLabel="更多" />);
    expect(screen.getByText("更多")).toBeDefined();
  });
});
