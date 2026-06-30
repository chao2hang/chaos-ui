import { describe, it, expect } from "vitest";
import { Fab, FabSpeedDial, BackTop } from "./fab";

describe("fab", () => {
  it("exports Fab", () => {
    expect(Fab).toBeDefined();
  });

  it("exports FabSpeedDial", () => {
    expect(FabSpeedDial).toBeDefined();
  });

  it("exports BackTop", () => {
    expect(BackTop).toBeDefined();
  });
});
