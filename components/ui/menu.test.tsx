import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  Menu,
  MenuItem,
  MenuSubMenu,
  MenuDivider,
  MenuItemGroup,
} from "@/components/ui/menu";
import type {
  MenuMode,
  MenuTheme,
  MenuSize,
  MenuItemConfig,
  MenuClickInfo,
  MenuProps,
  MenuItemProps,
  SubMenuProps,
} from "@/components/ui/menu";

describe("Menu", () => {
  // --- Type export tests ---
  it("exports Menu component", () => {
    expect(Menu).toBeDefined();
    // forwardRef components have typeof "object" in React 19
    expect(typeof Menu === "function" || typeof Menu === "object").toBe(true);
  });

  it("exports MenuItem component", () => {
    expect(MenuItem).toBeDefined();
    // forwardRef components have typeof "object" in React 19
    expect(typeof MenuItem === "function" || typeof MenuItem === "object").toBe(
      true,
    );
  });

  it("exports MenuSubMenu component", () => {
    expect(MenuSubMenu).toBeDefined();
  });

  it("exports MenuDivider component", () => {
    expect(MenuDivider).toBeDefined();
  });

  it("exports MenuItemGroup component", () => {
    expect(MenuItemGroup).toBeDefined();
  });

  it("exports MenuMode type", () => {
    const mode: MenuMode = "inline";
    expect(mode).toBe("inline");
  });

  it("exports MenuTheme type", () => {
    const theme: MenuTheme = "dark";
    expect(theme).toBe("dark");
  });

  it("exports MenuSize type", () => {
    const size: MenuSize = "lg";
    expect(size).toBe("lg");
  });

  it("exports MenuItemConfig type", () => {
    const config: MenuItemConfig = {
      key: "home",
      label: "Home",
      icon: null,
      disabled: false,
      danger: false,
    };
    expect(config).toBeDefined();
  });

  it("exports MenuClickInfo type", () => {
    const info: MenuClickInfo = {
      key: "home",
      keyPath: ["home"],
      item: { key: "home", label: "Home" },
      domEvent: {} as React.MouseEvent<HTMLElement>,
    };
    expect(info).toBeDefined();
  });

  it("exports MenuProps type", () => {
    const props: MenuProps = {
      mode: "inline",
      theme: "light",
      size: "md",
      selectedKeys: [],
      openKeys: [],
      items: [],
    };
    expect(props).toBeDefined();
  });

  it("exports MenuItemProps type", () => {
    const props: MenuItemProps = {
      key: "test",
      disabled: false,
      danger: false,
    };
    expect(props).toBeDefined();
  });

  it("exports SubMenuProps type", () => {
    const props: SubMenuProps = {
      key: "sub",
      title: "Submenu",
    };
    expect(props).toBeDefined();
  });

  // --- Rendering tests with items API ---
  it("renders menu with items API", () => {
    render(
      <Menu
        mode="inline"
        items={[
          { key: "home", label: "Home" },
          { key: "about", label: "About" },
        ]}
      />,
    );
    expect(screen.getByText("Home")).toBeDefined();
    expect(screen.getByText("About")).toBeDefined();
  });

  it("renders menu with data-slot attribute", () => {
    const result = render(
      <Menu mode="inline" items={[{ key: "home", label: "Home" }]} />,
    );
    expect(result.container.querySelector('[data-slot="menu"]')).not.toBeNull();
  });

  it("renders with data-mode attribute", () => {
    const result = render(
      <Menu mode="inline" items={[{ key: "home", label: "Home" }]} />,
    );
    expect(
      result.container.querySelector('[data-mode="inline"]'),
    ).not.toBeNull();
  });

  it("renders with data-theme attribute", () => {
    const result = render(
      <Menu
        mode="inline"
        theme="dark"
        items={[{ key: "home", label: "Home" }]}
      />,
    );
    expect(
      result.container.querySelector('[data-theme="dark"]'),
    ).not.toBeNull();
  });

  it("renders menu items with data-key attribute", () => {
    render(
      <Menu
        mode="inline"
        items={[
          { key: "home", label: "Home" },
          { key: "about", label: "About" },
        ]}
      />,
    );
    const homeItem = screen.getByText("Home").closest("li");
    expect(homeItem).toHaveAttribute("data-key", "home");
  });

  it("calls onClick when menu item is clicked", () => {
    const onClick = vi.fn();
    render(
      <Menu
        mode="inline"
        items={[{ key: "home", label: "Home" }]}
        onClick={onClick}
      />,
    );
    fireEvent.click(screen.getByText("Home"));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(
      expect.objectContaining({ key: "home" }),
    );
  });

  it("calls onSelect when item is selected", () => {
    const onSelect = vi.fn();
    render(
      <Menu
        mode="inline"
        items={[{ key: "home", label: "Home" }]}
        onSelect={onSelect}
      />,
    );
    fireEvent.click(screen.getByText("Home"));
    expect(onSelect).toHaveBeenCalledWith({
      key: "home",
      selectedKeys: ["home"],
    });
  });

  it("calls onDeselect when selected item is clicked again", () => {
    const onDeselect = vi.fn();
    render(
      <Menu
        mode="inline"
        defaultSelectedKeys={["home"]}
        items={[{ key: "home", label: "Home" }]}
        onDeselect={onDeselect}
      />,
    );
    fireEvent.click(screen.getByText("Home"));
    expect(onDeselect).toHaveBeenCalledWith({
      key: "home",
      selectedKeys: [],
    });
  });

  it("renders disabled item with data-disabled attribute", () => {
    render(
      <Menu
        mode="inline"
        items={[{ key: "home", label: "Home", disabled: true }]}
      />,
    );
    // The button itself has the disabled attribute
    const btn = screen.getByText("Home").closest("button");
    expect(btn?.disabled).toBe(true);
  });

  it("does not select disabled items on click", () => {
    const onSelect = vi.fn();
    render(
      <Menu
        mode="inline"
        items={[{ key: "home", label: "Home", disabled: true }]}
        onSelect={onSelect}
      />,
    );
    fireEvent.click(screen.getByText("Home"));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("renders submenu with children", () => {
    render(
      <Menu
        mode="inline"
        defaultOpenKeys={["system"]}
        items={[
          {
            key: "system",
            label: "System",
            children: [
              { key: "users", label: "Users" },
              { key: "roles", label: "Roles" },
            ],
          },
        ]}
      />,
    );
    expect(screen.getByText("System")).toBeDefined();
    expect(screen.getByText("Users")).toBeDefined();
    expect(screen.getByText("Roles")).toBeDefined();
  });

  it("toggles submenu on click", () => {
    render(
      <Menu
        mode="inline"
        items={[
          {
            key: "system",
            label: "System",
            children: [{ key: "users", label: "Users" }],
          },
        ]}
      />,
    );
    // Submenu children not visible initially
    expect(screen.queryByText("Users")).toBeNull();

    // Click to expand
    fireEvent.click(screen.getByText("System"));
    expect(screen.getByText("Users")).toBeDefined();
  });

  it("calls onOpenChange when submenu is toggled", () => {
    const onOpenChange = vi.fn();
    render(
      <Menu
        mode="inline"
        onOpenChange={onOpenChange}
        items={[
          {
            key: "system",
            label: "System",
            children: [{ key: "users", label: "Users" }],
          },
        ]}
      />,
    );
    fireEvent.click(screen.getByText("System"));
    expect(onOpenChange).toHaveBeenCalledWith(["system"]);
  });

  it("renders item icon", () => {
    render(
      <Menu
        mode="inline"
        items={[
          {
            key: "home",
            label: "Home",
            icon: <span data-testid="icon">H</span>,
          },
        ]}
      />,
    );
    expect(screen.getByTestId("icon")).not.toBeNull();
  });

  it("renders group type item", () => {
    render(
      <Menu
        mode="inline"
        items={[
          { key: "grp1", label: "Group Title", type: "group" as const },
          { key: "home", label: "Home" },
        ]}
      />,
    );
    expect(screen.getByText("Group Title")).toBeDefined();
  });

  it("renders group type item with title", () => {
    render(
      <Menu
        mode="inline"
        items={[{ key: "grp1", type: "group" as const, title: "My Group" }]}
      />,
    );
    expect(screen.getByText("My Group")).toBeDefined();
  });

  it("renders danger item with destructive styling", () => {
    render(
      <Menu
        mode="inline"
        items={[{ key: "del", label: "Delete", danger: true }]}
      />,
    );
    const btn = screen.getByText("Delete").closest("button");
    expect(btn?.className).toContain("text-destructive");
  });

  // --- Children API tests ---
  it("renders menu with children API", () => {
    render(
      <Menu mode="inline">
        <MenuItem key="home">Home</MenuItem>
        <MenuItem key="about">About</MenuItem>
      </Menu>,
    );
    expect(screen.getByText("Home")).toBeDefined();
    expect(screen.getByText("About")).toBeDefined();
  });

  it("renders SubMenu with children API", () => {
    const { container } = render(
      <Menu mode="inline" defaultOpenKeys={["sys"]}>
        <MenuSubMenu key="sys" title="System">
          <MenuItem key="users">Users</MenuItem>
        </MenuSubMenu>
      </Menu>,
    );
    expect(screen.getByText("System")).toBeDefined();
    // SubMenu is rendered (content may be portal-based in jsdom)
    const subMenu = container.querySelector('[data-slot="menu-submenu"]');
    expect(subMenu).not.toBeNull();
  });

  it("renders Divider", () => {
    const result = render(
      <Menu mode="inline">
        <MenuItem key="home">Home</MenuItem>
        <MenuDivider />
        <MenuItem key="about">About</MenuItem>
      </Menu>,
    );
    expect(
      result.container.querySelector('[data-slot="menu-divider"]'),
    ).not.toBeNull();
  });

  it("renders ItemGroup", () => {
    const result = render(
      <Menu mode="inline">
        <MenuItemGroup title="Settings">
          <MenuItem key="profile">Profile</MenuItem>
        </MenuItemGroup>
      </Menu>,
    );
    expect(screen.getByText("Settings")).toBeDefined();
    expect(screen.getByText("Profile")).toBeDefined();
    expect(
      result.container.querySelector('[data-slot="menu-group"]'),
    ).not.toBeNull();
  });

  // --- Mode tests ---
  it("renders horizontal mode with menubar role", () => {
    const result = render(
      <Menu mode="horizontal" items={[{ key: "home", label: "Home" }]} />,
    );
    const nav = result.container.querySelector('[role="menubar"]');
    expect(nav).not.toBeNull();
  });

  it("renders vertical mode with menu role", () => {
    const result = render(
      <Menu mode="vertical" items={[{ key: "home", label: "Home" }]} />,
    );
    const menu = result.container.querySelector('[role="menu"]');
    expect(menu).not.toBeNull();
  });

  // --- Theme tests ---
  it("applies light theme classes", () => {
    const result = render(
      <Menu
        mode="inline"
        theme="light"
        items={[{ key: "home", label: "Home" }]}
      />,
    );
    const menu = result.container.querySelector('[data-slot="menu"]');
    expect(menu?.className).toContain("bg-card");
  });

  it("applies dark theme classes", () => {
    const result = render(
      <Menu
        mode="inline"
        theme="dark"
        items={[{ key: "home", label: "Home" }]}
      />,
    );
    const menu = result.container.querySelector('[data-slot="menu"]');
    expect(menu?.className).toContain("bg-slate-900");
  });

  // --- Size tests ---
  it("applies size classes", () => {
    render(
      <Menu mode="inline" size="sm" items={[{ key: "home", label: "Home" }]} />,
    );
    const btn = screen.getByText("Home").closest("button");
    expect(btn?.className).toContain("h-7");
  });

  // --- Multiple selection ---
  it("supports multiple selection", () => {
    const onSelect = vi.fn();
    render(
      <Menu
        mode="inline"
        multiple
        items={[
          { key: "home", label: "Home" },
          { key: "about", label: "About" },
        ]}
        onSelect={onSelect}
      />,
    );
    fireEvent.click(screen.getByText("Home"));
    expect(onSelect).toHaveBeenCalledWith({
      key: "home",
      selectedKeys: ["home"],
    });

    fireEvent.click(screen.getByText("About"));
    expect(onSelect).toHaveBeenCalledWith({
      key: "about",
      selectedKeys: ["home", "about"],
    });
  });

  // --- Collapsible ---
  it("renders collapsible toggle button in inline mode", () => {
    render(
      <Menu
        mode="inline"
        collapsible
        items={[{ key: "home", label: "Home" }]}
      />,
    );
    const toggleBtn = screen.getByTitle("收起菜单");
    expect(toggleBtn).toBeDefined();
  });

  it("calls onCollapse when collapsible toggle is clicked", () => {
    const onCollapse = vi.fn();
    render(
      <Menu
        mode="inline"
        collapsible
        onCollapse={onCollapse}
        items={[{ key: "home", label: "Home" }]}
      />,
    );
    fireEvent.click(screen.getByTitle("收起菜单"));
    expect(onCollapse).toHaveBeenCalledWith(true);
  });

  // --- Controlled selectedKeys ---
  it("respects controlled selectedKeys", () => {
    const result = render(
      <Menu
        mode="inline"
        selectedKeys={["home"]}
        items={[
          { key: "home", label: "Home" },
          { key: "about", label: "About" },
        ]}
      />,
    );
    const homeItem = screen.getByText("Home").closest("li");
    expect(homeItem).toHaveAttribute("data-selected", "true");

    result.rerender(
      <Menu
        mode="inline"
        selectedKeys={["about"]}
        items={[
          { key: "home", label: "Home" },
          { key: "about", label: "About" },
        ]}
      />,
    );
    const aboutItem = screen.getByText("About").closest("li");
    expect(aboutItem).toHaveAttribute("data-selected", "true");
  });

  // --- Controlled openKeys ---
  it("respects controlled openKeys", () => {
    const result = render(
      <Menu
        mode="inline"
        openKeys={["system"]}
        items={[
          {
            key: "system",
            label: "System",
            children: [{ key: "users", label: "Users" }],
          },
        ]}
      />,
    );
    expect(screen.getByText("Users")).toBeDefined();

    result.rerender(
      <Menu
        mode="inline"
        openKeys={[]}
        items={[
          {
            key: "system",
            label: "System",
            children: [{ key: "users", label: "Users" }],
          },
        ]}
      />,
    );
    expect(screen.queryByText("Users")).toBeNull();
  });

  // --- selectable=false ---
  it("does not select items when selectable is false", () => {
    const onSelect = vi.fn();
    render(
      <Menu
        mode="inline"
        selectable={false}
        items={[{ key: "home", label: "Home" }]}
        onSelect={onSelect}
      />,
    );
    fireEvent.click(screen.getByText("Home"));
    expect(onSelect).not.toHaveBeenCalled();
  });

  // --- MenuItem onClick ---
  it("calls item-level onClick handler", () => {
    const itemOnClick = vi.fn();
    render(
      <Menu
        mode="inline"
        items={[{ key: "home", label: "Home", onClick: itemOnClick }]}
      />,
    );
    fireEvent.click(screen.getByText("Home"));
    expect(itemOnClick).toHaveBeenCalledWith({
      key: "home",
      keyPath: ["home"],
    });
  });

  // --- Custom className ---
  it("applies custom className", () => {
    const result = render(
      <Menu
        mode="inline"
        className="my-menu"
        items={[{ key: "home", label: "Home" }]}
      />,
    );
    const menu = result.container.querySelector('[data-slot="menu"]');
    expect(menu?.className).toContain("my-menu");
  });

  // --- inlineCollapsed ---
  it("hides item labels when inlineCollapsed is true", () => {
    render(
      <Menu
        mode="inline"
        inlineCollapsed
        items={[{ key: "home", label: "Home" }]}
      />,
    );
    // The label span should not be rendered when collapsed
    const btn = screen.getByRole("menuitem");
    // The button should exist but the label text should not be in a span
    expect(btn.textContent).not.toContain("Home");
  });

  // --- Accordion behavior in vertical mode ---
  it("closes sibling submenus in vertical mode (accordion)", () => {
    render(
      <Menu
        mode="vertical"
        defaultOpenKeys={["a"]}
        items={[
          { key: "a", label: "Menu A", children: [{ key: "a1", label: "A1" }] },
          { key: "b", label: "Menu B", children: [{ key: "b1", label: "B1" }] },
        ]}
      />,
    );
    // A is open, B is closed
    expect(screen.getByText("A1")).toBeDefined();
    expect(screen.queryByText("B1")).toBeNull();

    // Click B to open it — should close A (accordion)
    fireEvent.click(screen.getByText("Menu B"));
    expect(screen.getByText("B1")).toBeDefined();
    expect(screen.queryByText("A1")).toBeNull();
  });
});
