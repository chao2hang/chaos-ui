import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MultiTabManager } from "./multi-tab-manager";
import type { MultiTabManagerProps, TabInfo } from "./multi-tab-manager";

describe("multi-tab-manager (deprecated shim over NavigationTabsBar)", () => {
  it("exports MultiTabManager", () => {
    expect(MultiTabManager).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: MultiTabManagerProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: TabInfo | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/layout/multi-tab-manager");
    expect(mod.MultiTabManager).toBeDefined();
  });

  it("renders the underlying NavigationTabsBar root", () => {
    const { container } = render(<MultiTabManager />);
    expect(
      container.querySelector('[data-slot="navigation-tabs-bar"]'),
    ).not.toBeNull();
  });

  it("forwards `tabs` prop to `items`", () => {
    render(
      <MultiTabManager
        tabs={[
          { key: "home", label: "Home" },
          { key: "settings", label: "Settings" },
        ]}
      />,
    );
    expect(screen.getByText("Home")).toBeDefined();
    expect(screen.getByText("Settings")).toBeDefined();
  });

  it("forwards `onTabClick` to `onChange`", () => {
    const onTabClick = vi.fn();
    render(
      <MultiTabManager
        tabs={[
          { key: "home", label: "Home" },
          { key: "settings", label: "Settings" },
        ]}
        activeKey="home"
        onTabClick={onTabClick}
      />,
    );
    fireEvent.click(screen.getByText("Settings"));
    expect(onTabClick).toHaveBeenCalledWith("settings");
  });

  it("forwards `onTabClose` to `onClose` via close button", () => {
    const onTabClose = vi.fn();
    render(
      <MultiTabManager
        tabs={[{ key: "home", label: "Home", closable: true }]}
        activeKey="home"
        onTabClose={onTabClose}
      />,
    );
    fireEvent.click(screen.getByLabelText("Close tab"));
    expect(onTabClose).toHaveBeenCalledWith("home");
  });

  it("forwards `onTabRefresh` via context menu", () => {
    const onTabRefresh = vi.fn();
    render(
      <MultiTabManager
        tabs={[{ key: "home", label: "Home" }]}
        activeKey="home"
        onTabRefresh={onTabRefresh}
      />,
    );
    fireEvent.contextMenu(screen.getByText("Home"));
    fireEvent.click(screen.getByText("Refresh"));
    expect(onTabRefresh).toHaveBeenCalledWith("home");
  });

  it("forwards `onTabCloseOthers` via context menu", () => {
    const onTabCloseOthers = vi.fn();
    render(
      <MultiTabManager
        tabs={[
          { key: "home", label: "Home" },
          { key: "settings", label: "Settings" },
        ]}
        activeKey="home"
        onTabCloseOthers={onTabCloseOthers}
      />,
    );
    fireEvent.contextMenu(screen.getByText("Settings"));
    fireEvent.click(screen.getByText("Close Others"));
    expect(onTabCloseOthers).toHaveBeenCalledWith("settings");
  });

  it("forwards `onTabCloseRight` via context menu", () => {
    const onTabCloseRight = vi.fn();
    render(
      <MultiTabManager
        tabs={[
          { key: "home", label: "Home" },
          { key: "settings", label: "Settings" },
        ]}
        activeKey="home"
        onTabCloseRight={onTabCloseRight}
      />,
    );
    fireEvent.contextMenu(screen.getByText("Home"));
    fireEvent.click(screen.getByText("Close to Right"));
    expect(onTabCloseRight).toHaveBeenCalledWith("home");
  });

  it("forwards `onTabCloseAll` via context menu", () => {
    const onTabCloseAll = vi.fn();
    render(
      <MultiTabManager
        tabs={[{ key: "home", label: "Home" }]}
        activeKey="home"
        onTabCloseAll={onTabCloseAll}
      />,
    );
    fireEvent.contextMenu(screen.getByText("Home"));
    fireEvent.click(screen.getByText("Close All"));
    expect(onTabCloseAll).toHaveBeenCalledTimes(1);
  });

  it("passes through className", () => {
    const { container } = render(<MultiTabManager className="my-tabs" />);
    const root = container.querySelector('[data-slot="navigation-tabs-bar"]');
    expect(root?.classList.contains("my-tabs")).toBe(true);
  });
});
