import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { InfiniteScroll } from "./infinite-scroll";

describe("InfiniteScroll", () => {
  it("exports InfiniteScroll", () => {
    expect(InfiniteScroll).toBeDefined();
  });

  it("renders children", () => {
    render(
      <InfiniteScroll>
        <p>Item 1</p>
        <p>Item 2</p>
      </InfiniteScroll>,
    );
    expect(screen.getByText("Item 1")).toBeDefined();
    expect(screen.getByText("Item 2")).toBeDefined();
  });

  it("shows spinner when loading", () => {
    const { container } = render(
      <InfiniteScroll loading hasMore>
        <p>Content</p>
      </InfiniteScroll>,
    );
    expect(container.querySelector('[data-slot="spinner"]')).not.toBeNull();
  });

  it("shows end message when !hasMore", () => {
    render(
      <InfiniteScroll hasMore={false}>
        <p>Content</p>
      </InfiniteScroll>,
    );
    expect(screen.getByText("No more data")).toBeDefined();
  });

  it("does not show end message when hasMore && !loading", () => {
    render(
      <InfiniteScroll hasMore loading={false}>
        <p>Content</p>
      </InfiniteScroll>,
    );
    expect(screen.queryByText("No more data")).toBeNull();
  });

  it("uses custom loader", () => {
    render(
      <InfiniteScroll
        loading
        hasMore
        loader={<span data-testid="custom-loader">Loading...</span>}
      >
        <p>Content</p>
      </InfiniteScroll>,
    );
    expect(screen.getByTestId("custom-loader")).toBeDefined();
  });

  it("uses custom endMessage", () => {
    render(
      <InfiniteScroll hasMore={false} endMessage="All done!">
        <p>Content</p>
      </InfiniteScroll>,
    );
    expect(screen.getByText("All done!")).toBeDefined();
  });

  it("has data-slot attribute", () => {
    const { container } = render(
      <InfiniteScroll>
        <p>Content</p>
      </InfiniteScroll>,
    );
    expect(
      container.querySelector('[data-slot="infinite-scroll"]'),
    ).not.toBeNull();
  });

  it("module is importable", async () => {
    const mod = await import("./infinite-scroll");
    expect(mod.InfiniteScroll).toBeDefined();
  });
});
