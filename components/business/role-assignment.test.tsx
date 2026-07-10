import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { RoleAssignment } from "./role-assignment";
import type {
  RoleAssignmentPrincipal,
  RoleAssignmentRole,
  RoleAssignmentValue,
  RoleAssignmentProps,
} from "./role-assignment";

vi.mock("react-i18next", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as Record<string, unknown>),
    useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
  };
});

const principals: RoleAssignmentPrincipal[] = [
  { id: "u1", name: "Alice", description: "Manager" },
  { id: "u2", name: "Bob" },
];

const roles: RoleAssignmentRole[] = [
  { id: "admin", label: "Admin", description: "Full access" },
  { id: "editor", label: "Editor" },
];

describe("RoleAssignment", () => {
  it("exports RoleAssignment", () => {
    expect(RoleAssignment).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: RoleAssignmentPrincipal | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: RoleAssignmentRole | undefined = undefined;
    expect(_tc2).toBeUndefined();
    const _tc3: RoleAssignmentValue | undefined = undefined;
    expect(_tc3).toBeUndefined();
    const _tc4: RoleAssignmentProps | undefined = undefined;
    expect(_tc4).toBeUndefined();
  });

  it("renders principal names, descriptions, and role labels", () => {
    render(<RoleAssignment principals={principals} roles={roles} value={{}} />);
    expect(screen.getByText("Alice")).toBeDefined();
    expect(screen.getByText("Manager")).toBeDefined();
    expect(screen.getByText("Bob")).toBeDefined();
    expect(screen.getAllByText("Admin").length).toBe(2);
    expect(screen.getAllByText("Editor").length).toBe(2);
  });

  it("renders a checkbox per principal x role", () => {
    render(<RoleAssignment principals={principals} roles={roles} value={{}} />);
    // 2 principals x 2 roles = 4 checkboxes
    expect(screen.getAllByRole("checkbox").length).toBe(4);
  });

  it("shows count of assigned roles per principal", () => {
    const value: RoleAssignmentValue = {
      u1: ["admin", "editor"],
      u2: ["editor"],
    };
    render(
      <RoleAssignment principals={principals} roles={roles} value={value} />,
    );
    // badge text: "<count> roleAssignment.roles"
    expect(screen.getByText("2 roleAssignment.roles")).toBeDefined();
    expect(screen.getByText("1 roleAssignment.roles")).toBeDefined();
  });

  it("reflects checked state from value", () => {
    const value: RoleAssignmentValue = { u1: ["admin"] };
    render(
      <RoleAssignment principals={principals} roles={roles} value={value} />,
    );
    const checkboxes = screen.getAllByRole("checkbox");
    // u1/admin (first checkbox) checked
    expect(checkboxes[0]!.getAttribute("aria-checked")).toBe("true");
    // u1/editor (second) unchecked
    expect(checkboxes[1]!.getAttribute("aria-checked")).toBe("false");
  });

  it("toggles a role on via checkbox and calls onChange", () => {
    const onChange = vi.fn();
    render(
      <RoleAssignment
        principals={principals}
        roles={roles}
        value={{}}
        onChange={onChange}
      />,
    );
    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]!);
    expect(onChange).toHaveBeenCalledTimes(1);
    const next = onChange.mock.calls[0]![0] as RoleAssignmentValue;
    expect(next.u1).toEqual(["admin"]);
  });

  it("toggles a role off when already assigned", () => {
    const onChange = vi.fn();
    const value: RoleAssignmentValue = { u1: ["admin", "editor"] };
    render(
      <RoleAssignment
        principals={principals}
        roles={roles}
        value={value}
        onChange={onChange}
      />,
    );
    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]!); // u1/admin off
    const next = onChange.mock.calls[0]![0] as RoleAssignmentValue;
    expect(next.u1).toEqual(["editor"]);
  });

  it("preserves other principals values when toggling", () => {
    const onChange = vi.fn();
    const value: RoleAssignmentValue = { u1: ["admin"], u2: ["editor"] };
    render(
      <RoleAssignment
        principals={principals}
        roles={roles}
        value={value}
        onChange={onChange}
      />,
    );
    const checkboxes = screen.getAllByRole("checkbox");
    // u2/editor is checkbox index 3 (u1: admin, editor; u2: admin, editor)
    fireEvent.click(checkboxes[3]!);
    const next = onChange.mock.calls[0]![0] as RoleAssignmentValue;
    expect(next.u1).toEqual(["admin"]);
    expect(next.u2).toEqual([]);
  });

  it("does not call onChange and disables checkboxes when readOnly", () => {
    const onChange = vi.fn();
    render(
      <RoleAssignment
        principals={principals}
        roles={roles}
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
      <RoleAssignment
        principals={principals}
        roles={roles}
        value={{}}
        className="my-roles"
      />,
    );
    expect(
      container.querySelector('[data-slot="role-assignment"]')?.className,
    ).toContain("my-roles");
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/role-assignment");
    expect(mod.RoleAssignment).toBeDefined();
  });
});
