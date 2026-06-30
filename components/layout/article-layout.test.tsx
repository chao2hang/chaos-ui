import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ArticleLayout } from "./article-layout";

describe("ArticleLayout", () => {
  it("renders title in a header and body content", () => {
    render(
      <ArticleLayout title={<h1>Getting Started</h1>}>
        <p>Body content here.</p>
      </ArticleLayout>,
    );
    expect(screen.getByText("Getting Started")).toBeDefined();
    expect(screen.getByText("Body content here.")).toBeDefined();
  });

  it("renders footer when provided", () => {
    render(
      <ArticleLayout footer={<div>Footer notes</div>}>
        <p>Body</p>
      </ArticleLayout>,
    );
    expect(screen.getByText("Footer notes")).toBeDefined();
  });

  it("renders TOC aside when provided", () => {
    render(
      <ArticleLayout toc={<nav>Toc items</nav>}>
        <p>Body</p>
      </ArticleLayout>,
    );
    expect(screen.getByText("Toc items")).toBeDefined();
  });

  it("renders without optional props", () => {
    const { container } = render(<ArticleLayout>Just body</ArticleLayout>);
    expect(container.querySelector('[data-slot="article-layout"]')).not.toBeNull();
    expect(screen.getByText("Just body")).toBeDefined();
  });
});
