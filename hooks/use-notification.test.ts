import { describe, it, expect } from "vitest";
import { useNotification } from "./use-notification";

describe("use-notification", () => {
  it("exports useNotification", () => {
    expect(useNotification).toBeDefined();
  });
});
