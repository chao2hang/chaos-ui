import { describe, it, expect } from "vitest";
import { TaskProgress } from "./task-progress";
import type { TaskProgressProps } from "./task-progress";

describe("task-progress", () => {
  it("exports TaskProgress", () => {
    expect(TaskProgress).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: TaskProgressProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
