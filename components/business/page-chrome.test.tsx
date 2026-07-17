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
    expect(root?.getAttribute("data-mode")).toBe("list");
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

  it("form: no h1, ignores title/actions, compact content (#55)", () => {
    const { container } = render(
      <PageChrome
        variant="form"
        title="代客下单"
        description="ignored"
        actions={<button type="button">提交</button>}
      >
        <div>form-body</div>
      </PageChrome>,
    );
    expect(container.querySelector("h1")).toBeNull();
    expect(screen.queryByText("代客下单")).toBeNull();
    expect(screen.queryByText("提交")).toBeNull();
    expect(
      container.querySelector('[data-slot="page-chrome-actions"]'),
    ).toBeNull();
    const content = container.querySelector('[data-slot="page-content"]');
    expect(content?.getAttribute("data-density")).toBe("compact");
    expect(
      container
        .querySelector('[data-slot="page-chrome"]')
        ?.getAttribute("data-mode"),
    ).toBe("form");
  });

  it("document aliases form: no h1, compact (#55 deprecated)", () => {
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
    expect(container.querySelector("h1")).toBeNull();
    expect(screen.queryByText("Order detail")).toBeNull();
    expect(screen.queryByText("Edit bill")).toBeNull();
    expect(screen.queryByText("Save")).toBeNull();
    const content = container.querySelector('[data-slot="page-content"]');
    expect(content?.getAttribute("data-density")).toBe("compact");
    const root = container.querySelector('[data-slot="page-chrome"]');
    expect(root?.getAttribute("data-variant")).toBe("document");
    expect(root?.getAttribute("data-mode")).toBe("form");
  });

  it("detail: no h1; identity slot only (#55)", () => {
    const { container } = render(
      <PageChrome
        variant="detail"
        title="Should ignore"
        actions={<button type="button">ignored-action</button>}
        identity={
          <>
            <span>SO-001</span>
            <span>已审</span>
          </>
        }
      >
        <div>detail-body</div>
      </PageChrome>,
    );
    expect(container.querySelector("h1")).toBeNull();
    expect(screen.queryByText("Should ignore")).toBeNull();
    expect(screen.queryByText("ignored-action")).toBeNull();
    expect(screen.getByText("SO-001")).toBeDefined();
    expect(screen.getByText("已审")).toBeDefined();
    expect(
      container.querySelector('[data-slot="page-chrome-identity"]'),
    ).not.toBeNull();
    const content = container.querySelector('[data-slot="page-content"]');
    expect(content?.getAttribute("data-density")).toBe("compact");
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
