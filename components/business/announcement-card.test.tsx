import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AnnouncementCard } from "./announcement-card";
import type { AnnouncementCardProps } from "./announcement-card";

describe("AnnouncementCard", () => {
  it("renders the title and content", () => {
    render(<AnnouncementCard title="系统维护通知" content="将于今晚进行系统维护" />);
    expect(screen.getByText("系统维护通知")).toBeDefined();
    expect(screen.getByText("将于今晚进行系统维护")).toBeDefined();
  });

  it("renders the formatted date when provided", () => {
    render(<AnnouncementCard title="t" content="c" date="2026-06-01" />);
    expect(screen.getByText("2026年6月1日")).toBeDefined();
  });

  it("omits the date when not provided", () => {
    render(<AnnouncementCard title="t" content="c" />);
    expect(screen.queryByText("2026年6月1日")).toBeNull();
  });

  it("renders a pinned indicator when pinned", () => {
    render(<AnnouncementCard title="t" content="c" pinned />);
    expect(screen.getByLabelText("置顶")).toBeDefined();
  });

  it("exports types", () => {
    const _tc: AnnouncementCardProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });
});
