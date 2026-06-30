import { describe, it, expect } from "vitest";
import { ArticleLayout } from "./article-layout";
import type { ArticleLayoutProps } from "./article-layout";

describe("article-layout", () => {
  it("exports ArticleLayout", () => {
    expect(ArticleLayout).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ArticleLayoutProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
