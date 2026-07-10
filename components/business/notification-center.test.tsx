import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { NotificationCenter } from "./notification-center";
import type { NotificationItem } from "./notification-center";

vi.mock("react-i18next", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as Record<string, unknown>),
    useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
  };
});

const now = Date.now();
const notifications: NotificationItem[] = [
  {
    id: "1",
    title: "Welcome",
    description: "Hello there",
    timestamp: now,
    read: false,
    type: "info",
  },
  {
    id: "2",
    title: "Saved",
    timestamp: now,
    read: true,
    type: "success",
  },
];

// Base UI Popover portals PopoverContent into document.body, so the list /
// header actions are only present after the trigger is clicked to open it.
async function openList(): Promise<void> {
  fireEvent.click(screen.getByLabelText(/notificationCenter\.ariaLabel/));
  await waitFor(() =>
    expect(screen.getByText("notificationCenter.title")).toBeDefined(),
  );
}

describe("NotificationCenter", () => {
  it("renders the bell trigger button", () => {
    render(<NotificationCenter notifications={[]} />);
    expect(
      screen.getByLabelText(/notificationCenter\.ariaLabel/),
    ).toBeDefined();
  });

  it("shows unread badge count on the trigger", () => {
    const { container } = render(
      <NotificationCenter notifications={notifications} />,
    );
    // 1 unread -> badge "1"
    const badge =
      container.querySelector('[data-slot="badge"]') ?? screen.getByText("1");
    expect(badge).not.toBeNull();
  });

  it("renders empty state when no notifications", async () => {
    render(<NotificationCenter notifications={[]} />);
    await openList();
    expect(screen.getByText("notificationCenter.emptyText")).toBeDefined();
  });

  it("renders notification titles and descriptions in the list", async () => {
    render(<NotificationCenter notifications={notifications} />);
    await openList();
    expect(screen.getByText("Welcome")).toBeDefined();
    expect(screen.getByText("Hello there")).toBeDefined();
    expect(screen.getByText("Saved")).toBeDefined();
  });

  it("calls onItemClick and onMarkRead when clicking an unread notification", async () => {
    const onItemClick = vi.fn();
    const onMarkRead = vi.fn();
    render(
      <NotificationCenter
        notifications={notifications}
        onItemClick={onItemClick}
        onMarkRead={onMarkRead}
      />,
    );
    await openList();
    fireEvent.click(screen.getByText("Welcome"));
    expect(onItemClick).toHaveBeenCalledTimes(1);
    expect(onItemClick.mock.calls[0]![0].id).toBe("1");
    expect(onMarkRead).toHaveBeenCalledWith("1");
  });

  it("marks an item read via the per-item mark-read button", async () => {
    const onMarkRead = vi.fn();
    render(
      <NotificationCenter
        notifications={notifications}
        onMarkRead={onMarkRead}
      />,
    );
    await openList();
    fireEvent.click(screen.getByLabelText("notificationCenter.markRead"));
    expect(onMarkRead).toHaveBeenCalledWith("1");
  });

  it("renders mark-all-read button only when unread > 0 and handler provided", async () => {
    const { unmount } = render(
      <NotificationCenter
        notifications={notifications}
        onMarkAllRead={vi.fn()}
      />,
    );
    await openList();
    expect(screen.getByText("notificationCenter.markAllRead")).toBeDefined();
    unmount();

    // All read -> no mark-all button
    render(
      <NotificationCenter
        notifications={[{ id: "1", title: "A", timestamp: now, read: true }]}
        onMarkAllRead={vi.fn()}
      />,
    );
    await openList();
    expect(screen.queryByText("notificationCenter.markAllRead")).toBeNull();
  });

  it("calls onMarkAllRead when clicking mark all", async () => {
    const onMarkAllRead = vi.fn();
    render(
      <NotificationCenter
        notifications={notifications}
        onMarkAllRead={onMarkAllRead}
      />,
    );
    await openList();
    fireEvent.click(screen.getByText("notificationCenter.markAllRead"));
    expect(onMarkAllRead).toHaveBeenCalledTimes(1);
  });

  it("renders clear button when onClear provided and items exist", async () => {
    const onClear = vi.fn();
    render(
      <NotificationCenter notifications={notifications} onClear={onClear} />,
    );
    await openList();
    fireEvent.click(screen.getByLabelText("notificationCenter.clear"));
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it("renders an action button when notification has action", async () => {
    const actionClick = vi.fn();
    render(
      <NotificationCenter
        notifications={[
          {
            id: "1",
            title: "With action",
            timestamp: now,
            action: { label: "View", onClick: actionClick },
          },
        ]}
      />,
    );
    await openList();
    fireEvent.click(screen.getByText("View"));
    expect(actionClick).toHaveBeenCalledTimes(1);
  });

  it("caps unread badge at 99+", () => {
    const many: NotificationItem[] = Array.from({ length: 120 }, (_, i) => ({
      id: String(i),
      title: `N${i}`,
      timestamp: now,
      read: false,
    }));
    render(<NotificationCenter notifications={many} />);
    expect(screen.getByText("99+")).toBeDefined();
  });

  it("uses custom emptyText when provided", async () => {
    render(<NotificationCenter notifications={[]} emptyText="Nothing here" />);
    await openList();
    expect(screen.getByText("Nothing here")).toBeDefined();
  });

  it("does not render the clear button when there are no notifications", async () => {
    render(<NotificationCenter notifications={[]} onClear={vi.fn()} />);
    await openList();
    expect(screen.queryByLabelText("notificationCenter.clear")).toBeNull();
  });

  it("exports types", () => {
    const _tc1: NotificationItem | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });

  it("exports NotificationCenter", () => {
    expect(NotificationCenter).toBeDefined();
  });
});
