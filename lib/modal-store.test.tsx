import { describe, it, expect } from "vitest";
import { modalStore, useImperativeModals } from "./modal-store";
import type { ModalKind, ImperativeModalConfig } from "./modal-store";

describe("modal-store", () => {
  it("exports modalStore", () => {
    expect(modalStore).toBeDefined();
  });
  it("exports useImperativeModals", () => {
    expect(useImperativeModals).toBeDefined();
  });
  it("exports types", () => {
    const _tc1: ModalKind | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: ImperativeModalConfig | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
