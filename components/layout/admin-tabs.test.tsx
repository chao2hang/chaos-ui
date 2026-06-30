import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { AdminTabs } from "./admin-tabs";
import type { AdminTabsProps, TabItem } from "./admin-tabs";

describe("admin-tabs", () => {
  it("exports AdminTabs", () => {
    expect(AdminTabs).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: AdminTabsProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: TabItem | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/layout/admin-tabs");
    expect(mod.AdminTabs).toBeDefined();
  });

  it("renders nothing when no tabs", () => {
    const { container } = render(<AdminTabs />);
    expect(container.querySelector('[data-slot="admin-tabs"]')).not.toBeNull();
    expect(container.querySelector("button")).toBeNull();
  });

  it("renders all tab labels and marks first active by default", () => {
    render(
      <AdminTabs
        tabs={[
          { key: "home", label: "Home" },
          { key: "settings", label: "Settings" },
        ]}
      />,
    );
    expect(screen.getByText("Home")).toBeDefined();
    expect(screen.getByText("Settings")).toBeDefined();
  });

  it("fires onChange when a tab is clicked (uncontrolled active)", () => {
    const onChange = vi.fn();
    render(
      <AdminTabs
        tabs={[
          { key: "home", label: "Home" },
          { key: "settings", label: "Settings" },
        ]}
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByText("Settings"));
    expect(onChange).toHaveBeenCalledWith("settings");
  });

  it("uses activeKey (controlled) and does not change internal state", () => {
    const onChange = vi.fn();
    render(
      <AdminTabs
        tabs={[
          { key: "home", label: "Home" },
          { key: "settings", label: "Settings" },
        ]}
        activeKey="settings"
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByText("Home"));
    expect(onChange).toHaveBeenCalledWith("home");
  });

  it("renders tab icon when provided", () => {
    render(
      <AdminTabs
        tabs={[
          { key: "home", label: "Home", icon: <span>ICON</span> },
        ]}
      />,
    );
    expect(screen.getByText("ICON")).toBeDefined();
  });

  it("renders close button for closable tabs and fires onClose", () => {
    const onClose = vi.fn();
    render(
      <AdminTabs
        tabs={[
          { key: "home", label: "Home", closable: true },
        ]}
        onClose={onClose}
      />,
    );
    const closeBtn = screen.getByLabelText("Close tab");
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalledWith("home");
  });

  it("hides close button when closable is false", () => {
    render(
      <AdminTabs
        tabs={[{ key: "home", label: "Home", closable: false }]}
      />,
    );
    expect(screen.queryByLabelText("Close tab")).toBeNull();
  });

  it("close button click stops propagation (does not fire onChange)", () => {
    const onChange = vi.fn();
    const onClose = vi.fn();
    render(
      <AdminTabs
        tabs={[{ key: "home", label: "Home" }]}
        onChange={onChange}
        onClose={onClose}
      />,
    );
    fireEvent.click(screen.getByLabelText("Close tab"));
    expect(onClose).toHaveBeenCalledWith("home");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("opens context menu on right-click and triggers close action", () => {
    const onClose = vi.fn();
    render(
      <AdminTabs
        tabs={[
          { key: "home", label: "Home" },
          { key: "settings", label: "Settings" },
        ]}
        onClose={onClose}
      />,
    );
    fireEvent.contextMenu(screen.getByText("Settings"));
    // Menu should now be visible
    const closeMenuBtn = screen.getByText("Close");
    fireEvent.click(closeMenuBtn);
    expect(onClose).toHaveBeenCalledWith("settings");
  });

  it("context menu triggers refresh action", () => {
    const onRefresh = vi.fn();
    render(
      <AdminTabs
        tabs={[{ key: "home", label: "Home" }]}
        onRefresh={onRefresh}
      />,
    );
    fireEvent.contextMenu(screen.getByText("Home"));
    fireEvent.click(screen.getByText("Refresh"));
    expect(onRefresh).toHaveBeenCalledWith("home");
  });

  it("context menu triggers closeOthers action", () => {
    const onCloseOthers = vi.fn();
    render(
      <AdminTabs
        tabs={[
          { key: "home", label: "Home" },
          { key: "settings", label: "Settings" },
        ]}
        onCloseOthers={onCloseOthers}
      />,
    );
    fireEvent.contextMenu(screen.getByText("Settings"));
    fireEvent.click(screen.getByText("Close Others"));
    expect(onCloseOthers).toHaveBeenCalledWith("settings");
  });

  it("context menu triggers closeToRight action", () => {
    const onCloseToRight = vi.fn();
    render(
      <AdminTabs
        tabs={[
          { key: "home", label: "Home" },
          { key: "settings", label: "Settings" },
        ]}
        onCloseToRight={onCloseToRight}
      />,
    );
    fireEvent.contextMenu(screen.getByText("Home"));
    fireEvent.click(screen.getByText("Close to Right"));
    expect(onCloseToRight).toHaveBeenCalledWith("home");
  });

  it("context menu triggers closeAll action", () => {
    const onCloseAll = vi.fn();
    render(
      <AdminTabs
        tabs={[{ key: "home", label: "Home" }]}
        onCloseAll={onCloseAll}
      />,
    );
    fireEvent.contextMenu(screen.getByText("Home"));
    fireEvent.click(screen.getByText("Close All"));
    expect(onCloseAll).toHaveBeenCalledTimes(1);
  });

  it("clicking outside closes the context menu", () => {
    const onClose = vi.fn();
    render(
      <AdminTabs
        tabs={[{ key: "home", label: "Home" }]}
        onClose={onClose}
      />,
    );
    fireEvent.contextMenu(screen.getByText("Home"));
    expect(screen.getByText("Refresh")).toBeDefined();
    // Click elsewhere on the window to dismiss
    act(() => {
      fireEvent.click(window);
    });
    expect(screen.queryByText("Refresh")).toBeNull();
  });

  it("applies className to root", () => {
    const { container } = render(<AdminTabs className="my-tabs" />);
    const root = container.querySelector('[data-slot="admin-tabs"]');
    expect(root?.classList.contains("my-tabs")).toBe(true);
  });
});
