import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PageChrome } from "./page-chrome";
import type { PageChromeProps, PageChromeVariant } from "./page-chrome";

describe("PageChrome", () => {
  it("exports component and types", () => {
    expect(PageChrome).toBeDefined();
    const _v: PageChromeVariant = "list";
    const _p: PageChromeProps | undefined = undefined;
    expect(_v).toBe("list");
    expect(_p).toBeUndefined();
  });

  it("list without actions: no h1, no description", () => {
    const { container } = render(
      <PageChrome variant="list" title="Employees" description="ignored">
        <div>table</div>
      </PageChrome>,
    );
    expect(container.querySelector("h1")).toBeNull();
    expect(screen.queryByText("Employees")).toBeNull();
    expect(screen.queryByText("ignored")).toBeNull();
    expect(screen.getByText("table")).toBeDefined();
    const root = container.querySelector('[data-slot="page-chrome"]');
    expect(root?.getAttribute("data-variant")).toBe("list");
  });

  it("list with actions: compact action row, no title", () => {
    const { container } = render(
      <PageChrome
        variant="list"
        title="Employees"
        actions={<button type="button">新增</button>}
      >
        <div>body</div>
      </PageChrome>,
    );
    expect(container.querySelector("h1")).toBeNull();
    expect(screen.getByText("新增")).toBeDefined();
    expect(
      container.querySelector('[data-slot="page-chrome-actions"]'),
    ).not.toBeNull();
  });

  it("document uses sm header and compact content", () => {
    const { container } = render(
      <PageChrome
        variant="document"
        title="Order detail"
        description="Edit bill"
        actions={<button type="button">Save</button>}
      >
        <div>form</div>
      </PageChrome>,
    );
    const h1 = container.querySelector("h1");
    expect(h1?.textContent).toBe("Order detail");
    expect(h1?.className).toMatch(/text-lg/);
    expect(screen.getByText("Edit bill")).toBeDefined();
    const content = container.querySelector('[data-slot="page-content"]');
    expect(content?.getAttribute("data-density")).toBe("compact");
    expect(content?.className).toMatch(/space-y-3/);
  });

  it("overview uses default header size and density", () => {
    const { container } = render(
      <PageChrome variant="overview" title="Dashboard" description="KPIs">
        <div>cards</div>
      </PageChrome>,
    );
    const h1 = container.querySelector("h1");
    expect(h1?.className).toMatch(/text-2xl/);
    const content = container.querySelector('[data-slot="page-content"]');
    expect(content?.getAttribute("data-density")).toBe("default");
    expect(content?.className).toMatch(/space-y-6/);
  });
});
