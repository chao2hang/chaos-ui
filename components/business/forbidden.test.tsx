import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Forbidden } from "./forbidden";
import type { ForbiddenProps } from "./forbidden";

describe("forbidden", () => {
  it("exports Forbidden", () => {
    expect(Forbidden).toBeDefined();
  });

  it("exports types", () => {
    const _tc: ForbiddenProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders default title and description", () => {
    render(<Forbidden />);
    expect(screen.getByText("暂无访问权限")).toBeDefined();
    expect(
      screen.getByText(
        "您没有访问此内容的权限，请联系管理员或申请权限。",
      ),
    ).toBeDefined();
  });

  it("renders custom title and description", () => {
    render(
      <Forbidden title="无权操作" description="请联系超级管理员" />,
    );
    expect(screen.getByText("无权操作")).toBeDefined();
    expect(screen.getByText("请联系超级管理员")).toBeDefined();
  });

  it("renders the permission code when provided", () => {
    render(<Forbidden code="sys:user:delete" />);
    expect(screen.getByText("sys:user:delete")).toBeDefined();
  });

  it("omits code block when code not provided", () => {
    const { container } = render(<Forbidden />);
    expect(container.querySelector("code")).toBeNull();
  });

  it("omits request-access button when onRequestAccess not provided", () => {
    render(<Forbidden />);
    expect(screen.queryByText("申请权限")).toBeNull();
  });

  it("renders request-access button and fires callback on click", () => {
    const onRequestAccess = vi.fn();
    render(<Forbidden onRequestAccess={onRequestAccess} />);
    const btn = screen.getByText("申请权限");
    fireEvent.click(btn);
    expect(onRequestAccess).toHaveBeenCalledTimes(1);
  });
});
