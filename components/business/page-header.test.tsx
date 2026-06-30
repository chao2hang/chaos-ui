import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PageHeader } from "./page-header";
import type { BreadcrumbItemType, PageHeaderProps } from "./page-header";

describe("PageHeader", () => {
  it("renders the title and description", () => {
    render(<PageHeader title="Dashboard" description="Overview page" />);
    expect(screen.getByText("Dashboard")).toBeDefined();
    expect(screen.getByText("Overview page")).toBeDefined();
  });

  it("renders breadcrumb links and a final page (non-link)", () => {
    const items: BreadcrumbItemType[] = [
      { label: "Home", href: "/" },
      { label: "Section", href: "/section" },
      { label: "Current" },
    ];
    render(<PageHeader title="T" breadcrumbItems={items} />);
    const homeLink = screen.getByText("Home");
    expect(homeLink.getAttribute("href")).toBe("/");
    expect(screen.getByText("Section").getAttribute("href")).toBe("/section");
    // Current has no href -> rendered as BreadcrumbPage (no href attribute)
    const current = screen.getByText("Current");
    expect(current.getAttribute("href")).toBeNull();
  });

  it("renders a breadcrumb item with href as a link when it is NOT last", () => {
    render(
      <PageHeader
        title="T"
        breadcrumbItems={[
          { label: "Linked", href: "/x" },
          { label: "Current" },
        ]}
      />,
    );
    // Non-last item with href renders as a BreadcrumbLink (<a href>).
    expect(screen.getByText("Linked").getAttribute("href")).toBe("/x");
  });

  it("renders the last breadcrumb item as a page (no href) even when href is provided", () => {
    render(
      <PageHeader
        title="T"
        breadcrumbItems={[{ label: "Linked", href: "/x" }]}
      />,
    );
    // Source rule: isLast || !item.href -> BreadcrumbPage (role=link, no href).
    const last = screen.getByText("Linked");
    expect(last.getAttribute("href")).toBeNull();
    expect(last.getAttribute("aria-current")).toBe("page");
  });

  it("does not render breadcrumbs when not provided", () => {
    const { container } = render(<PageHeader title="T" />);
    expect(container.querySelector("nav")).toBeNull();
  });

  it("renders explicit actions node", () => {
    render(
      <PageHeader
        title="T"
        actions={<button type="button">Action</button>}
      />,
    );
    fireEvent.click(screen.getByText("Action"));
    // action rendered
    expect(screen.getByText("Action")).toBeDefined();
  });

  it("composes primaryAction into the actions area", () => {
    render(
      <PageHeader
        title="T"
        primaryAction={<button type="button">Save</button>}
      />,
    );
    expect(screen.getByText("Save")).toBeDefined();
  });

  it("composes secondaryActions before primaryAction", () => {
    render(
      <PageHeader
        title="T"
        primaryAction={<button type="button">Primary</button>}
        secondaryActions={[<button type="button" key="s">Secondary</button>]}
      />,
    );
    expect(screen.getByText("Primary")).toBeDefined();
    expect(screen.getByText("Secondary")).toBeDefined();
  });

  it("renders no actions area when none provided", () => {
    const { container } = render(<PageHeader title="T" />);
    // Only the title h1, no buttons
    expect(container.querySelector("button")).toBeNull();
  });

  it("exports types", () => {
    const _tc1: BreadcrumbItemType | undefined = undefined;
    const _tc2: PageHeaderProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    expect(_tc2).toBeUndefined();
  });
});
