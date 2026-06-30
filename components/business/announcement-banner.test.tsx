import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AnnouncementBanner } from "./announcement-banner";
import type {
  AnnouncementBannerProps,
  Announcement,
  BannerPriority,
} from "./announcement-banner";

const baseAnnouncements: Announcement[] = [
  {
    id: "a",
    title: "System maintenance",
    content: "Downtime expected tonight",
    priority: "info",
    link: "/maintenance",
  },
  {
    id: "b",
    title: "Warning notice",
    priority: "warning",
  },
  {
    id: "c",
    title: "Critical outage",
    priority: "critical",
  },
];

describe("AnnouncementBanner", () => {
  it("exports AnnouncementBanner", () => {
    expect(AnnouncementBanner).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: AnnouncementBannerProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: Announcement | undefined = undefined;
    expect(_tc2).toBeUndefined();
    const _tc3: BannerPriority | undefined = undefined;
    expect(_tc3).toBeUndefined();
  });

  it("renders nothing when announcements list is empty", () => {
    const { container } = render(<AnnouncementBanner announcements={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders announcement titles and content", () => {
    render(<AnnouncementBanner announcements={baseAnnouncements} />);
    expect(screen.getByText("System maintenance")).toBeDefined();
    expect(screen.getByText("Downtime expected tonight")).toBeDefined();
    expect(screen.getByText("Warning notice")).toBeDefined();
    expect(screen.getByText("Critical outage")).toBeDefined();
  });

  it("renders a link when announcement has a link", () => {
    render(<AnnouncementBanner announcements={baseAnnouncements} />);
    const link = screen.getByRole("link", { name: "System maintenance" });
    expect(link.getAttribute("href")).toBe("/maintenance");
  });

  it("renders title as a span (not link) when no link is provided", () => {
    render(<AnnouncementBanner announcements={baseAnnouncements} />);
    // Warning notice has no link -> no anchor with that name
    expect(screen.queryByRole("link", { name: "Warning notice" })).toBeNull();
    expect(screen.getByText("Warning notice")).toBeDefined();
  });

  it("sorts by priority (critical first)", () => {
    const { container } = render(
      <AnnouncementBanner announcements={baseAnnouncements} />,
    );
    const titles = Array.from(
      container.querySelectorAll(".font-medium, a.font-medium"),
    ).map((el) => el.textContent);
    // critical -> warning -> info order
    expect(titles.indexOf("Critical outage")).toBeLessThan(
      titles.indexOf("Warning notice"),
    );
    expect(titles.indexOf("Warning notice")).toBeLessThan(
      titles.indexOf("System maintenance"),
    );
  });

  it("removes an announcement when its dismiss button is clicked", () => {
    const onDismiss = vi.fn();
    render(
      <AnnouncementBanner
        announcements={baseAnnouncements}
        onDismiss={onDismiss}
      />,
    );
    // Critical outage is first; find its dismiss button within its container
    const critical = screen.getByText("Critical outage").closest("div")
      ?.parentElement;
    const dismissBtn = critical?.querySelector("button") as HTMLButtonElement;
    fireEvent.click(dismissBtn);
    expect(onDismiss).toHaveBeenCalledWith("c");
    expect(screen.queryByText("Critical outage")).toBeNull();
  });

  it("hides dismiss button when dismissible is false", () => {
    const announcements: Announcement[] = [
      { id: "x", title: "Pinned", priority: "info", dismissible: false },
    ];
    render(<AnnouncementBanner announcements={announcements} />);
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("shows View all button when there are hidden announcements and onViewAll is set", () => {
    const onViewAll = vi.fn();
    const many: Announcement[] = Array.from({ length: 5 }).map((_, i) => ({
      id: `n${i}`,
      title: `Notice ${i}`,
      priority: "info" as BannerPriority,
    }));
    render(
      <AnnouncementBanner
        announcements={many}
        maxVisible={2}
        onViewAll={onViewAll}
      />,
    );
    const viewAll = screen.getByRole("button", { name: /查看全部/ });
    fireEvent.click(viewAll);
    expect(onViewAll).toHaveBeenCalledTimes(1);
  });

  it("does not show View all button when no onViewAll provided", () => {
    const many: Announcement[] = Array.from({ length: 5 }).map((_, i) => ({
      id: `n${i}`,
      title: `Notice ${i}`,
      priority: "info" as BannerPriority,
    }));
    render(<AnnouncementBanner announcements={many} maxVisible={2} />);
    expect(screen.queryByRole("button", { name: /查看全部/ })).toBeNull();
  });

  it("returns null after all announcements are dismissed", () => {
    const announcements: Announcement[] = [
      { id: "only", title: "Solo", priority: "info" },
    ];
    const { container } = render(<AnnouncementBanner announcements={announcements} />);
    const dismissBtn = screen.getByRole("button");
    fireEvent.click(dismissBtn);
    expect(container.firstChild).toBeNull();
  });
});
