import { describe, it, expect } from "vitest";
import { crypto } from "./crypto";

describe("crypto", () => {
  it("exports crypto", () => {
    expect(crypto).toBeDefined();
  });
});
