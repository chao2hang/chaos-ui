import { describe, it, expect } from "vitest";
import { AttachmentList } from "./attachment-list";
import type { AttachmentListProps } from "./attachment-list";

describe("attachment-list", () => {
  it("exports AttachmentList", () => {
    expect(AttachmentList).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: AttachmentListProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
