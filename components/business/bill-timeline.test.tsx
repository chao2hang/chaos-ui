import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BillTimeline } from "./bill-timeline";
import type { BillTimelineProps } from "./bill-timeline";

describe("BillTimeline", () => {
  it("renders each event title and formatted timestamp", () => {
    render(
      <BillTimeline
        events={[
          { id: "1", title: "提交申请", timestamp: "2026-06-01T10:00:00" },
          { id: "2", title: "审批通过", timestamp: "2026-06-02T15:30:00" },
        ]}
      />,
    );
    expect(screen.getByText("提交申请")).toBeDefined();
    expect(screen.getByText("审批通过")).toBeDefined();
    expect(screen.getByText("2026年6月1日 10:00")).toBeDefined();
    expect(screen.getByText("2026年6月2日 15:30")).toBeDefined();
  });

  it("renders the event description when provided", () => {
    render(
      <BillTimeline
        events={[
          {
            id: "1",
            title: "提交申请",
            description: "由张三提交",
            timestamp: "2026-06-01T10:00:00",
          },
        ]}
      />,
    );
    expect(screen.getByText("由张三提交")).toBeDefined();
  });

  it("omits the description when not provided", () => {
    render(
      <BillTimeline
        events={[{ id: "1", title: "提交申请", timestamp: "2026-06-01T10:00:00" }]}
      />,
    );
    expect(screen.queryByText("由张三提交")).toBeNull();
  });

  it("renders events inside an ordered list", () => {
    render(
      <BillTimeline
        events={[{ id: "1", title: "提交申请", timestamp: "2026-06-01T10:00:00" }]}
      />,
    );
    expect(screen.getByRole("list")).toBeDefined();
  });

  it("exports types", () => {
    const _tc: BillTimelineProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });
});
