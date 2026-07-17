import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AdminShell } from "./admin-shell";

// Mock react-i18next since AppShell uses useTranslation.
import { vi } from "vitest";
vi.mock("react-i18next", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as Record<string, unknown>),
    useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
  };
});

describe("AdminShell", () => {
  it("exports AdminShell", () => {
    expect(AdminShell).toBeDefined();
  });

  it("renders with children", () => {
    const { container } = render(
      <AdminShell>
        <p>Dashboard Content</p>
      </AdminShell>,
    );
    expect(screen.getByText("Dashboard Content")).toBeDefined();
    expect(container.querySelector('[data-slot="admin-shell"]')).not.toBeNull();
  });

  it("renders logo in sider when provided", () => {
    render(
      <AdminShell logo={<span data-testid="logo">MyApp</span>}>
        <p>Content</p>
      </AdminShell>,
    );
    const logos = screen.getAllByTestId("logo");
    expect(logos.length).toBeGreaterThanOrEqual(1);
  });

  it("renders menu items when provided", () => {
    render(
      <AdminShell
        menuItems={[{ key: "home", label: "Home" }]}
        defaultCollapsed={false}
      >
        <p>Content</p>
      </AdminShell>,
    );
    expect(screen.getByText("Home")).toBeDefined();
  });

  it("renders tabs when provided", () => {
    render(
      <AdminShell tabs={[{ key: "tab1", label: "Tab 1" }]} activeTabKey="tab1">
        <p>Content</p>
      </AdminShell>,
    );
    expect(screen.getByText("Tab 1")).toBeDefined();
  });

  it("renders without user menu when user is not provided", () => {
    const { container } = render(
      <AdminShell>
        <p>Content</p>
      </AdminShell>,
    );
    // No user menu should be present; header should not have the UserMenu trigger.
    expect(container.querySelector('[aria-label*="Open menu"]')).toBeNull();
  });

  it("renders with user prop without crashing", () => {
    const { container } = render(
      <AdminShell user={{ name: "Admin", email: "admin@test.com" }}>
        <p>Content</p>
      </AdminShell>,
    );
    // Just verify the shell renders without crashing.
    expect(container.querySelector('[data-slot="admin-shell"]')).not.toBeNull();
  });

  it("renders search input when showSearch is true", () => {
    render(
      <AdminShell showSearch searchPlaceholder="Find...">
        <p>Content</p>
      </AdminShell>,
    );
    expect(screen.getByPlaceholderText("Find...")).toBeDefined();
  });

  it("renders breadcrumb when provided", () => {
    render(
      <AdminShell
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Dashboard" }]}
      >
        <p>Content</p>
      </AdminShell>,
    );
    expect(screen.getByText("Home")).toBeDefined();
    expect(screen.getByText("Dashboard")).toBeDefined();
  });

  it("module is importable", async () => {
    const mod = await import("./admin-shell");
    expect(mod.AdminShell).toBeDefined();
  });

  it("shows mobile aside toggle when aside is provided", () => {
    render(
      <AdminShell aside={<div>Aside panel</div>} asideToggleLabel="详情">
        <p>Content</p>
      </AdminShell>,
    );
    expect(screen.getByText("详情")).toBeDefined();
    expect(screen.getByText("Aside panel")).toBeDefined();
  });

  it("exports shell height constant", async () => {
    const mod = await import("./admin-shell");
    expect(mod.ADMIN_SHELL_HEADER_HEIGHT_CLASS).toBe("h-16");
  });

  it("defaults collapse control to header, not sider edge (issue #17)", () => {
    const { container } = render(
      <AdminShell
        menuItems={[{ key: "home", label: "Home" }]}
        breadcrumb={[{ label: "Dashboard" }]}
      >
        <p>Content</p>
      </AdminShell>,
    );
    expect(
      container.querySelector('[data-slot="admin-header-collapse"]'),
    ).not.toBeNull();
    expect(
      container.querySelector('[data-slot="admin-sider-collapse"]'),
    ).toBeNull();
  });

  it("puts collapse on sider edge when collapseTrigger is sider-edge", () => {
    const { container } = render(
      <AdminShell
        collapseTrigger="sider-edge"
        menuItems={[{ key: "home", label: "Home" }]}
      >
        <p>Content</p>
      </AdminShell>,
    );
    expect(
      container.querySelector('[data-slot="admin-sider-collapse"]'),
    ).not.toBeNull();
    expect(
      container.querySelector('[data-slot="admin-header-collapse"]'),
    ).toBeNull();
  });

  it("toggles collapsed via header control", () => {
    render(
      <AdminShell menuItems={[{ key: "home", label: "Home" }]}>
        <p>Content</p>
      </AdminShell>,
    );
    const btn = screen.getByLabelText("Collapse");
    fireEvent.click(btn);
    expect(screen.getByLabelText("Expand")).toBeDefined();
  });

  it("applies default content padding and exposes content slot (CUI-LAYOUT-03)", () => {
    const { container } = render(
      <AdminShell>
        <p>Page</p>
      </AdminShell>,
    );
    const main = container.querySelector(
      '[data-slot="admin-shell-content"]',
    ) as HTMLElement;
    expect(main).not.toBeNull();
    expect(main.tagName).toBe("MAIN");
    expect(main.className.split(/\s+/)).toContain("p-4");
  });

  it("disables content padding when contentPadding is false", () => {
    const { container } = render(
      <AdminShell contentPadding={false}>
        <p>Page</p>
      </AdminShell>,
    );
    const main = container.querySelector(
      '[data-slot="admin-shell-content"]',
    ) as HTMLElement;
    expect(main.className.split(/\s+/)).not.toContain("p-4");
  });

  it("accepts custom contentPadding class string", () => {
    const { container } = render(
      <AdminShell contentPadding="p-4 lg:p-6" contentClassName="bg-muted">
        <p>Page</p>
      </AdminShell>,
    );
    const main = container.querySelector(
      '[data-slot="admin-shell-content"]',
    ) as HTMLElement;
    expect(main.className).toContain("p-4");
    expect(main.className).toContain("lg:p-6");
    expect(main.className).toContain("bg-muted");
  });

  it("tightens top padding when tabs are present (issue #57)", () => {
    const { container } = render(
      <AdminShell
        tabs={[{ key: "t1", label: "Dict" }]}
        activeTabKey="t1"
        contentPadding={true}
      >
        <p>Page</p>
      </AdminShell>,
    );
    const main = container.querySelector(
      '[data-slot="admin-shell-content"]',
    ) as HTMLElement;
    expect(main.className).toMatch(/pt-2/);
    expect(main.className).toMatch(/px-4/);
    expect(main.className).toMatch(/pb-4/);
    expect(main.className.split(/\s+/)).not.toContain("p-4");
  });

  it("accepts directional contentPadding object (issue #57)", () => {
    const { container } = render(
      <AdminShell
        tabs={[{ key: "t1", label: "Dict" }]}
        contentPadding={{
          inline: "px-4 lg:px-6",
          top: "pt-1",
          bottom: "pb-6",
        }}
      >
        <p>Page</p>
      </AdminShell>,
    );
    const main = container.querySelector(
      '[data-slot="admin-shell-content"]',
    ) as HTMLElement;
    expect(main.className).toContain("px-4");
    expect(main.className).toContain("lg:px-6");
    expect(main.className).toContain("pt-1");
    expect(main.className).toContain("pb-6");
  });

  it("resolveContentPaddingClass helper matches shell defaults", async () => {
    const { resolveContentPaddingClass } = await import("./admin-shell");
    expect(resolveContentPaddingClass(true, false)).toBe("p-4");
    expect(resolveContentPaddingClass(true, true)).toBe("px-4 pt-2 pb-4");
    expect(resolveContentPaddingClass(false, true)).toBeUndefined();
    expect(resolveContentPaddingClass({ top: "pt-0" }, true)).toContain("pt-0");
  });
});
