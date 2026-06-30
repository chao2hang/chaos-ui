import { describe, it, expect } from "vitest";
import {
  useConfirmAsync,
  ConfirmProvider,
  confirmAsync,
  useConfirmContext,
} from "./use-confirm-async";

describe("use-confirm-async", () => {
  it("exports useConfirmAsync", () => {
    expect(useConfirmAsync).toBeDefined();
  });
  it("exports ConfirmProvider", () => {
    expect(ConfirmProvider).toBeDefined();
  });
  it("exports confirmAsync", () => {
    expect(confirmAsync).toBeDefined();
  });
  it("exports useConfirmContext", () => {
    expect(useConfirmContext).toBeDefined();
  });
});
