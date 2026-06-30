import { describe, it, expect } from "vitest";
import { TaskHistory } from "./task-history";
import type { TaskHistoryProps } from "./task-history";

describe("task-history", () => {
  it("exports TaskHistory", () => {
    expect(TaskHistory).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: TaskHistoryProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
