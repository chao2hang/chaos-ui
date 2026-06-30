import { describe, it, expect } from "vitest";
import { LineEditor } from "./line-editor";
import type {
  LineEditorProps,
  LineColumn,
  LineEditorColumn,
} from "./line-editor";

describe("line-editor", () => {
  it("exports LineEditor", () => {
    expect(LineEditor).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: LineEditorProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: LineColumn | undefined = undefined;
    expect(_tc2).toBeUndefined();
    const _tc3: LineEditorColumn | undefined = undefined;
    expect(_tc3).toBeUndefined();
  });
});
