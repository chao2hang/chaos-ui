import { describe, it, expect } from "vitest";
import {
  ConfirmDialog,
  useConfirm,
  ConfirmDialogContainer,
} from "./confirm-dialog";

describe("confirm-dialog", () => {
  it("exports ConfirmDialog", () => {
    expect(ConfirmDialog).toBeDefined();
  });

  it("exports useConfirm", () => {
    expect(useConfirm).toBeDefined();
  });

  it("exports ConfirmDialogContainer", () => {
    expect(ConfirmDialogContainer).toBeDefined();
  });
});
