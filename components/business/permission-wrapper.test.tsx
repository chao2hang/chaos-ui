import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import * as React from "react";
import {
  PermissionWrapper,
  PermissionButton,
  withPermission,
} from "./permission-wrapper";
import { PermissionProvider } from "@/hooks/use-permission";
import type {
  PermissionWrapperProps,
  PermissionButtonProps,
} from "./permission-wrapper";

function Inner({ label }: { label: string }) {
  return <div>{label}</div>;
}

describe("PermissionWrapper", () => {
  it("exports PermissionWrapper, PermissionButton, withPermission", () => {
    expect(PermissionWrapper).toBeDefined();
    expect(PermissionButton).toBeDefined();
    expect(withPermission).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: PermissionWrapperProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: PermissionButtonProps | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });

  it("renders children when authorized via usePermission provider", () => {
    render(
      <PermissionProvider permissions={["order:approve"]}>
        <PermissionWrapper code="order:approve">
          <Inner label="ApproveBtn" />
        </PermissionWrapper>
      </PermissionProvider>,
    );
    expect(screen.getByText("ApproveBtn")).toBeDefined();
  });

  it("hides children (hide mode) when unauthorized", () => {
    render(
      <PermissionProvider permissions={[]}>
        <PermissionWrapper code="order:delete">
          <Inner label="DeleteBtn" />
        </PermissionWrapper>
      </PermissionProvider>,
    );
    expect(screen.queryByText("DeleteBtn")).toBeNull();
  });

  it("renders fallback in hide mode when unauthorized", () => {
    render(
      <PermissionProvider permissions={[]}>
        <PermissionWrapper
          code="order:delete"
          fallback={<span>NoAccess</span>}
        >
          <Inner label="DeleteBtn" />
        </PermissionWrapper>
      </PermissionProvider>,
    );
    expect(screen.getByText("NoAccess")).toBeDefined();
    expect(screen.queryByText("DeleteBtn")).toBeNull();
  });

  it("disables (dim + block) children in disable mode when unauthorized", () => {
    const { container } = render(
      <PermissionProvider permissions={[]}>
        <PermissionWrapper code="order:delete" mode="disable">
          <Inner label="DeleteBtn" />
        </PermissionWrapper>
      </PermissionProvider>,
    );
    expect(screen.getByText("DeleteBtn")).toBeDefined();
    const wrapper = container.querySelector('[aria-disabled="true"]');
    expect(wrapper).not.toBeNull();
    expect(wrapper?.className).toContain("opacity-50");
    expect(wrapper?.className).toContain("pointer-events-none");
  });

  it("uses custom check prop to override usePermission", () => {
    // Provider would authorize, but check returns false -> unauthorized
    render(
      <PermissionProvider permissions={["order:approve"]}>
        <PermissionWrapper code="order:approve" check={() => false}>
          <Inner label="ApproveBtn" />
        </PermissionWrapper>
      </PermissionProvider>,
    );
    expect(screen.queryByText("ApproveBtn")).toBeNull();
  });

  it("custom check returning true renders children even without provider grant", () => {
    render(
      <PermissionProvider permissions={[]}>
        <PermissionWrapper code="anything" check={() => true}>
          <Inner label="AlwaysOn" />
        </PermissionWrapper>
      </PermissionProvider>,
    );
    expect(screen.getByText("AlwaysOn")).toBeDefined();
  });
});

describe("PermissionButton", () => {
  it("renders enabled button when authorized", () => {
    render(
      <PermissionProvider permissions={["order:create"]}>
        <PermissionButton code="order:create">Create</PermissionButton>
      </PermissionProvider>,
    );
    const btn = screen.getByText("Create");
    expect(btn).toBeDefined();
    expect(btn.closest("button")?.hasAttribute("disabled")).toBe(false);
  });

  it("renders disabled button when unauthorized", () => {
    render(
      <PermissionProvider permissions={[]}>
        <PermissionButton code="order:create">Create</PermissionButton>
      </PermissionProvider>,
    );
    const btn = screen.getByText("Create").closest("button");
    expect(btn?.hasAttribute("disabled")).toBe(true);
    // wrapped in span with the unauthorized tooltip title
    expect(btn?.closest("span")?.getAttribute("title")).toBeNull();
  });

  it("shows unauthorizedTooltip when unauthorized", () => {
    render(
      <PermissionProvider permissions={[]}>
        <PermissionButton
          code="order:create"
          unauthorizedTooltip="No permission"
        >
          Create
        </PermissionButton>
      </PermissionProvider>,
    );
    const span = screen.getByText("Create").closest("span");
    expect(span?.getAttribute("title")).toBe("No permission");
  });

  it("respects explicit disabled prop when authorized", () => {
    render(
      <PermissionProvider permissions={["order:create"]}>
        <PermissionButton code="order:create" disabled>
          Create
        </PermissionButton>
      </PermissionProvider>,
    );
    expect(
      screen.getByText("Create").closest("button")?.hasAttribute("disabled"),
    ).toBe(true);
  });

  it("fires onClick when authorized", () => {
    const onClick = vi.fn();
    render(
      <PermissionProvider permissions={["order:create"]}>
        <PermissionButton code="order:create" onClick={onClick}>
          Create
        </PermissionButton>
      </PermissionProvider>,
    );
    fireEvent.click(screen.getByText("Create"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe("withPermission HOC", () => {
  it("blocks rendering when unauthorized", () => {
    const Protected = withPermission<{ label: string }>("order:edit")(Inner);
    Protected.displayName = "Protected";
    render(
      <PermissionProvider permissions={[]}>
        <Protected label="EditForm" />
      </PermissionProvider>,
    );
    expect(screen.queryByText("EditForm")).toBeNull();
  });

  it("renders wrapped component when authorized", () => {
    const Protected = withPermission<{ label: string }>("order:edit", <span>Denied</span>)(Inner);
    render(
      <PermissionProvider permissions={["order:edit"]}>
        <Protected label="EditForm" />
      </PermissionProvider>,
    );
    expect(screen.getByText("EditForm")).toBeDefined();
    expect(screen.queryByText("Denied")).toBeNull();
  });

  it("renders fallback when unauthorized", () => {
    const Protected = withPermission<{ label: string }>("order:edit", <span>Denied</span>)(Inner);
    render(
      <PermissionProvider permissions={[]}>
        <Protected label="EditForm" />
      </PermissionProvider>,
    );
    expect(screen.getByText("Denied")).toBeDefined();
    expect(screen.queryByText("EditForm")).toBeNull();
  });

  it("sets displayName", () => {
    const NamedComp = function NamedComp(_: { label: string }) {
      return null;
    };
    const Wrapped = withPermission<{ label: string }>("x")(NamedComp);
    expect(Wrapped.displayName).toBe("withPermission(NamedComp)");
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/permission-wrapper");
    expect(mod.PermissionWrapper).toBeDefined();
  });
});

// keep React import used (type-only reference kept for clarity)
void React;
