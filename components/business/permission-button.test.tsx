import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PermissionButton } from "./permission-button";
import type { PermissionButtonProps } from "./permission-button";

describe("PermissionButton", () => {
  it("exports PermissionButton", () => {
    expect(PermissionButton).toBeDefined();
  });

  it("exports types", () => {
    const _tc: PermissionButtonProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders enabled and fires onClick when permitted", () => {
    const onClick = vi.fn();
    render(
      <PermissionButton
        permission="bill:approve"
        permissions={["bill:approve"]}
        onClick={onClick}
      >
        审批
      </PermissionButton>,
    );
    expect(screen.getByText("审批")).toBeDefined();
    fireEvent.click(screen.getByText("审批"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("disables button and shows hint when permission missing (disable mode)", () => {
    const onClick = vi.fn();
    render(
      <PermissionButton
        permission="bill:approve"
        permissions={[]}
        onClick={onClick}
      >
        审批
      </PermissionButton>,
    );
    const btn = screen.getByText("审批").closest("button")!;
    expect(btn.disabled).toBe(true);
    expect(screen.getByText("无权限")).toBeDefined();
    fireEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders nothing when permission missing and mode is hide", () => {
    const { container } = render(
      <PermissionButton permission="bill:approve" permissions={[]} mode="hide">
        审批
      </PermissionButton>,
    );
    expect(screen.queryByText("审批")).toBeNull();
    expect(container.firstChild).toBeNull();
  });

  it("permits by default when no permissions set provided", () => {
    render(<PermissionButton>操作</PermissionButton>);
    expect(screen.getByText("操作")).toBeDefined();
    expect(screen.queryByText("无权限")).toBeNull();
  });

  it("permits by default when permission code is undefined", () => {
    const onClick = vi.fn();
    render(
      <PermissionButton permissions={["x"]} onClick={onClick}>
        操作
      </PermissionButton>,
    );
    const btn = screen.getByText("操作").closest("button")!;
    expect(btn.disabled).toBe(false);
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not show the 无权限 hint in hide mode", () => {
    render(
      <PermissionButton permission="x" permissions={[]} mode="hide">
        操作
      </PermissionButton>,
    );
    expect(screen.queryByText("无权限")).toBeNull();
  });

  it("respects externally controlled disabled even when permitted", () => {
    render(
      <PermissionButton permission="x" permissions={["x"]} disabled>
        操作
      </PermissionButton>,
    );
    const btn = screen.getByText("操作").closest("button")!;
    expect(btn.disabled).toBe(true);
  });

  it("renders default children when none provided", () => {
    render(<PermissionButton permission="x" permissions={["x"]} />);
    expect(screen.getByText("操作")).toBeDefined();
  });

  it("forwards variant prop to the button", () => {
    render(
      <PermissionButton
        permission="x"
        permissions={["x"]}
        variant="destructive"
      >
        删除
      </PermissionButton>,
    );
    const btn = screen.getByText("删除").closest("button")!;
    expect(btn.className).toContain("text-destructive");
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/permission-button");
    expect(mod.PermissionButton).toBeDefined();
  });
});
