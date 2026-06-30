import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MobileInfiniteScroll } from "./mobile-infinite-scroll";
import type { MobileInfiniteScrollProps } from "./mobile-infinite-scroll";

describe("MobileInfiniteScroll", () => {
  it("renders children and a default 'load more' hint", () => {
    render(
      <MobileInfiniteScroll hasMore loading={false}>
        <p>第一项</p>
      </MobileInfiniteScroll>,
    );
    expect(screen.getByText("第一项")).toBeDefined();
    expect(screen.getByText("上拉加载更多")).toBeDefined();
  });

  it("shows a loading indicator while loading", () => {
    render(<MobileInfiniteScroll hasMore loading />);
    expect(screen.getByText("加载中…")).toBeDefined();
  });

  it("shows the no-more hint when hasMore is false", () => {
    render(<MobileInfiniteScroll hasMore={false} loading={false} />);
    expect(screen.getByText("没有更多了")).toBeDefined();
  });

  it("exports types", () => {
    const _t: MobileInfiniteScrollProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
