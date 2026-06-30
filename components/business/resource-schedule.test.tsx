import { describe, it, expect } from "vitest";
import { ResourceSchedule } from "./resource-schedule";
import type { ResourceScheduleProps } from "./resource-schedule";

describe("resource-schedule", () => {
  it("exports ResourceSchedule", () => {
    expect(ResourceSchedule).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ResourceScheduleProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
