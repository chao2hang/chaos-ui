import { describe, it, expect } from "vitest";
import { ExpenseLineEditor } from "./expense-line-editor";
import type {
  ExpenseLineEditorProps,
  ExpenseLine,
  CategoryOption,
} from "./expense-line-editor";

describe("expense-line-editor", () => {
  it("exports ExpenseLineEditor", () => {
    expect(ExpenseLineEditor).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ExpenseLineEditorProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: ExpenseLine | undefined = undefined;
    expect(_tc2).toBeUndefined();
    const _tc3: CategoryOption | undefined = undefined;
    expect(_tc3).toBeUndefined();
  });
});
