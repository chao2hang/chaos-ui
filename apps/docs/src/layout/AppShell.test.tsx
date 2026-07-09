import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { AppShell } from "@chaos_team/chaos-ui/layout";

describe("AppShell", () => {
  it("renders children and applies the app-shell slot with default variant", () => {
    const { container } = render(
      <AppShell>
        <p>body</p>
      </AppShell>,
    );
    const shell = container.querySelector(
      '[data-slot="app-shell"]',
    ) as HTMLElement;
    expect(shell).toBeTruthy();
    expect(shell.getAttribute("data-variant")).toBe("default");
    expect(shell.className).toContain("min-h-screen");
    expect(screen.getByText("body")).toBeInTheDocument();
  });

  it("forwards custom className", () => {
    const { container } = render(
      <AppShell className="my-shell">
        <span>x</span>
      </AppShell>,
    );
    const shell = container.querySelector(
      '[data-slot="app-shell"]',
    ) as HTMLElement;
    expect(shell.className).toContain("my-shell");
  });

  it("renders the header, sidebar, aside and footer slots when provided", () => {
    render(
      <AppShell
        header={<span>HEADER</span>}
        sidebar={<span>SIDEBAR</span>}
        aside={<span>ASIDE</span>}
        footer={<span>FOOTER</span>}
      >
        <span>main</span>
      </AppShell>,
    );
    expect(screen.getByText("HEADER")).toBeInTheDocument();
    expect(screen.getByText("SIDEBAR")).toBeInTheDocument();
    expect(screen.getByText("ASIDE")).toBeInTheDocument();
    expect(screen.getByText("FOOTER")).toBeInTheDocument();
    expect(screen.getByText("main")).toBeInTheDocument();
  });

  it("applies the floating variant attribute", () => {
    const { container } = render(
      <AppShell variant="floating">
        <span>x</span>
      </AppShell>,
    );
    const shell = container.querySelector(
      '[data-slot="app-shell"]',
    ) as HTMLElement;
    expect(shell.getAttribute("data-variant")).toBe("floating");
  });

  it("toggles the sidebar collapsed state when the desktop toggle is clicked", () => {
    render(
      <AppShell sidebar={<span>navigation</span>} sidebarCollapsible>
        <span>body</span>
      </AppShell>,
    );

    const shell = screen
      .getByText("body")
      .closest('[data-slot="app-shell"]') as HTMLElement;
    expect(shell.getAttribute("data-sidebar-collapsed")).toBe("false");

    const collapse = screen.getByRole("button", { name: "折叠侧栏" });
    fireEvent.click(collapse);

    expect(shell.getAttribute("data-sidebar-collapsed")).toBe("true");
    expect(
      screen.getByRole("button", { name: "展开侧栏" }),
    ).toBeInTheDocument();
  });

  it("opens and closes the mobile sidebar when the mobile toggle is clicked", () => {
    render(
      <AppShell sidebar={<span>navigation</span>} sidebarCollapsible>
        <span>body</span>
      </AppShell>,
    );

    const toggle = screen.getByRole("button", { name: "切换侧栏" });
    fireEvent.click(toggle);

    const sidebar = screen
      .getByText("navigation")
      .closest("aside") as HTMLElement;
    expect(sidebar.className).toContain("translate-x-0");

    fireEvent.click(toggle);
    const sidebarAfter = screen
      .getByText("navigation")
      .closest("aside") as HTMLElement;
    expect(sidebarAfter.className).toContain("-translate-x-full");
  });

  it("does not render the mobile toggle when sidebar is not collapsible", () => {
    render(
      <AppShell sidebar={<span>navigation</span>} sidebarCollapsible={false}>
        <span>body</span>
      </AppShell>,
    );
    expect(screen.queryByRole("button", { name: "切换侧栏" })).toBeNull();
  });

  it("starts collapsed when defaultCollapsed is true", () => {
    render(
      <AppShell sidebar={<span>navigation</span>} defaultCollapsed>
        <span>body</span>
      </AppShell>,
    );
    const shell = screen
      .getByText("body")
      .closest('[data-slot="app-shell"]') as HTMLElement;
    expect(shell.getAttribute("data-sidebar-collapsed")).toBe("true");
    expect(
      within(shell).getByRole("button", { name: "展开侧栏" }),
    ).toBeInTheDocument();
  });
});
