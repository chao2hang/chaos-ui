import { describe, it, expect } from "vitest";
import { FileCard } from "./file-card";
import type { FileCardProps } from "./file-card";

describe("file-card", () => {
  it("exports FileCard", () => {
    expect(FileCard).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: FileCardProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
