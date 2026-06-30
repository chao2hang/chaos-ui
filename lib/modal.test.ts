import { describe, it, expect } from "vitest";
import { Modal } from "./modal";
import type { ModalConfirmOptions, ModalAlertOptions } from "./modal";

describe("modal", () => {
  it("exports Modal", () => {
    expect(Modal).toBeDefined();
  });
  it("exports types", () => {
    const _tc1: ModalConfirmOptions | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: ModalAlertOptions | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
