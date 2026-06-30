import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { DashboardLayout } from "./dashboard-layout";

// Breadcrumb primitives use react-i18next; mock so it renders without a provider.
vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
}));

describe("dashboard-layout", () => {
  it("exports DashboardLayout", () => {
    expect(DashboardLayout).toBeDefined();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/layout/dashboard-layout");
    expect(mod.DashboardLayout).toBeDefined();
  });

  it("renders children in the main content area", () => {
    render(
      <DashboardLayout>
        <div>Main Content</div>
      </DashboardLayout>,
    );
    expect(screen.getByText("Main Content")).toBeDefined();
  });

  it("renders the brand name (Acme) in the sidebar header", () => {
    render(
      <DashboardLayout>
        <div>content</div>
      </DashboardLayout>,
    );
    expect(screen.getByText("Acme")).toBeDefined();
  });

  it("renders all navigation menu items", () => {
    render(
      <DashboardLayout>
        <div>content</div>
      </DashboardLayout>,
    );
    expect(screen.getByText("Dashboard")).toBeDefined();
    expect(screen.getByText("Orders")).toBeDefined();
    expect(screen.getByText("Products")).toBeDefined();
    expect(screen.getByText("Suppliers")).toBeDefined();
    expect(screen.getByText("Settings")).toBeDefined();
  });

  it("renders the footer user info (name and email)", () => {
    render(
      <DashboardLayout>
        <div>content</div>
      </DashboardLayout>,
    );
    expect(screen.getByText("John Doe")).toBeDefined();
    expect(screen.getByText("john@acme.com")).toBeDefined();
  });

  it("renders avatar fallback initials", () => {
    render(
      <DashboardLayout>
        <div>content</div>
      </DashboardLayout>,
    );
    expect(screen.getByText("JD")).toBeDefined();
  });

  it("renders breadcrumb with title when title prop is provided", () => {
    render(
      <DashboardLayout title="Sales Overview">
        <div>content</div>
      </DashboardLayout>,
    );
    expect(screen.getByText("Sales Overview")).toBeDefined();
    expect(screen.getByText("Home")).toBeDefined();
  });

  it("does not render breadcrumb when title is omitted", () => {
    render(
      <DashboardLayout>
        <div>content</div>
      </DashboardLayout>,
    );
    // "Home" only appears in breadcrumb when a title is given
    expect(screen.queryByText("Home")).toBeNull();
  });

  it("renders the sidebar wrapper element", () => {
    const { container } = render(
      <DashboardLayout>
        <div>content</div>
      </DashboardLayout>,
    );
    expect(
      container.querySelector('[data-slot="sidebar-wrapper"]'),
    ).not.toBeNull();
  });
});
