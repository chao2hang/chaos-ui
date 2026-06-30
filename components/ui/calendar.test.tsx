import { describe, it, expect } from "vitest";
import { Calendar, CalendarDayButton } from "./calendar";

describe("calendar", () => {
  it("exports Calendar", () => {
    expect(Calendar).toBeDefined();
  });

  it("exports CalendarDayButton", () => {
    expect(CalendarDayButton).toBeDefined();
  });
});
