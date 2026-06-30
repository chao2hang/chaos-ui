import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { EditToolbar } from "./edit-toolbar";
import type { EditToolbarProps } from "./edit-toolbar";

describe("EditToolbar", () => {
  it("exports EditToolbar", () => {
    expect(EditToolbar).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: EditToolbarProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });

  it("renders Save and Cancel buttons with default text", () => {
    render(<EditToolbar onSave={() => {}} onCancel={() => {}} />);
    expect(screen.getByRole("button", { name: "Save" })).toBeDefined();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeDefined();
  });

  it("uses custom button text", () => {
    render(
      <EditToolbar
        onSave={() => {}}
        onCancel={() => {}}
        onDelete={() => {}}
        showDelete
        saveText="保存"
        cancelText="取消"
        deleteText="删除"
      />,
    );
    expect(screen.getByRole("button", { name: "保存" })).toBeDefined();
    expect(screen.getByRole("button", { name: "取消" })).toBeDefined();
    expect(screen.getByRole("button", { name: "删除" })).toBeDefined();
  });

  it("omits delete button when showDelete is false", () => {
    render(
      <EditToolbar onSave={() => {}} onDelete={() => {}} showDelete={false} />,
    );
    expect(screen.queryByRole("button", { name: "Delete" })).toBeNull();
  });

  it("omits delete button when onDelete is missing even if showDelete is true", () => {
    render(<EditToolbar onSave={() => {}} showDelete />);
    expect(screen.queryByRole("button", { name: "Delete" })).toBeNull();
  });

  it("omits save/cancel when their callbacks are missing", () => {
    render(<EditToolbar />);
    expect(screen.queryByRole("button", { name: "Save" })).toBeNull();
    expect(screen.queryByRole("button", { name: "Cancel" })).toBeNull();
  });

  it("calls onSave, onCancel, and onDelete when clicked", () => {
    const onSave = vi.fn();
    const onCancel = vi.fn();
    const onDelete = vi.fn();
    render(
      <EditToolbar
        onSave={onSave}
        onCancel={onCancel}
        onDelete={onDelete}
        showDelete
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    fireEvent.click(screen.getByRole("button", { name: "Delete" }));
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it("disables action buttons and shows loading text when loading", () => {
    render(
      <EditToolbar
        onSave={() => {}}
        onCancel={() => {}}
        onDelete={() => {}}
        showDelete
        loading
      />,
    );
    expect(
      (screen.getByRole("button", { name: "..." }) as HTMLButtonElement).disabled,
    ).toBe(true);
    expect(
      (screen.getByRole("button", { name: "Cancel" }) as HTMLButtonElement)
        .disabled,
    ).toBe(true);
    expect(
      (screen.getByRole("button", { name: "Delete" }) as HTMLButtonElement)
        .disabled,
    ).toBe(true);
  });

  it("disables save button when saveDisabled is true (without loading)", () => {
    render(<EditToolbar onSave={() => {}} saveDisabled />);
    expect(
      (screen.getByRole("button", { name: "Save" }) as HTMLButtonElement)
        .disabled,
    ).toBe(true);
  });

  it("renders extra actions before the divider", () => {
    render(
      <EditToolbar
        onSave={() => {}}
        extraActions={<button type="button">Extra</button>}
      />,
    );
    expect(screen.getByRole("button", { name: "Extra" })).toBeDefined();
  });

  it("applies align classes", () => {
    const { container: c1 } = render(
      <EditToolbar onSave={() => {}} align="start" />,
    );
    expect(
      (c1.querySelector('[data-slot="edit-toolbar"]') as HTMLElement).className,
    ).toContain("justify-start");

    const { container: c2 } = render(
      <EditToolbar onSave={() => {}} align="center" />,
    );
    expect(
      (c2.querySelector('[data-slot="edit-toolbar"]') as HTMLElement).className,
    ).toContain("justify-center");

    const { container: c3 } = render(
      <EditToolbar onSave={() => {}} align="end" />,
    );
    expect(
      (c3.querySelector('[data-slot="edit-toolbar"]') as HTMLElement).className,
    ).toContain("justify-end");
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/edit-toolbar");
    expect(mod.EditToolbar).toBeDefined();
  });
});
