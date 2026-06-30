import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TimelineView } from "./timeline-view";

describe("TimelineView", () => {
  it("renders each event title and formatted date", () => {
    render(
      <TimelineView
        events={[
          { id: "e1", date: "2026-06-30", title: "创建账单" },
          { id: "e2", date: "2026-07-01", title: "审核通过", description: "财务已审核" },
        ]}
      />,
    );
    expect(screen.getByText("创建账单")).toBeDefined();
    expect(screen.getByText("审核通过")).toBeDefined();
    expect(screen.getByText("财务已审核")).toBeDefined();
    expect(screen.getByText("2026年6月30日")).toBeDefined();
  });

  it("renders the event list with role=list", () => {
    const { container } = render(
      <TimelineView
        events={[{ id: "e1", date: "2026-06-30", title: "创建账单" }]}
      />,
    );
    expect(container.querySelector('[data-slot="timeline-view"]')?.getAttribute("role")).toBe("list");
  });

  it("renders an empty state when there are no events", () => {
    render(<TimelineView events={[]} />);
    expect(screen.getByText("暂无事件")).toBeDefined();
  });

  it("renders the date inside a <time> element with the correct dateTime", () => {
    render(
      <TimelineView
        events={[{ id: "e1", date: "2026-06-30", title: "创建账单" }]}
      />,
    );
    const time = screen.getByText("2026年6月30日");
    expect(time.tagName).toBe("TIME");
    expect(time.getAttribute("datetime")).toBe("2026-06-30");
  });
});
