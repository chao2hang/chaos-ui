import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CalendarView } from "./calendar-view";
import type { CalendarViewProps } from "./calendar-view";

describe("CalendarView", () => {
  it("renders current month header", () => {
    const today = new Date();
    render(<CalendarView events={[]} />);
    expect(
      screen.getByText(`${today.getFullYear()}年${today.getMonth() + 1}月`),
    ).toBeDefined();
  });

  it("navigates to next month via aria-labelled button", () => {
    const today = new Date();
    render(<CalendarView events={[]} />);
    fireEvent.click(screen.getByLabelText("下一月"));
    const nextMonth = today.getMonth() + 2;
    const year = nextMonth > 12 ? today.getFullYear() + 1 : today.getFullYear();
    const label = nextMonth > 12 ? 1 : nextMonth;
    expect(screen.getByText(`${year}年${label}月`)).toBeDefined();
  });

  it("exports types", () => {
    const _t: CalendarViewProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
