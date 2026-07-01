import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import type { ReactNode } from "react";
import {
  PermissionProvider,
  usePermission,
  PermissionContext,
} from "./use-permission";

function Probe() {
  const { permissions, hasPermission, hasAny, hasAll } = usePermission();
  return (
    <div>
      <span data-testid="count">{permissions.length}</span>
      <span data-testid="single">
        {hasPermission("order:create") ? "yes" : "no"}
      </span>
      <span data-testid="any">
        {hasAny(["order:create", "x:missing"]) ? "yes" : "no"}
      </span>
      <span data-testid="all">
        {hasAll(["order:create", "order:read"]) ? "yes" : "no"}
      </span>
      <span data-testid="any-missing">
        {hasAny(["a:missing", "b:missing"]) ? "yes" : "no"}
      </span>
    </div>
  );
}

describe("use-permission", () => {
  it("exports PermissionProvider", () => {
    expect(PermissionProvider).toBeDefined();
  });
  it("exports usePermission", () => {
    expect(usePermission).toBeDefined();
  });
  it("exports PermissionContext", () => {
    expect(PermissionContext).toBeDefined();
  });

  it("renders children inside PermissionProvider", () => {
    render(
      <PermissionProvider permissions={[]}>
        <Probe />
      </PermissionProvider>,
    );
    expect(screen.getByTestId("count")).toBeDefined();
  });

  it("hasPermission reflects granted permissions", () => {
    render(
      <PermissionProvider permissions={["order:create", "order:read"]}>
        <Probe />
      </PermissionProvider>,
    );
    expect(screen.getByTestId("count").textContent).toBe("2");
    expect(screen.getByTestId("single").textContent).toBe("yes");
    expect(screen.getByTestId("any").textContent).toBe("yes");
    expect(screen.getByTestId("all").textContent).toBe("yes");
    expect(screen.getByTestId("any-missing").textContent).toBe("no");
  });

  it("hasAll returns false when a permission is missing", () => {
    function AllProbe() {
      const { hasAll } = usePermission();
      return (
        <span data-testid="all2">
          {hasAll(["order:create", "missing:perm"]) ? "yes" : "no"}
        </span>
      );
    }
    render(
      <PermissionProvider permissions={["order:create"]}>
        <AllProbe />
      </PermissionProvider>,
    );
    expect(screen.getByTestId("all2").textContent).toBe("no");
  });

  it("default context (no provider) grants everything", () => {
    function DefaultProbe() {
      const { hasPermission, hasAny, hasAll, permissions } = usePermission();
      return (
        <div>
          <span data-testid="d-perm">
            {hasPermission("anything") ? "yes" : "no"}
          </span>
          <span data-testid="d-any">{hasAny(["x"]) ? "yes" : "no"}</span>
          <span data-testid="d-all">{hasAll(["x", "y"]) ? "yes" : "no"}</span>
          <span data-testid="d-count">{permissions.length}</span>
        </div>
      );
    }
    render(<DefaultProbe />);
    expect(screen.getByTestId("d-perm").textContent).toBe("yes");
    expect(screen.getByTestId("d-any").textContent).toBe("yes");
    expect(screen.getByTestId("d-all").textContent).toBe("yes");
    expect(screen.getByTestId("d-count").textContent).toBe("0");
  });

  it("recomputes checks when permissions prop changes", () => {
    function Wrapper({
      perms,
      children,
    }: {
      perms: string[];
      children: ReactNode;
    }) {
      return (
        <PermissionProvider permissions={perms}>{children}</PermissionProvider>
      );
    }
    const { rerender } = render(
      <Wrapper perms={["order:create"]}>
        <Probe />
      </Wrapper>,
    );
    expect(screen.getByTestId("single").textContent).toBe("yes");
    rerender(
      <Wrapper perms={["other:perm"]}>
        <Probe />
      </Wrapper>,
    );
    expect(screen.getByTestId("single").textContent).toBe("no");
    expect(screen.getByTestId("count").textContent).toBe("1");
  });

  it("re-renders consumers on interaction within provider", () => {
    const grantedRef = { current: false };
    function ToggleChild() {
      const { hasPermission } = usePermission();
      grantedRef.current = hasPermission("p");
      return <button type="button">noop</button>;
    }
    const { rerender } = render(
      <PermissionProvider permissions={["p"]}>
        <ToggleChild />
      </PermissionProvider>,
    );
    expect(grantedRef.current).toBe(true);
    fireEvent.click(screen.getByText("noop"));
    rerender(
      <PermissionProvider permissions={[]}>
        <ToggleChild />
      </PermissionProvider>,
    );
    expect(grantedRef.current).toBe(false);
  });

  it("hasAny returns false for an empty array", () => {
    function EmptyAnyProbe() {
      const { hasAny } = usePermission();
      return <span data-testid="empty-any">{hasAny([]) ? "yes" : "no"}</span>;
    }
    render(
      <PermissionProvider permissions={["order:create"]}>
        <EmptyAnyProbe />
      </PermissionProvider>,
    );
    // [].some(...) is false → hasAny([]) is false.
    expect(screen.getByTestId("empty-any").textContent).toBe("no");
  });

  it("hasAll returns true for an empty array (vacuous truth)", () => {
    function EmptyAllProbe() {
      const { hasAll } = usePermission();
      return <span data-testid="empty-all">{hasAll([]) ? "yes" : "no"}</span>;
    }
    render(
      <PermissionProvider permissions={["order:create"]}>
        <EmptyAllProbe />
      </PermissionProvider>,
    );
    // [].every(...) is true → hasAll([]) is true.
    expect(screen.getByTestId("empty-all").textContent).toBe("yes");
  });

  it("default context hasAny([]) returns true and hasAll([]) returns true", () => {
    // The default context value short-circuits to `() => true` for every check,
    // so even empty arrays report "yes" (grant-all behaviour).
    function DefaultEmptyProbe() {
      const { hasAny, hasAll } = usePermission();
      return (
        <div>
          <span data-testid="def-any-empty">{hasAny([]) ? "yes" : "no"}</span>
          <span data-testid="def-all-empty">{hasAll([]) ? "yes" : "no"}</span>
        </div>
      );
    }
    render(<DefaultEmptyProbe />);
    expect(screen.getByTestId("def-any-empty").textContent).toBe("yes");
    expect(screen.getByTestId("def-all-empty").textContent).toBe("yes");
  });

  it("permissions array reference is exposed to consumers", () => {
    function PermsProbe() {
      const { permissions } = usePermission();
      return <span data-testid="perms">{permissions.join(",")}</span>;
    }
    render(
      <PermissionProvider permissions={["a", "b", "c"]}>
        <PermsProbe />
      </PermissionProvider>,
    );
    expect(screen.getByTestId("perms").textContent).toBe("a,b,c");
  });
});
