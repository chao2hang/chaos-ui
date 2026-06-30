import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "./breadcrumb";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
}));

describe("breadcrumb", () => {
  it("exports Breadcrumb", () => {
    expect(Breadcrumb).toBeDefined();
  });
  it("exports BreadcrumbList", () => {
    expect(BreadcrumbList).toBeDefined();
  });
  it("exports BreadcrumbItem", () => {
    expect(BreadcrumbItem).toBeDefined();
  });
  it("exports BreadcrumbLink", () => {
    expect(BreadcrumbLink).toBeDefined();
  });
  it("exports BreadcrumbPage", () => {
    expect(BreadcrumbPage).toBeDefined();
  });
  it("exports BreadcrumbSeparator", () => {
    expect(BreadcrumbSeparator).toBeDefined();
  });
  it("exports BreadcrumbEllipsis", () => {
    expect(BreadcrumbEllipsis).toBeDefined();
  });

  it("renders nav with aria-label from i18n", () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>Home</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );
    const nav = container.querySelector('[data-slot="breadcrumb"]') as HTMLElement;
    expect(nav).not.toBeNull();
    expect(nav.tagName).toBe("NAV");
    expect(nav.getAttribute("aria-label")).toBe("breadcrumb.navLabel");
  });

  it("BreadcrumbList renders an ol", () => {
    const { container } = render(
      <BreadcrumbList>
        <BreadcrumbItem>x</BreadcrumbItem>
      </BreadcrumbList>,
    );
    const ol = container.querySelector('[data-slot="breadcrumb-list"]');
    expect(ol?.tagName).toBe("OL");
  });

  it("BreadcrumbItem renders an li with children", () => {
    const { getByText, container } = render(
      <BreadcrumbItem>Home</BreadcrumbItem>,
    );
    expect(getByText("Home")).toBeDefined();
    expect(container.querySelector('[data-slot="breadcrumb-item"]')?.tagName).toBe("LI");
  });

  it("BreadcrumbLink renders an anchor with href", () => {
    const { container } = render(<BreadcrumbLink href="/home">Home</BreadcrumbLink>);
    const a = container.querySelector("a");
    expect(a).not.toBeNull();
    expect(a?.getAttribute("href")).toBe("/home");
  });

  it("BreadcrumbPage renders a span with aria-current=page", () => {
    const { container, getByText } = render(<BreadcrumbPage>Current</BreadcrumbPage>);
    expect(getByText("Current")).toBeDefined();
    const span = container.querySelector('[data-slot="breadcrumb-page"]') as HTMLElement;
    expect(span.tagName).toBe("SPAN");
    expect(span.getAttribute("aria-current")).toBe("page");
    expect(span.getAttribute("aria-disabled")).toBe("true");
  });

  it("BreadcrumbSeparator renders default chevron icon", () => {
    const { container } = render(<BreadcrumbSeparator />);
    const sep = container.querySelector('[data-slot="breadcrumb-separator"]');
    expect(sep).not.toBeNull();
    expect(sep?.getAttribute("aria-hidden")).toBe("true");
  });

  it("BreadcrumbSeparator renders custom children when provided", () => {
    const { getByText } = render(
      <BreadcrumbSeparator>/</BreadcrumbSeparator>,
    );
    expect(getByText("/")).toBeDefined();
  });

  it("BreadcrumbEllipsis renders an ellipsis icon with sr-only label", () => {
    const { container, getByText } = render(<BreadcrumbEllipsis />);
    expect(container.querySelector('[data-slot="breadcrumb-ellipsis"]')).not.toBeNull();
    expect(getByText("breadcrumb.more")).toBeDefined();
  });

  it("composes a full breadcrumb trail", () => {
    const { container, getByText } = render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Settings</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );
    expect(getByText("Home")).toBeDefined();
    expect(getByText("Settings")).toBeDefined();
    expect(container.querySelectorAll("a")).toHaveLength(1);
  });
});
