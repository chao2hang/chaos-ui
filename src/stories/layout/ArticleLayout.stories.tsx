import type { Meta, StoryObj } from "@storybook/react";
import { ArticleLayout } from "@/components/layout/article-layout";
import { Typography } from "@/components/ui/typography";

const meta = {
  title: "Layouts/ArticleLayout",
  component: ArticleLayout,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ArticleLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Full article with title, TOC, body, and footer. */
export const FullArticle: Story = {
  render: () => (
    <ArticleLayout
      title="Getting started with Chaos UI"
      toc={
        <nav className="space-y-1 text-sm">
          <a className="text-primary block" href="#intro">
            Introduction
          </a>
          <a className="text-muted-foreground block" href="#install">
            Installation
          </a>
          <a className="text-muted-foreground block" href="#usage">
            Usage
          </a>
        </nav>
      }
      footer={<p className="text-muted-foreground text-sm">© 2026 Chaos UI</p>}
    >
      <Typography.Paragraph>
        <span id="intro">
          This is the article body. It flows inside a constrained prose column
          while the table of contents sticks to the side.
        </span>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <span id="install">
          Install with <code className="bg-muted rounded px-1">npm i</code> and
          import the components you need.
        </span>
      </Typography.Paragraph>
    </ArticleLayout>
  ),
};

/** No TOC — single-column reading layout. */
export const NoToc: Story = {
  render: () => (
    <ArticleLayout title="Release notes — v2.4.0">
      <Typography.Paragraph>
        The release ships 28 new chat stories and 16 high-priority UI stories.
      </Typography.Paragraph>
      <Typography.Paragraph muted>
        Patch notes follow semantic versioning.
      </Typography.Paragraph>
    </ArticleLayout>
  ),
};

/** Bare article — only body content, no title. */
export const Bare: Story = {
  render: () => (
    <ArticleLayout>
      <Typography.Paragraph>
        A minimal body-only layout — useful when the title is rendered
        elsewhere.
      </Typography.Paragraph>
    </ArticleLayout>
  ),
};
