import { describe, it, expect } from "vitest";
import { DiffViewer } from "./diff-viewer";
import type {
  DiffChangeType,
  DiffViewerItem,
  DiffViewerProps,
} from "./diff-viewer";

describe("diff-viewer", () => {
  it("exports DiffViewer", () => {
    expect(DiffViewer).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: DiffChangeType | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: DiffViewerItem | undefined = undefined;
    expect(_tc2).toBeUndefined();
    const _tc3: DiffViewerProps | undefined = undefined;
    expect(_tc3).toBeUndefined();
  });
});
