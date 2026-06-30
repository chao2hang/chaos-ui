import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  PageContainer,
  PageHeader,
  PageContent,
  pageContainerVariants,
} from "./page-container";
import type {
  PageContainerProps,
  PageHeaderProps,
  PageContentProps,
} from "./page-container";

describe("PageContainer", () => {
  it("exports PageContainer", () => {
    expect(PageContainer).toBeDefined();
  });

  it("renders children", () => {
    render(<PageContainer>body</PageContainer>);
    expect(screen.getByText("body")).toBeDefined();
  });

  it("renders with data-slot and default center class", () => {
    const { container } = render(<PageContainer>x</PageContainer>);
    const el = container.querySelector(
      '[data-slot="page-container"]',
    ) as HTMLElement;
    expect(el).not.toBeNull();
    expect(el.className).toContain("mx-auto");
    expect(el.className).toContain("max-w-5xl");
  });

  it("applies size variants", () => {
    const { container } = render(
      <PageContainer size="lg">x</PageContainer>,
    );
    const el = container.querySelector(
      '[data-slot="page-container"]',
    ) as HTMLElement;
    expect(el.className).toContain("max-w-7xl");
  });

  it("applies full size and none padding", () => {
    const { container } = render(
      <PageContainer size="full" padding="none">
        x
      </PageContainer>,
    );
    const el = container.querySelector(
      '[data-slot="page-container"]',
    ) as HTMLElement;
    expect(el.className).toContain("max-w-full");
    expect(el.className).toContain("p-0");
  });

  it("center=false removes mx-auto", () => {
    const { container } = render(
      <PageContainer center={false}>
        x
      </PageContainer>,
    );
    const el = container.querySelector(
      '[data-slot="page-container"]',
    ) as HTMLElement;
    expect(el.className).not.toContain("mx-auto");
  });

  it("merges custom className", () => {
    const { container } = render(
      <PageContainer className="extra-class">x</PageContainer>,
    );
    const el = container.querySelector(
      '[data-slot="page-container"]',
    ) as HTMLElement;
    expect(el.className).toContain("extra-class");
  });

  it("pageContainerVariants is callable", () => {
    expect(pageContainerVariants({ size: "sm" }).includes("max-w-2xl")).toBe(
      true,
    );
  });
});

describe("PageHeader", () => {
  it("renders title and description", () => {
    render(
      <PageHeader title="Settings" description="Manage your account" />,
    );
    expect(screen.getByText("Settings")).toBeDefined();
    expect(screen.getByText("Manage your account")).toBeDefined();
  });

  it("omits description when not provided", () => {
    const { container } = render(<PageHeader title="Only Title" />);
    expect(screen.getByText("Only Title")).toBeDefined();
    expect(container.querySelector("p")).toBeNull();
  });

  it("renders actions and breadcrumb", () => {
    render(
      <PageHeader
        title="T"
        breadcrumb={<nav>Home</nav>}
        actions={<button type="button">Save</button>}
      />,
    );
    expect(screen.getByText("Home")).toBeDefined();
    expect(screen.getByText("Save")).toBeDefined();
  });
});

describe("PageContent", () => {
  it("renders children", () => {
    render(<PageContent>content body</PageContent>);
    expect(screen.getByText("content body")).toBeDefined();
  });

  it("has data-slot", () => {
    const { container } = render(<PageContent>x</PageContent>);
    expect(
      container.querySelector('[data-slot="page-content"]'),
    ).not.toBeNull();
  });
});

describe("page-container types", () => {
  it("exports types", () => {
    const _tc1: PageContainerProps | undefined = undefined;
    const _tc2: PageHeaderProps | undefined = undefined;
    const _tc3: PageContentProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    expect(_tc2).toBeUndefined();
    expect(_tc3).toBeUndefined();
  });
});
