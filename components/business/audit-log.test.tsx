import { describe, it, expect } from "vitest";
import { AuditLog } from "./audit-log";
import type { AuditLogStatus, AuditLogEntry, AuditLogProps } from "./audit-log";

describe("audit-log", () => {
  it("exports AuditLog", () => {
    expect(AuditLog).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: AuditLogStatus | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: AuditLogEntry | undefined = undefined;
    expect(_tc2).toBeUndefined();
    const _tc3: AuditLogProps | undefined = undefined;
    expect(_tc3).toBeUndefined();
  });
});
