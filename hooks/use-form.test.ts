import { describe, it, expect } from "vitest";
import { useForm } from "./use-form";

describe("use-form", () => {
  it("exports useForm", () => {
    expect(useForm).toBeDefined();
  });
});
