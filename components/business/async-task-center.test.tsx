import { describe, it, expect } from "vitest";
import { AsyncTaskCenter } from "./async-task-center";
import type {
  AsyncTaskCenterProps,
  AsyncTask,
  TaskStatus,
} from "./async-task-center";

describe("async-task-center", () => {
  it("exports AsyncTaskCenter", () => {
    expect(AsyncTaskCenter).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: AsyncTaskCenterProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: AsyncTask | undefined = undefined;
    expect(_tc2).toBeUndefined();
    const _tc3: TaskStatus | undefined = undefined;
    expect(_tc3).toBeUndefined();
  });
});
