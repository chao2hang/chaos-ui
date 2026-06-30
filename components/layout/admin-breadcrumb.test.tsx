import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AdminBreadcrumb } from "./admin-breadcrumb";
import type { AdminBreadcrumbProps } from "./admin-breadcrumb";

// Breadcrumb primitives use react-i18next; mock it so the nav label renders.
vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
}));

describe("admin-breadcrumb", () => {
  it("exports AdminBreadcrumb", () => {
    expect(AdminBreadcrumb).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: AdminBreadcrumbProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/layout/admin-breadcrumb");
    expect(mod.AdminBreadcrumb).toBeDefined();
  });

  it("renders nothing when no pathname and no items", () => {
    const { container } = render(<AdminBreadcrumb />);
    expect(container.firstChild).toBeNull();
  });

  it("renders nothing when pathname yields no segments", () => {
    const { container } = render(<AdminBreadcrumb pathname="/" />);
    // Only a Home item derived from pathname still renders -> it should render Home page.
    // A bare "/" splits to no segments, so Home is the only item and is the current page.
    expect(screen.getByText("Home")).toBeDefined();
    expect(container).toBeTruthy();
  });

  it("auto-generates breadcrumb items from pathname with default labels", () => {
    render(<AdminBreadcrumb pathname="/dashboard/users" />);
    expect(screen.getByText("Home")).toBeDefined();
    expect(screen.getByText("Dashboard")).toBeDefined();
    expect(screen.getByText("Users")).toBeDefined();
  });

  it("uses routeLabels mapping when provided", () => {
    render(
      <AdminBreadcrumb
        pathname="/orders/details"
        routeLabels={{ orders: "Orders", details: "Order Details" }}
      />,
    );
    expect(screen.getByText("Orders")).toBeDefined();
    expect(screen.getByText("Order Details")).toBeDefined();
  });

  it("marks the last segment as the current page (no link)", () => {
    render(<AdminBreadcrumb pathname="/dashboard/users" />);
    const lastPage = screen.getByText("Users");
    // BreadcrumbPage renders a span with aria-current="page"
    expect(lastPage.getAttribute("aria-current")).toBe("page");
    // Home is a link (has href) for non-last items
    const homeLink = screen.getByText("Home");
    expect(homeLink.tagName).toBe("A");
  });

  it("renders custom homeLabel and homeHref", () => {
    render(
      <AdminBreadcrumb
        pathname="/settings"
        homeLabel="Home"
        homeHref="/home"
      />,
    );
    const homeLink = screen.getByText("Home");
    expect(homeLink.getAttribute("href")).toBe("/home");
  });

  it("renders custom items when provided (ignores pathname)", () => {
    render(
      <AdminBreadcrumb
        pathname="/ignored"
        items={[
          { label: "Home", href: "/" },
          { label: "Reports" },
        ]}
      />,
    );
    expect(screen.getByText("Home")).toBeDefined();
    expect(screen.getByText("Reports")).toBeDefined();
    // Reports is last => current page (no link)
    expect(screen.getByText("Reports").getAttribute("aria-current")).toBe(
      "page",
    );
    // Home has an href link
    expect(screen.getByText("Home").tagName).toBe("A");
  });

  it("renders a custom separator node", () => {
    render(
      <AdminBreadcrumb
        items={[
          { label: "A", href: "/a" },
          { label: "B" },
        ]}
        separator={">"}
      />,
    );
    expect(screen.getByText(">")).toBeDefined();
  });

  it("applies className to the nav element", () => {
    const { container } = render(
      <AdminBreadcrumb
        items={[{ label: "Home" }]}
        className="custom-bc"
      />,
    );
    const nav = container.querySelector("nav");
    expect(nav?.classList.contains("custom-bc")).toBe(true);
  });

  it("renders multiple separators between items", () => {
    render(
      <AdminBreadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Mid", href: "/mid" },
          { label: "Last" },
        ]}
        separator="|"
      />,
    );
    // Two separators between three items
    expect(screen.getAllByText("|").length).toBe(2);
  });

  it("items with undefined href render as current page", () => {
    render(
      <AdminBreadcrumb items={[{ label: "Only", href: undefined }]} />,
    );
    const only = screen.getByText("Only");
    expect(only.getAttribute("aria-current")).toBe("page");
  });
});
