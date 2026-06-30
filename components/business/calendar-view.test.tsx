import { describe, it, expect } from "vitest";
import { CalendarView } from "./calendar-view";
import type { CalendarViewProps } from "./calendar-view";

describe("calendar-view", () => {
  it("exports CalendarView", () => {
    expect(CalendarView).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: CalendarViewProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
