import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AdminHeader } from "./admin-header";
import type { AdminHeaderProps, AdminBreadcrumbItem } from "./admin-header";

// Breadcrumb primitives use react-i18next.
vi.mock("react-i18next", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as Record<string, unknown>),
    useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
  };
});

describe("admin-header", () => {
  it("exports AdminHeader", () => {
    expect(AdminHeader).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: AdminHeaderProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: AdminBreadcrumbItem | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/layout/admin-header");
    expect(mod.AdminHeader).toBeDefined();
  });

  it("renders header with data-slot", () => {
    const { container } = render(<AdminHeader />);
    expect(
      container.querySelector('[data-slot="admin-header"]'),
    ).not.toBeNull();
  });

  it("renders logo content", () => {
    render(<AdminHeader logo={<span>MyLogo</span>} />);
    expect(screen.getByText("MyLogo")).toBeDefined();
  });

  it("renders breadcrumb items with last item as page", () => {
    render(
      <AdminHeader
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Dashboard" }]}
      />,
    );
    expect(screen.getByText("Home")).toBeDefined();
    expect(screen.getByText("Dashboard")).toBeDefined();
    // First item with href and not last => link
    expect(screen.getByText("Home").tagName).toBe("A");
    // Last item => current page
    expect(screen.getByText("Dashboard").getAttribute("aria-current")).toBe(
      "page",
    );
  });

  it("renders breadcrumb where a middle item without href renders as page", () => {
    render(
      <AdminHeader
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Mid" },
          { label: "Last" },
        ]}
      />,
    );
    // Middle item has no href => page (no anchor)
    expect(screen.getByText("Mid").tagName).toBe("SPAN");
    expect(screen.getByText("Mid").getAttribute("aria-current")).toBe("page");
  });

  it("renders the mobile menu toggle button when onMenuClick provided", () => {
    const onMenuClick = vi.fn();
    render(<AdminHeader onMenuClick={onMenuClick} />);
    const btn = screen.getByLabelText("Toggle menu");
    fireEvent.click(btn);
    expect(onMenuClick).toHaveBeenCalledTimes(1);
  });

  it("does not render menu toggle when onMenuClick omitted", () => {
    render(<AdminHeader />);
    expect(screen.queryByLabelText("Toggle menu")).toBeNull();
  });

  it("renders search input with placeholder and fires onSearch on Enter", () => {
    const onSearch = vi.fn();
    render(
      <AdminHeader
        showSearch
        searchPlaceholder="Find..."
        onSearch={onSearch}
      />,
    );
    const input = screen.getByPlaceholderText("Find...");
    fireEvent.change(input, { target: { value: "query" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onSearch).toHaveBeenCalledWith("query");
  });

  it("does not fire onSearch on non-Enter key", () => {
    const onSearch = vi.fn();
    render(<AdminHeader onSearch={onSearch} />);
    const input = screen.getByPlaceholderText("Search...");
    fireEvent.change(input, { target: { value: "q" } });
    fireEvent.keyDown(input, { key: "Escape" });
    expect(onSearch).not.toHaveBeenCalled();
  });

  it("hides search when showSearch is false", () => {
    render(<AdminHeader showSearch={false} />);
    expect(screen.queryByPlaceholderText("Search...")).toBeNull();
  });

  it("renders right-side actions", () => {
    render(<AdminHeader actions={<button type="button">Settings</button>} />);
    expect(screen.getByText("Settings")).toBeDefined();
  });

  it("renders userMenu content", () => {
    render(<AdminHeader userMenu={<div>John Doe</div>} />);
    expect(screen.getByText("John Doe")).toBeDefined();
  });

  it("renders notification button and fires onNotificationClick", () => {
    const onNotificationClick = vi.fn();
    render(<AdminHeader onNotificationClick={onNotificationClick} />);
    const btn = screen.getByLabelText("Notifications");
    fireEvent.click(btn);
    expect(onNotificationClick).toHaveBeenCalledTimes(1);
  });

  it("renders notification count badge for values <= 99", () => {
    render(
      <AdminHeader onNotificationClick={() => {}} notificationCount={5} />,
    );
    expect(screen.getByText("5")).toBeDefined();
  });

  it("renders 99+ badge when notificationCount > 99", () => {
    render(
      <AdminHeader onNotificationClick={() => {}} notificationCount={120} />,
    );
    expect(screen.getByText("99+")).toBeDefined();
  });

  it("does not render badge when notificationCount is 0", () => {
    render(
      <AdminHeader onNotificationClick={() => {}} notificationCount={0} />,
    );
    expect(screen.queryByText("99+")).toBeNull();
  });

  it("does not render notification button when onNotificationClick omitted", () => {
    render(<AdminHeader />);
    expect(screen.queryByLabelText("Notifications")).toBeNull();
  });

  it("applies className to header", () => {
    const { container } = render(<AdminHeader className="my-header" />);
    const header = container.querySelector('[data-slot="admin-header"]');
    expect(header?.classList.contains("my-header")).toBe(true);
  });

  it("renders with empty breadcrumb array (no breadcrumb section)", () => {
    const { container } = render(<AdminHeader breadcrumb={[]} />);
    // No breadcrumb nav rendered when empty
    expect(container.querySelector("nav")).toBeNull();
  });
});
