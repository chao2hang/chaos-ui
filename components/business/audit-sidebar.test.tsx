import { describe, it, expect } from "vitest";
import { AuditSidebar } from "./audit-sidebar";
import type { AuditSidebarProps, AuditLogEntry } from "./audit-sidebar";

describe("audit-sidebar", () => {
  it("exports AuditSidebar", () => {
    expect(AuditSidebar).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: AuditSidebarProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: AuditLogEntry | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
