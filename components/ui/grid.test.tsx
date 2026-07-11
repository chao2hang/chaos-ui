import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Row, Col } from "@/components/ui/grid";
import type {
  RowProps,
  ColProps,
  ColSpan,
  ResponsiveCol,
} from "@/components/ui/grid";

describe("grid", () => {
  it("renders Row with children", () => {
    const { container } = render(
      <Row>
        <Col span={12}>A</Col>
        <Col span={12}>B</Col>
      </Row>,
    );
    expect(container.textContent).toContain("A");
    expect(container.textContent).toContain("B");
  });

  it("Row applies grid-cols-24 class by default", () => {
    const { container } = render(<Row>Content</Row>);
    const row = container.querySelector('[class*="grid-cols-24"]');
    expect(row).not.toBeNull();
  });

  it("Row applies align class", () => {
    const { container } = render(<Row align="middle">Content</Row>);
    const row = container.firstChild as HTMLElement;
    expect(row?.className).toContain("items-center");
  });

  it("Row applies justify class", () => {
    const { container } = render(<Row justify="center">Content</Row>);
    const row = container.firstChild as HTMLElement;
    expect(row?.className).toContain("justify-center");
  });

  it("Row applies wrap=false as flex-nowrap", () => {
    const { container } = render(<Row wrap={false}>Content</Row>);
    const row = container.firstChild as HTMLElement;
    expect(row?.className).toContain("flex-nowrap");
  });

  it("Row applies gutter as negative margin style", () => {
    const { container } = render(<Row gutter={16}>Content</Row>);
    const row = container.firstChild as HTMLElement;
    const style = (row as HTMLElement).style;
    expect(style.marginLeft).toBe("-8px");
    expect(style.marginRight).toBe("-8px");
  });

  it("Row applies vertical gutter as rowGap", () => {
    const { container } = render(<Row gutter={[16, 8]}>Content</Row>);
    const row = container.firstChild as HTMLElement;
    const style = (row as HTMLElement).style;
    expect(style.rowGap).toBe("8px");
  });

  it("Col renders children", () => {
    const { container } = render(<Col span={12}>Content</Col>);
    expect(container.textContent).toContain("Content");
  });

  it("Col applies span class", () => {
    const { container } = render(<Col span={6}>Content</Col>);
    const col = container.firstChild as HTMLElement;
    expect(col?.className).toContain("col-span-6");
    // base breakpoint must NOT have a leading colon (was a bug in ≤1.2.1)
    expect(col?.className).not.toMatch(/(^|\s):col-span/);
  });

  it("Col applies offset class", () => {
    const { container } = render(
      <Col span={6} offset={3}>
        Content
      </Col>,
    );
    const col = container.firstChild as HTMLElement;
    expect(col?.className).toContain("col-start-[4]");
    expect(col?.className).not.toMatch(/(^|\s):col-start/);
  });

  it("Col applies order class", () => {
    const { container } = render(
      <Col span={6} order={2}>
        Content
      </Col>,
    );
    const col = container.firstChild as HTMLElement;
    expect(col?.className).toContain("order-2");
    expect(col?.className).not.toMatch(/(^|\s):order/);
  });

  it("Col applies responsive xs classes", () => {
    const { container } = render(
      <Col span={12} xs={{ span: 24 }}>
        Content
      </Col>,
    );
    const col = container.firstChild as HTMLElement;
    expect(col?.className).toContain("xs:col-span-24");
  });

  it("Col applies responsive sm classes", () => {
    const { container } = render(
      <Col span={12} sm={{ span: 8, offset: 2 }}>
        Content
      </Col>,
    );
    const col = container.firstChild as HTMLElement;
    expect(col?.className).toContain("sm:col-span-8");
    expect(col?.className).toContain("sm:col-start-[3]");
  });

  it("Col applies responsive md classes", () => {
    const { container } = render(
      <Col span={12} md={{ span: 6 }}>
        Content
      </Col>,
    );
    const col = container.firstChild as HTMLElement;
    expect(col?.className).toContain("md:col-span-6");
  });

  it("Col applies responsive lg classes", () => {
    const { container } = render(
      <Col span={12} lg={{ order: 1 }}>
        Content
      </Col>,
    );
    const col = container.firstChild as HTMLElement;
    expect(col?.className).toContain("lg:order-1");
  });

  it("Col applies responsive xl classes", () => {
    const { container } = render(
      <Col span={12} xl={{ span: 4 }}>
        Content
      </Col>,
    );
    const col = container.firstChild as HTMLElement;
    expect(col?.className).toContain("xl:col-span-4");
  });

  it("Col applies responsive xxl classes", () => {
    const { container } = render(
      <Col span={12} xxl={{ span: 3 }}>
        Content
      </Col>,
    );
    const col = container.firstChild as HTMLElement;
    expect(col?.className).toContain("2xl:col-span-3");
  });

  it("Col with _gutter applies padding style", () => {
    const { container } = render(
      <Col span={12} _gutter={16}>
        Content
      </Col>,
    );
    const col = container.firstChild as HTMLElement;
    const style = (col as HTMLElement).style;
    expect(style.paddingLeft).toBe("8px");
    expect(style.paddingRight).toBe("8px");
  });

  it("Col merges custom className", () => {
    const { container } = render(
      <Col span={12} className="my-col">
        Content
      </Col>,
    );
    const col = container.firstChild as HTMLElement;
    expect(col?.className).toContain("my-col");
  });

  it("Row merges custom className", () => {
    const { container } = render(<Row className="my-row">Content</Row>);
    const row = container.firstChild as HTMLElement;
    expect(row?.className).toContain("my-row");
  });

  it("Row passes gutter to children via _gutter prop", () => {
    const { container } = render(
      <Row gutter={24}>
        <Col span={12}>A</Col>
      </Row>,
    );
    const col = container.querySelector('[class*="col-span-12"]');
    expect(col).not.toBeNull();
    const style = (col as HTMLElement).style;
    expect(style.paddingLeft).toBe("12px");
    expect(style.paddingRight).toBe("12px");
  });

  it("RowProps type is importable", () => {
    const _props: RowProps = {
      gutter: 16,
      align: "middle",
      justify: "center",
      wrap: true,
    };
    expect(_props.gutter).toBe(16);
  });

  it("ColProps type is importable", () => {
    const _props: ColProps = { span: 12, offset: 3, order: 1 };
    expect(_props.span).toBe(12);
  });

  it("ColSpan type is importable", () => {
    const span: ColSpan = 12;
    expect(span).toBe(12);
  });

  it("ResponsiveCol type is importable", () => {
    const rc: ResponsiveCol = { span: 6, offset: 2, order: 1 };
    expect(rc.span).toBe(6);
  });

  it("Row applies all align options", () => {
    const aligns: Array<NonNullable<RowProps["align"]>> = [
      "top",
      "middle",
      "bottom",
      "stretch",
    ];
    const classMap: Record<string, string> = {
      top: "items-start",
      middle: "items-center",
      bottom: "items-end",
      stretch: "items-stretch",
    };
    for (const align of aligns) {
      const { container } = render(<Row align={align}>Test</Row>);
      const row = container.firstChild as HTMLElement;
      expect(row?.className).toContain(classMap[align]);
    }
  });

  it("Row applies all justify options", () => {
    const justifies: Array<NonNullable<RowProps["justify"]>> = [
      "start",
      "end",
      "center",
      "space-around",
      "space-between",
      "space-evenly",
    ];
    const classMap: Record<string, string> = {
      start: "justify-start",
      end: "justify-end",
      center: "justify-center",
      "space-around": "justify-around",
      "space-between": "justify-between",
      "space-evenly": "justify-evenly",
    };
    for (const justify of justifies) {
      const { container } = render(<Row justify={justify}>Test</Row>);
      const row = container.firstChild as HTMLElement;
      expect(row?.className).toContain(classMap[justify]);
    }
  });

  it("Col with no span renders without col-span class", () => {
    const { container } = render(<Col>Content</Col>);
    const col = container.firstChild as HTMLElement;
    expect(col?.className).not.toContain("col-span-");
  });

  it("Col span=17 generates valid class without leading colon (regression for ≤1.2.1 bug)", () => {
    const { container } = render(<Col span={17}>Content</Col>);
    const col = container.firstChild as HTMLElement;
    expect(col?.className).toContain("col-span-17");
    expect(col?.className).not.toMatch(/(^|\s):col-span/);
  });
});
