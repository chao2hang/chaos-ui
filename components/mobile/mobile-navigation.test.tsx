import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  MobileNavigation,
  type MobileNavigationProps,
} from "@/components/mobile/mobile-navigation";
import { HomeIcon, SettingsIcon, UserIcon } from "@/components/ui/icons";

describe("MobileNavigation", () => {
  it("is exported and type is importable", () => {
    expect(MobileNavigation).toBeDefined();
    const _p: MobileNavigationProps = { items: [] };
    expect(_p.items).toEqual([]);
  });

  it("renders all item labels", () => {
    render(
      <MobileNavigation
        items={[
          { label: "Home" },
          { label: "Profile" },
          { label: "Settings" },
        ]}
      />,
    );
    expect(screen.getByText("Home")).toBeDefined();
    expect(screen.getByText("Profile")).toBeDefined();
    expect(screen.getByText("Settings")).toBeDefined();
  });

  it("renders a link (anchor) when href is provided", () => {
    const { container } = render(
      <MobileNavigation items={[{ label: "Home", href: "/home" }]} />,
    );
    const anchor = container.querySelector('a[href="/home"]');
    expect(anchor).not.toBeNull();
    expect(screen.getByText("Home")).toBeDefined();
  });

  it("renders a button (no anchor) when href omitted", () => {
    const { container } = render(
      <MobileNavigation items={[{ label: "Tap" }]} />,
    );
    expect(container.querySelector("a")).toBeNull();
    expect(screen.getByText("Tap")).toBeDefined();
  });

  it("applies default variant for active items, outline otherwise", () => {
    const { container } = render(
      <MobileNavigation
        items={[
          { label: "Active", active: true },
          { label: "Inactive", active: false },
        ]}
      />,
    );
    const buttons = container.querySelectorAll('[data-slot="button"]');
    expect(buttons.length).toBe(2);
    // active -> default variant (bg-primary), inactive -> outline (border)
    expect(buttons[0]?.className).toContain("bg-primary");
    expect(buttons[1]?.className).toContain("border");
  });

  it("fires onClick when item clicked", () => {
    const onClick = vi.fn();
    render(<MobileNavigation items={[{ label: "Go", onClick }]} />);
    fireEvent.click(screen.getByText("Go"));
    expect(onClick).toHaveBeenCalled();
  });

  it("renders item icon when provided", () => {
    const { container } = render(
      <MobileNavigation
        items={[{ label: "Home", icon: HomeIcon }]}
      />,
    );
    // icon svg present
    expect(container.querySelector("svg")).not.toBeNull();
    expect(screen.getByText("Home")).toBeDefined();
  });

  it("renders multiple icons", () => {
    const { container } = render(
      <MobileNavigation
        items={[
          { label: "A", icon: UserIcon },
          { label: "B", icon: SettingsIcon },
        ]}
      />,
    );
    expect(container.querySelectorAll("svg").length).toBe(2);
  });

  it("renders nothing visible for empty items", () => {
    const { container } = render(<MobileNavigation items={[]} />);
    // no buttons rendered
    expect(container.querySelectorAll('[data-slot="button"]')).toHaveLength(0);
  });

  it("applies custom className", () => {
    const { container } = render(
      <MobileNavigation items={[{ label: "x" }]} className="nav-custom" />,
    );
    // className applied to ScrollArea root wrapper
    expect(container.innerHTML).toContain("nav-custom");
  });

  it("clicking active item still fires onClick", () => {
    const onClick = vi.fn();
    render(
      <MobileNavigation items={[{ label: "Active", active: true, onClick }]} />,
    );
    fireEvent.click(screen.getByText("Active"));
    expect(onClick).toHaveBeenCalled();
  });

  it("href + icon together render link with icon", () => {
    const { container } = render(
      <MobileNavigation
        items={[{ label: "Linked", href: "/x", icon: HomeIcon }]}
      />,
    );
    expect(container.querySelector('a[href="/x"]')).not.toBeNull();
    expect(container.querySelector("svg")).not.toBeNull();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/mobile/mobile-navigation");
    expect(mod.MobileNavigation).toBeDefined();
  });
});
