import { describe, it, expect } from "vitest";
import { VersionHistory } from "./version-history";
import type {
  VersionHistoryItem,
  VersionHistoryProps,
} from "./version-history";

describe("version-history", () => {
  it("exports VersionHistory", () => {
    expect(VersionHistory).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: VersionHistoryItem | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: VersionHistoryProps | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
