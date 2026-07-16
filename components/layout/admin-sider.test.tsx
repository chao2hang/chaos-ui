import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AdminSider } from "./admin-sider";
import type { AdminSiderProps, MenuItem } from "./admin-sider";

describe("admin-sider", () => {
  it("exports AdminSider", () => {
    expect(AdminSider).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: AdminSiderProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: MenuItem | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });

  it("positions the collapse control relative to the aside (CUI-LAYOUT-02)", () => {
    // absolute -right-3 is only correct when the aside is the containing block.
    const onCollapse = vi.fn();
    const { container } = render(
      <AdminSider
        collapsed={false}
        onCollapse={onCollapse}
        menuItems={[{ key: "home", label: "Home" }]}
      />,
    );
    const aside = container.querySelector(
      '[data-slot="admin-sider"]',
    ) as HTMLElement;
    expect(aside).not.toBeNull();
    expect(aside.className.split(/\s+/)).toContain("relative");
    // lg:static would cancel relative on desktop after mobile drawer open
    expect(aside.className.split(/\s+/)).not.toContain("lg:static");

    const collapse = screen.getByLabelText("Collapse");
    expect(aside.contains(collapse)).toBe(true);
    expect(collapse.className.split(/\s+/)).toContain("absolute");
    expect(collapse.getAttribute("data-slot")).toBe("admin-sider-collapse");
    fireEvent.click(collapse);
    expect(onCollapse).toHaveBeenCalledWith(true);
  });

  it("hides sider-edge collapse when collapseTrigger is header (issue #17)", () => {
    render(
      <AdminSider
        collapsed={false}
        onCollapse={() => {}}
        collapseTrigger="header"
        menuItems={[{ key: "home", label: "Home" }]}
      />,
    );
    expect(screen.queryByLabelText("Collapse")).toBeNull();
    expect(
      document.querySelector('[data-slot="admin-sider-collapse"]'),
    ).toBeNull();
  });

  it("keeps menu labels mounted while collapsed for width sync animation (issue #18)", () => {
    const { container, rerender } = render(
      <AdminSider
        collapsed={false}
        onCollapse={() => {}}
        menuItems={[{ key: "home", label: "Home" }]}
      />,
    );
    expect(screen.getByText("Home")).toBeDefined();
    const aside = container.querySelector(
      '[data-slot="admin-sider"]',
    ) as HTMLElement;
    expect(aside.className).toMatch(/transition-\[width\]/);

    rerender(
      <AdminSider
        collapsed
        onCollapse={() => {}}
        menuItems={[{ key: "home", label: "Home" }]}
      />,
    );
    // Label stays in DOM (opacity/max-width hide) instead of unmount flash-cut
    expect(screen.getByText("Home")).toBeDefined();
    const label = screen.getByText("Home");
    expect(label.className.split(/\s+/)).toContain("opacity-0");
    expect(label.className.split(/\s+/)).toContain("max-w-0");
  });

  it("keeps a positioning containing block when the mobile drawer is open", () => {
    const { container } = render(
      <AdminSider
        collapsed={false}
        onCollapse={() => {}}
        mobileOpen
        menuItems={[{ key: "home", label: "Home" }]}
      />,
    );
    const aside = container.querySelector(
      '[data-slot="admin-sider"]',
    ) as HTMLElement;
    const classes = aside.className.split(/\s+/);
    // cn/tailwind-merge drops base `relative` when `fixed` is present — that's OK
    // because `fixed` is itself a containing block for absolute children.
    expect(classes).toContain("fixed");
    // Desktop must restore relative, never lg:static (that re-broke CUI-LAYOUT-02).
    expect(classes).not.toContain("lg:static");
    expect(classes).toContain("lg:relative");
  });

  const nestedMenu = [
    {
      key: "system",
      label: "System",
      children: [
        { key: "system-users", label: "Users" },
        { key: "system-roles", label: "Roles" },
      ],
    },
  ];

  it("auto-expands ancestors and marks branch active for nested selectedKey (CUI-NAV-02)", () => {
    const { container } = render(
      <AdminSider
        collapsed={false}
        selectedKey="system-users"
        menuItems={nestedMenu}
      />,
    );
    // Nested child is visible because ancestors auto-expand
    expect(screen.getByText("Users")).toBeDefined();
    const parent = container.querySelector(
      '[data-menu-key="system"]',
    ) as HTMLElement;
    const child = container.querySelector(
      '[data-menu-key="system-users"]',
    ) as HTMLElement;
    expect(parent.getAttribute("data-active-branch")).toBe("true");
    expect(child.getAttribute("aria-current")).toBe("page");
  });

  it("auto-expands path-style keys on deep-link selectedKey (issue #9)", () => {
    const policyMenu = [
      {
        key: "/policy",
        label: "政策管理",
        children: [
          { key: "/policy/price-list", label: "价格表" },
          { key: "/policy/list", label: "政策列表" },
        ],
      },
    ];
    const { container } = render(
      <AdminSider
        collapsed={false}
        selectedKey="/policy/list"
        menuItems={policyMenu}
      />,
    );
    expect(screen.getByText("政策列表")).toBeDefined();
    expect(screen.getByText("价格表")).toBeDefined();
    const parent = container.querySelector(
      '[data-menu-key="/policy"]',
    ) as HTMLElement;
    const child = container.querySelector(
      '[data-menu-key="/policy/list"]',
    ) as HTMLElement;
    expect(parent.getAttribute("data-active-branch")).toBe("true");
    expect(child.getAttribute("aria-current")).toBe("page");
  });

  it("prefix-matches deeper routes onto the longest menu key", () => {
    const policyMenu = [
      {
        key: "/policy",
        label: "政策管理",
        children: [{ key: "/policy/list", label: "政策列表" }],
      },
    ];
    const { container } = render(
      <AdminSider
        collapsed={false}
        selectedKey="/policy/list/42?tab=detail"
        selectedMatch="prefix"
        menuItems={policyMenu}
      />,
    );
    expect(screen.getByText("政策列表")).toBeDefined();
    const child = container.querySelector(
      '[data-menu-key="/policy/list"]',
    ) as HTMLElement;
    expect(child.getAttribute("aria-current")).toBe("page");
  });

  it("exact match does not prefix-select deeper routes", () => {
    const policyMenu = [
      {
        key: "/policy",
        label: "政策管理",
        children: [{ key: "/policy/list", label: "政策列表" }],
      },
    ];
    const { container } = render(
      <AdminSider
        collapsed={false}
        selectedKey="/policy/list/42"
        selectedMatch="exact"
        menuItems={policyMenu}
      />,
    );
    // Parent not auto-expanded when no exact menu key matches
    expect(screen.queryByText("政策列表")).toBeNull();
    const parent = container.querySelector(
      '[data-menu-key="/policy"]',
    ) as HTMLElement;
    expect(parent.getAttribute("aria-current")).toBeNull();
    expect(parent.getAttribute("data-active-branch")).toBeNull();
  });

  it("renders href items through linkComponent (CUI-NAV-01)", () => {
    function FakeLink({
      href,
      children,
      ...rest
    }: {
      href: string;
      children?: React.ReactNode;
      className?: string;
    }) {
      return (
        <span data-testid="fake-link" data-href={href} {...rest}>
          {children}
        </span>
      );
    }
    render(
      <AdminSider
        collapsed={false}
        menuItems={[{ key: "home", label: "Home", href: "/home" }]}
        linkComponent={FakeLink}
      />,
    );
    const link = screen.getByTestId("fake-link");
    expect(link.getAttribute("data-href")).toBe("/home");
    expect(screen.getByText("Home")).toBeDefined();
  });

  it("prevents default navigation when href is set and onItemClick handles routing", () => {
    const onItemClick = vi.fn();
    render(
      <AdminSider
        collapsed={false}
        menuItems={[{ key: "home", label: "Home", href: "/home" }]}
        onItemClick={onItemClick}
      />,
    );
    const anchor = screen.getByText("Home").closest("a") as HTMLAnchorElement;
    const event = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    });
    anchor.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
    fireEvent.click(anchor);
    expect(onItemClick).toHaveBeenCalled();
  });

  it("opens a flyout for nested items when collapsed (issue #10)", () => {
    const onItemClick = vi.fn();
    render(
      <AdminSider
        collapsed
        onCollapse={() => {}}
        menuItems={[
          {
            key: "system",
            label: "System",
            icon: <span data-testid="sys-icon">S</span>,
            children: [{ key: "system-users", label: "Users" }],
          },
        ]}
        onItemClick={onItemClick}
      />,
    );
    // Children not inline while collapsed
    expect(screen.queryByText("Users")).toBeNull();
    fireEvent.click(screen.getByTestId("sys-icon").closest("a") as HTMLElement);
    expect(screen.getByText("Users")).toBeDefined();
    fireEvent.click(screen.getByText("Users"));
    expect(onItemClick).toHaveBeenCalledWith(
      expect.objectContaining({ key: "system-users" }),
    );
  });

  it("prefers logoCollapsed when collapsed (issue #11)", () => {
    render(
      <AdminSider
        collapsed
        onCollapse={() => {}}
        logo={
          <div>
            <span>Full Brand Title</span>
          </div>
        }
        logoCollapsed={<span data-testid="logo-collapsed">F</span>}
        menuItems={[]}
      />,
    );
    expect(screen.getByTestId("logo-collapsed")).toBeDefined();
    // #18 keeps expanded logo mounted for crossfade; it must be visually/aria hidden
    const full = screen.getByText("Full Brand Title");
    expect(full.closest("[aria-hidden='true']")).not.toBeNull();
  });

  it("overflow-hides ReactNode logo when collapsed without logoCollapsed (issue #11)", () => {
    const { container } = render(
      <AdminSider
        collapsed
        onCollapse={() => {}}
        logo={
          <div>
            <span>Full Brand Title</span>
          </div>
        }
        menuItems={[]}
      />,
    );
    const logoSlot = container.querySelector(
      '[data-slot="admin-sider-logo"]',
    ) as HTMLElement;
    expect(logoSlot).not.toBeNull();
    expect(logoSlot.className.split(/\s+/)).toContain("overflow-hidden");
  });

  const multiGroupMenu: MenuItem[] = [
    {
      key: "users",
      label: "Users",
      children: [
        { key: "users-list", label: "All users" },
        { key: "users-roles", label: "Roles" },
      ],
    },
    {
      key: "settings",
      label: "Settings",
      children: [
        { key: "settings-general", label: "General" },
        { key: "settings-security", label: "Security" },
      ],
    },
  ];

  it("menuExpandMode multiple keeps both top-level groups open (issue #43)", () => {
    render(
      <AdminSider
        collapsed={false}
        menuExpandMode="multiple"
        menuItems={multiGroupMenu}
      />,
    );
    fireEvent.click(screen.getByText("Users"));
    expect(screen.getByText("All users")).toBeDefined();
    fireEvent.click(screen.getByText("Settings"));
    expect(screen.getByText("All users")).toBeDefined();
    expect(screen.getByText("General")).toBeDefined();
  });

  it("menuExpandMode accordion opens only one top-level group (issue #43)", () => {
    render(
      <AdminSider
        collapsed={false}
        menuExpandMode="accordion"
        menuItems={multiGroupMenu}
      />,
    );
    fireEvent.click(screen.getByText("Users"));
    expect(screen.getByText("All users")).toBeDefined();
    fireEvent.click(screen.getByText("Settings"));
    expect(screen.queryByText("All users")).toBeNull();
    expect(screen.getByText("General")).toBeDefined();
  });

  it("accordion deep-link seed keeps only the active top-level branch (issue #43)", () => {
    render(
      <AdminSider
        collapsed={false}
        menuExpandMode="accordion"
        selectedKey="settings-security"
        menuItems={multiGroupMenu}
      />,
    );
    expect(screen.getByText("Security")).toBeDefined();
    expect(screen.getByText("General")).toBeDefined();
    expect(screen.queryByText("All users")).toBeNull();
  });

  it("accordion allows closing the open top-level group (issue #43)", () => {
    render(
      <AdminSider
        collapsed={false}
        menuExpandMode="accordion"
        menuItems={multiGroupMenu}
      />,
    );
    fireEvent.click(screen.getByText("Users"));
    expect(screen.getByText("All users")).toBeDefined();
    fireEvent.click(screen.getByText("Users"));
    expect(screen.queryByText("All users")).toBeNull();
  });

  it("submenu panel has enter motion classes when expanded (issue #43)", () => {
    const { container } = render(
      <AdminSider
        collapsed={false}
        menuItems={multiGroupMenu}
        selectedKey="users-list"
      />,
    );
    const sub = container.querySelector(
      '[data-slot="admin-sider-submenu"]',
    ) as HTMLElement;
    expect(sub).not.toBeNull();
    expect(sub.className).toMatch(/animate-in|duration-300/);
  });
});
