import { describe, it, expect } from "vitest";
import { useModal, ModalRenderer } from "./use-modal";

describe("use-modal", () => {
  it("exports useModal", () => {
    expect(useModal).toBeDefined();
  });
  it("exports ModalRenderer", () => {
    expect(ModalRenderer).toBeDefined();
  });
});
