import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ResourceSchedule } from "./resource-schedule";

describe("ResourceSchedule", () => {
  it("renders the resource name column and hour headers", () => {
    render(
      <ResourceSchedule
        resources={[{ id: "r1", name: "会议室 A" }]}
        bookings={[]}
      />,
    );
    expect(screen.getByRole("region", { name: "资源调度视图" })).toBeDefined();
    expect(screen.getByText("会议室 A")).toBeDefined();
    expect(screen.getByText("资源")).toBeDefined();
    expect(screen.getByText("08:00")).toBeDefined();
  });

  it("renders a booking block with its title", () => {
    render(
      <ResourceSchedule
        resources={[{ id: "r1", name: "会议室 A" }]}
        bookings={[
          {
            resourceId: "r1",
            start: "2026-06-30T09:00",
            end: "2026-06-30T10:00",
            title: "周会",
          },
        ]}
      />,
    );
    expect(screen.getByText("周会")).toBeDefined();
  });

  it("renders an empty state when there are no resources", () => {
    render(<ResourceSchedule resources={[]} bookings={[]} />);
    expect(screen.getByText("暂无资源")).toBeDefined();
  });
});
