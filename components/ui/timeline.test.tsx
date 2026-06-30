import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Timeline,
  TimelineItem,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
  TimelineTime,
  timelineDotVariants,
} from "./timeline";
import { CheckCircleIcon } from "@/components/ui/icons";

describe("timeline", () => {
  it("exports Timeline", () => {
    expect(Timeline).toBeDefined();
  });

  it("exports TimelineItem", () => {
    expect(TimelineItem).toBeDefined();
  });

  it("exports TimelineDot", () => {
    expect(TimelineDot).toBeDefined();
  });

  it("exports TimelineConnector", () => {
    expect(TimelineConnector).toBeDefined();
  });

  it("exports TimelineContent", () => {
    expect(TimelineContent).toBeDefined();
  });

  it("exports TimelineTitle", () => {
    expect(TimelineTitle).toBeDefined();
  });

  it("exports TimelineDescription", () => {
    expect(TimelineDescription).toBeDefined();
  });

  it("exports TimelineTime", () => {
    expect(TimelineTime).toBeDefined();
  });

  it("exports timelineDotVariants", () => {
    expect(timelineDotVariants).toBeDefined();
  });

  it("renders a timeline with items showing title, description, and time", () => {
    render(
      <Timeline>
        <TimelineItem
          title="Order placed"
          description="Customer placed the order"
          time="10:00 AM"
        />
        <TimelineItem
          title="Shipped"
          description="Package handed to courier"
          time="2:00 PM"
        />
      </Timeline>,
    );
    expect(screen.getByText("Order placed")).toBeDefined();
    expect(screen.getByText("Customer placed the order")).toBeDefined();
    expect(screen.getByText("10:00 AM")).toBeDefined();
    expect(screen.getByText("Shipped")).toBeDefined();
    expect(screen.getByText("Package handed to courier")).toBeDefined();
    expect(screen.getByText("2:00 PM")).toBeDefined();
  });

  it("renders a custom icon inside the dot when provided", () => {
    const { container } = render(
      <Timeline>
        <TimelineItem
          title="Done"
          icon={CheckCircleIcon}
          status="completed"
        />
      </Timeline>,
    );
    expect(screen.getByText("Done")).toBeDefined();
    expect(container.querySelector("svg")).not.toBeNull();
  });

  it("derives variant from status when variant is not provided", () => {
    const { container } = render(
      <Timeline>
        <TimelineItem title="Completed" status="completed" />
        <TimelineItem title="Current" status="current" />
        <TimelineItem title="Pending" status="pending" />
      </Timeline>,
    );
    const dots = container.querySelectorAll(".rounded-full");
    // completed -> success border, current -> info border, pending -> default
    expect(dots[0]?.className).toContain("border-success");
    expect(dots[1]?.className).toContain("border-info");
    expect(dots[2]?.className).toContain("border-muted-foreground");
  });

  it("uses explicit variant over status-derived variant", () => {
    const { container } = render(
      <Timeline>
        <TimelineItem
          title="Warned"
          status="completed"
          variant="warning"
        />
      </Timeline>,
    );
    expect(container.querySelector(".rounded-full")?.className).toContain(
      "border-warning",
    );
  });

  it("renders children inside TimelineContent", () => {
    render(
      <Timeline>
        <TimelineItem title="With body">
          <span>Extra body content</span>
        </TimelineItem>
      </Timeline>,
    );
    expect(screen.getByText("Extra body content")).toBeDefined();
  });

  it("omits title/description/time nodes when not provided", () => {
    const { container } = render(
      <Timeline>
        <TimelineItem />
      </Timeline>,
    );
    expect(container.querySelector("h3")).toBeNull();
    expect(container.querySelector("p")).toBeNull();
    expect(container.querySelector("time")).toBeNull();
  });

  it("TimelineTitle renders an h3", () => {
    render(<TimelineTitle>My Title</TimelineTitle>);
    expect(screen.getByRole("heading", { name: "My Title" })).toBeDefined();
  });

  it("TimelineTime renders a <time> element", () => {
    const { container } = render(<TimelineTime>Now</TimelineTime>);
    expect(container.querySelector("time")?.textContent).toBe("Now");
  });

  it("TimelineConnector renders a connector div", () => {
    const { container } = render(<TimelineConnector />);
    expect(container.querySelector(".bg-border")).not.toBeNull();
  });

  it("timelineDotVariants returns variant class strings", () => {
    expect(timelineDotVariants({ variant: "success" })).toContain(
      "border-success",
    );
    expect(timelineDotVariants({ variant: "destructive" })).toContain(
      "border-destructive",
    );
    expect(timelineDotVariants({ variant: "info" })).toContain("border-info");
    expect(timelineDotVariants({ variant: "warning" })).toContain(
      "border-warning",
    );
    // default variant
    expect(timelineDotVariants({})).toContain("border-muted-foreground");
  });

  it("merges custom className on Timeline root", () => {
    const { container } = render(<Timeline className="my-timeline" />);
    expect(container.firstElementChild?.className).toContain("my-timeline");
  });

  it("module is importable", async () => {
    const mod = await import("@/components/ui/timeline");
    expect(mod.Timeline).toBeDefined();
    expect(mod.TimelineItem).toBeDefined();
  });
});
