import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

describe("Pagination", () => {
  it("exports all sub-components", () => {
    expect(Pagination).toBeDefined();
    expect(PaginationContent).toBeDefined();
    expect(PaginationEllipsis).toBeDefined();
    expect(PaginationItem).toBeDefined();
    expect(PaginationLink).toBeDefined();
    expect(PaginationNext).toBeDefined();
    expect(PaginationPrevious).toBeDefined();
  });

  it("renders a nav with pagination aria-label", () => {
    const { container } = render(<Pagination />);
    const nav = container.querySelector(
      '[data-slot="pagination"]',
    ) as HTMLElement;
    expect(nav.tagName).toBe("NAV");
    expect(nav.getAttribute("aria-label")).toBe("pagination");
  });

  it("renders pagination links and marks active link", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#1">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#2" isActive>
              2
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );
    const first = screen.getByText("1").closest("a") as HTMLAnchorElement;
    const second = screen.getByText("2").closest("a") as HTMLAnchorElement;
    expect(first.getAttribute("aria-current")).toBeNull();
    expect(second.getAttribute("aria-current")).toBe("page");
    expect(second.getAttribute("data-active")).toBe("true");
  });

  it("fires onClick on a link", () => {
    const onClick = vi.fn();
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#3" onClick={onClick}>
              3
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );
    fireEvent.click(screen.getByText("3"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders Previous/Next with default text and aria-labels", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#prev" />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#next" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );
    expect(screen.getByText("Previous")).toBeDefined();
    expect(screen.getByText("Next")).toBeDefined();
    expect(screen.getByLabelText("Go to previous page")).toBeDefined();
    expect(screen.getByLabelText("Go to next page")).toBeDefined();
  });

  it("supports custom Previous/Next text", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" text="上页" />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" text="下页" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );
    expect(screen.getByText("上页")).toBeDefined();
    expect(screen.getByText("下页")).toBeDefined();
  });

  it("renders ellipsis with sr-only More pages text", () => {
    const { container } = render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );
    expect(
      container.querySelector('[data-slot="pagination-ellipsis"]'),
    ).not.toBeNull();
    expect(screen.getByText("More pages")).toBeDefined();
  });
});
