import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { AuthGuard } from "./auth-guard";
import type { AuthGuardProps } from "./auth-guard";

describe("AuthGuard", () => {
  it("exports AuthGuard", () => {
    expect(AuthGuard).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: AuthGuardProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });

  it("renders children when authorized (default check returns true)", () => {
    render(
      <AuthGuard permission="order:create">
        <button type="button">Create</button>
      </AuthGuard>,
    );
    expect(screen.getByText("Create")).toBeDefined();
  });

  it("renders children when check returns true and passes permission", () => {
    const check = vi.fn(() => true);
    render(
      <AuthGuard permission="order:read" check={check}>
        <span>visible</span>
      </AuthGuard>,
    );
    expect(screen.getByText("visible")).toBeDefined();
    expect(check).toHaveBeenCalledWith("order:read");
  });

  it("hides children in hide mode when unauthorized (default mode)", () => {
    render(
      <AuthGuard permission="order:delete" check={() => false}>
        <button type="button">Delete</button>
      </AuthGuard>,
    );
    expect(screen.queryByText("Delete")).toBeNull();
  });

  it("renders fallback in hide mode when unauthorized", () => {
    render(
      <AuthGuard
        permission="order:delete"
        check={() => false}
        fallback={<span>No access</span>}
      >
        <button type="button">Delete</button>
      </AuthGuard>,
    );
    expect(screen.getByText("No access")).toBeDefined();
    expect(screen.queryByText("Delete")).toBeNull();
  });

  it("defaults fallback to null when not provided and unauthorized", () => {
    const { container } = render(
      <AuthGuard permission="x" check={() => false}>
        <span>hidden</span>
      </AuthGuard>,
    );
    expect(container.textContent).toBe("");
  });

  it("disables children in disable mode when unauthorized (aria-disabled)", () => {
    const { container } = render(
      <AuthGuard permission="order:delete" mode="disable" check={() => false}>
        <button type="button">Delete</button>
      </AuthGuard>,
    );
    const wrapper = container.querySelector('[aria-disabled="true"]');
    expect(wrapper).not.toBeNull();
    expect(screen.getByText("Delete")).toBeDefined();
  });

  it("renders children normally when authorized in disable mode", () => {
    const { container } = render(
      <AuthGuard permission="order:delete" mode="disable" check={() => true}>
        <button type="button">Delete</button>
      </AuthGuard>,
    );
    expect(container.querySelector('[aria-disabled="true"]')).toBeNull();
    expect(screen.getByText("Delete")).toBeDefined();
  });
});
