import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PermissionMatrix } from "./permission-matrix";
import type {
  PermissionMatrixRole,
  PermissionMatrixResource,
  PermissionMatrixValue,
  PermissionMatrixProps,
} from "./permission-matrix";

// permission-matrix uses useTranslation("transfer"); mock so it renders without a provider.
vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
}));

const roles: PermissionMatrixRole[] = [
  { id: "admin", label: "Admin" },
  { id: "viewer", label: "Viewer" },
];

const resources: PermissionMatrixResource[] = [
  {
    id: "orders",
    label: "Orders",
    description: "Manage orders",
    permissions: ["read", "write"],
  },
  {
    id: "users",
    label: "Users",
    permissions: ["read"],
  },
];

describe("PermissionMatrix", () => {
  it("exports PermissionMatrix", () => {
    expect(PermissionMatrix).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: PermissionMatrixRole | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: PermissionMatrixResource | undefined = undefined;
    expect(_tc2).toBeUndefined();
    const _tc3: PermissionMatrixValue | undefined = undefined;
    expect(_tc3).toBeUndefined();
    const _tc4: PermissionMatrixProps | undefined = undefined;
    expect(_tc4).toBeUndefined();
  });

  it("renders role headers and resource labels", () => {
    render(
      <PermissionMatrix
        roles={roles}
        resources={resources}
        value={{}}
      />,
    );
    expect(screen.getByText("Admin")).toBeDefined();
    expect(screen.getByText("Viewer")).toBeDefined();
    expect(screen.getByText("Orders")).toBeDefined();
    expect(screen.getByText("Manage orders")).toBeDefined();
    expect(screen.getByText("Users")).toBeDefined();
  });

  it("renders a checkbox for each permission per role", () => {
    render(
      <PermissionMatrix roles={roles} resources={resources} value={{}} />,
    );
    // 2 resources x roles: orders(2 perms x 2 roles = 4) + users(1 perm x 2 roles = 2) = 6
    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes.length).toBe(6);
    // permission labels are rendered as text next to each checkbox
    const reads = screen.getAllByText("read");
    expect(reads.length).toBe(4); // 2 resources x 2 roles
  });

  it("reflects checked state from value", () => {
    const value: PermissionMatrixValue = {
      admin: { orders: ["read"] },
    };
    render(
      <PermissionMatrix roles={roles} resources={resources} value={value} />,
    );
    const checkboxes = screen.getAllByRole("checkbox");
    // admin/orders/read should be the first checkbox (checked)
    expect(checkboxes[0]!.getAttribute("aria-checked")).toBe("true");
  });

  it("toggles a permission on via onCheckedChange and calls onChange", () => {
    const onChange = vi.fn();
    render(
      <PermissionMatrix
        roles={roles}
        resources={resources}
        value={{}}
        onChange={onChange}
      />,
    );
    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]!);
    expect(onChange).toHaveBeenCalledTimes(1);
    const next = onChange.mock.calls[0]![0] as PermissionMatrixValue;
    expect(next.admin!.orders).toEqual(["read"]);
  });

  it("toggles a permission off when already present", () => {
    const onChange = vi.fn();
    const value: PermissionMatrixValue = {
      admin: { orders: ["read", "write"] },
    };
    render(
      <PermissionMatrix
        roles={roles}
        resources={resources}
        value={value}
        onChange={onChange}
      />,
    );
    const checkboxes = screen.getAllByRole("checkbox");
    // checkbox[0] = admin/orders/read (checked), click to remove
    fireEvent.click(checkboxes[0]!);
    const next = onChange.mock.calls[0]![0] as PermissionMatrixValue;
    expect(next.admin!.orders).toEqual(["write"]);
  });

  it("does not call onChange when readOnly", () => {
    const onChange = vi.fn();
    render(
      <PermissionMatrix
        roles={roles}
        resources={resources}
        value={{}}
        onChange={onChange}
        readOnly
      />,
    );
    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]!);
    expect(onChange).not.toHaveBeenCalled();
    // Base UI Checkbox exposes the disabled state via `data-disabled`.
    expect(checkboxes[0]!.getAttribute("data-disabled")).toBe("");
  });

  it("applies custom className", () => {
    const { container } = render(
      <PermissionMatrix
        roles={roles}
        resources={resources}
        value={{}}
        className="my-matrix"
      />,
    );
    const root = container.querySelector('[data-slot="permission-matrix"]');
    expect(root?.className).toContain("my-matrix");
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/permission-matrix");
    expect(mod.PermissionMatrix).toBeDefined();
  });
});
