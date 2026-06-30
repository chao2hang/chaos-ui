import { describe, it, expect } from "vitest";
import { useAsyncTask } from "./use-async-task";

describe("use-async-task", () => {
  it("exports useAsyncTask", () => {
    expect(useAsyncTask).toBeDefined();
  });
});
