import { describe, it, expect } from "vitest";
import { PhotoAudit } from "./photo-audit";
import type { PhotoAuditProps } from "./photo-audit";

describe("photo-audit", () => {
  it("exports PhotoAudit", () => {
    expect(PhotoAudit).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: PhotoAuditProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
