import { render, screen } from "@testing-library/react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import ComponentDetailPage from "./page";

const mocks = vi.hoisted(() => ({
  locale: "en" as "en" | "zh",
  components: [] as Array<{
    category: string;
    slug: string;
    name: string;
    nameZh: string;
    storybookId?: string;
  }>,
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: AnchorHTMLAttributes<HTMLAnchorElement> & {
    children?: ReactNode;
    href: string;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock(
  "@/lib/i18n/get-server-locale",
  () => ({
    getServerLocale: vi.fn(async () => mocks.locale),
  }),
);

vi.mock(
  "@/lib/i18n/dict",
  () => ({
    dict: {
      zh: {
        detail: {
          breadcrumbRoot: "组件总览",
          storybookLink: "Storybook 文档",
          notFoundTitle: "组件未找到",
          notFoundDesc: "请返回组件总览选择一个有效的组件。",
          mdxNotFoundTitle: "组件详情生成中",
          mdxNotFoundDesc:
            "该组件的文档尚未生成,请稍后再试或前往 Storybook 查看。",
        },
      },
      en: {
        detail: {
          breadcrumbRoot: "Components Overview",
          storybookLink: "Storybook Docs",
          notFoundTitle: "Component not found",
          notFoundDesc:
            "Please return to the overview and pick a valid component.",
          mdxNotFoundTitle: "Documentation is being generated",
          mdxNotFoundDesc:
            "This component's docs are not ready yet. Try again later or view it on Storybook.",
        },
      },
    },
  }),
);

vi.mock(
  "@/content/components.meta",
  () => ({
    components: mocks.components,
    categoryLabelsZh: {
      Feedback: "反馈",
    },
    categoryLabelsEn: {
      Feedback: "Feedback",
    },
  }),
);

vi.mock(
  "@/components/component-preview",
  () => ({
    ComponentPreview: () => null,
  }),
);

async function renderPage(params: { category: string; slug: string }) {
  const element = await ComponentDetailPage({
    params: Promise.resolve(params),
  });
  return render(element);
}

describe("ComponentDetailPage fallbacks", () => {
  beforeEach(() => {
    mocks.locale = "en";
    mocks.components.splice(0, mocks.components.length);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("shows the component-not-found copy when meta is missing in English", async () => {
    mocks.locale = "en";

    await renderPage({ category: "Feedback", slug: "missing" });

    expect(
      screen.getByRole("heading", { name: "Component not found" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Please return to the overview and pick a valid component.",
      ),
    ).toBeInTheDocument();

    const backLink = screen.getByRole("link", { name: "Components Overview" });
    expect(backLink).toHaveAttribute("href", "/components");
    expect(
      screen.queryByRole("link", { name: /Storybook/ }),
    ).not.toBeInTheDocument();
  });

  it("shows the component-not-found copy when meta is missing in Chinese", async () => {
    mocks.locale = "zh";

    await renderPage({ category: "Feedback", slug: "missing" });

    expect(
      screen.getByRole("heading", { name: "组件未找到" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("请返回组件总览选择一个有效的组件。"),
    ).toBeInTheDocument();

    const backLink = screen.getByRole("link", { name: "组件总览" });
    expect(backLink).toHaveAttribute("href", "/components");
    expect(
      screen.queryByRole("link", { name: /Storybook/ }),
    ).not.toBeInTheDocument();
  });

  it("shows the mdx-missing copy and Storybook link when docs are absent", async () => {
    mocks.locale = "en";
    mocks.components.push({
      category: "Feedback",
      slug: "ghost-notice",
      name: "Notice",
      nameZh: "通知",
      storybookId: "components-notice--docs",
    });

    await renderPage({ category: "Feedback", slug: "ghost-notice" });

    expect(
      screen.getByRole("heading", { name: "Notice 通知" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "This component's docs are not ready yet. Try again later or view it on Storybook.",
      ),
    ).toBeInTheDocument();

    const backLink = screen.getByRole("link", { name: "Components Overview" });
    expect(backLink).toHaveAttribute("href", "/components");

    const storybookLink = screen.getByRole("link", { name: "Storybook Docs" });
    expect(storybookLink).toHaveAttribute(
      "href",
      "http://localhost:6006/?path=/docs/components-notice--docs",
    );
    expect(storybookLink).toHaveAttribute("target", "_blank");
    expect(storybookLink).toHaveAttribute(
      "rel",
      expect.stringContaining("noopener"),
    );
    expect(storybookLink).toHaveAttribute(
      "rel",
      expect.stringContaining("noreferrer"),
    );
  });

  it("omits the Storybook link when mdx is missing and no storybook id exists", async () => {
    mocks.locale = "zh";
    mocks.components.push({
      category: "Feedback",
      slug: "ghost-alert",
      name: "Alert",
      nameZh: "警告提示",
    });

    await renderPage({ category: "Feedback", slug: "ghost-alert" });

    expect(
      screen.getByRole("heading", { name: "Alert 警告提示" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "该组件的文档尚未生成,请稍后再试或前往 Storybook 查看。",
      ),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /Storybook/ }),
    ).not.toBeInTheDocument();
  });
});
