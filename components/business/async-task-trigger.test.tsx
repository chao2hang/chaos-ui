import { describe, it, expect } from "vitest";
import { AsyncTaskTrigger } from "./async-task-trigger";
import type { AsyncTaskTriggerProps } from "./async-task-trigger";

describe("async-task-trigger", () => {
  it("exports AsyncTaskTrigger", () => {
    expect(AsyncTaskTrigger).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: AsyncTaskTriggerProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
