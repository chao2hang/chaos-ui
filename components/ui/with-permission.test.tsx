import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { WithPermission } from "./with-permission";

describe("WithPermission", () => {
  it("renders children when permitted (any mode, single require)", () => {
    render(
      <WithPermission permissions={["order:view"]} require="order:view">
        <span>content</span>
      </WithPermission>,
    );
    expect(screen.getByText("content")).toBeDefined();
  });

  it("renders fallback when denied", () => {
    render(
      <WithPermission
        permissions={["order:view"]}
        require="order:approve"
        fallback={<span>no access</span>}
      >
        <span>content</span>
      </WithPermission>,
    );
    expect(screen.getByText("no access")).toBeDefined();
    expect(screen.queryByText("content")).toBeNull();
  });

  it("any mode: matches if at least one required is present", () => {
    render(
      <WithPermission
        permissions={["a"]}
        require={["a", "b"]}
        mode="any"
      >
        <span>ok</span>
      </WithPermission>,
    );
    expect(screen.getByText("ok")).toBeDefined();
  });

  it("all mode: requires every permission", () => {
    render(
      <WithPermission
        permissions={["a"]}
        require={["a", "b"]}
        mode="all"
        fallback={<span>denied</span>}
      >
        <span>ok</span>
      </WithPermission>,
    );
    expect(screen.getByText("denied")).toBeDefined();
    expect(screen.queryByText("ok")).toBeNull();
  });

  it("renders children when require is undefined", () => {
    render(
      <WithPermission permissions={["a"]}>
        <span>open</span>
      </WithPermission>,
    );
    expect(screen.getByText("open")).toBeDefined();
  });

  it("renders fallback (null) by default when no permissions and require set", () => {
    const { container } = render(
      <WithPermission require="secret">
        <span>hidden</span>
      </WithPermission>,
    );
    expect(screen.queryByText("hidden")).toBeNull();
    const root = container.querySelector('[data-slot="with-permission"]');
    expect(root?.getAttribute("data-allowed")).toBe("false");
  });
});
