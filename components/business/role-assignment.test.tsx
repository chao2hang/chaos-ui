import { describe, it, expect } from "vitest";
import { RoleAssignment } from "./role-assignment";
import type {
  RoleAssignmentPrincipal,
  RoleAssignmentRole,
  RoleAssignmentValue,
  RoleAssignmentProps,
} from "./role-assignment";

describe("role-assignment", () => {
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
});
