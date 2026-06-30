import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ActivityFeed } from "./activity-feed";
import type { ActivityItem } from "./activity-feed";

function todayAt(hour: number, minute: number): string {
  const d = new Date();
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

function yesterdayAt(hour: number, minute: number): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

function earlierAt(daysAgo: number, hour: number, minute: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

describe("ActivityFeed", () => {
  it("exports ActivityFeed", () => {
    expect(ActivityFeed).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ActivityItem | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });

  it("renders empty state when no items", () => {
    render(<ActivityFeed items={[]} />);
    expect(screen.getByText("No activity yet.")).toBeDefined();
  });

  it("renders empty state by default (items defaults to [])", () => {
    render(<ActivityFeed />);
    expect(screen.getByText("No activity yet.")).toBeDefined();
  });

  it("groups items under Today / Yesterday / Earlier headers", () => {
    const items: ActivityItem[] = [
      { user: "Alice", action: "created an order", time: todayAt(9, 30) },
      { user: "Bob", action: "approved a bill", time: yesterdayAt(14, 5) },
      {
        user: "Carol",
        action: "closed a ticket",
        time: earlierAt(5, 8, 0),
        avatarFallback: "CA",
      },
    ];
    render(<ActivityFeed items={items} />);
    expect(screen.getByText("Today")).toBeDefined();
    expect(screen.getByText("Yesterday")).toBeDefined();
    expect(screen.getByText("Earlier")).toBeDefined();
    expect(screen.getByText("Alice")).toBeDefined();
    expect(screen.getByText("Bob")).toBeDefined();
    expect(screen.getByText("Carol")).toBeDefined();
  });

  it("renders user, action text and avatar fallback", () => {
    const items: ActivityItem[] = [
      {
        user: "Alice",
        action: "uploaded a file",
        time: todayAt(9, 30),
        avatarFallback: "AL",
        variant: "success",
      },
    ];
    const { container } = render(<ActivityFeed items={items} />);
    expect(screen.getByText("Alice")).toBeDefined();
    expect(screen.getByText("uploaded a file")).toBeDefined();
    expect(screen.getByText("AL")).toBeDefined();
    // a <time> element is rendered
    expect(container.querySelector("time")).not.toBeNull();
  });

  it("does not render a group header when that group has no items", () => {
    const items: ActivityItem[] = [
      { user: "Alice", action: "did something", time: todayAt(9, 30) },
    ];
    render(<ActivityFeed items={items} />);
    expect(screen.getByText("Today")).toBeDefined();
    expect(screen.queryByText("Yesterday")).toBeNull();
    expect(screen.queryByText("Earlier")).toBeNull();
  });

  it("renders Load more button when hasMore is true and fires onLoadMore", () => {
    const onLoadMore = vi.fn();
    const items: ActivityItem[] = [
      { user: "Alice", action: "acted", time: todayAt(9, 30) },
    ];
    render(<ActivityFeed items={items} hasMore onLoadMore={onLoadMore} />);
    const btn = screen.getByRole("button", { name: "Load more" });
    fireEvent.click(btn);
    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  it("does not render Load more button when hasMore is false", () => {
    const items: ActivityItem[] = [
      { user: "Alice", action: "acted", time: todayAt(9, 30) },
    ];
    render(<ActivityFeed items={items} />);
    expect(screen.queryByRole("button", { name: "Load more" })).toBeNull();
  });

  it("applies className to root", () => {
    const { container } = render(
      <ActivityFeed items={[]} className="custom-class" />,
    );
    expect(container.firstChild).toHaveProperty("className");
    expect((container.firstChild as HTMLElement).className).toContain(
      "custom-class",
    );
  });
});
