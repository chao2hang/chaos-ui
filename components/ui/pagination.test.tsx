import { describe, it, expect } from "vitest";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

describe("pagination", () => {
  it("exports Pagination", () => {
    expect(Pagination).toBeDefined();
  });

  it("exports PaginationContent", () => {
    expect(PaginationContent).toBeDefined();
  });

  it("exports PaginationEllipsis", () => {
    expect(PaginationEllipsis).toBeDefined();
  });

  it("exports PaginationItem", () => {
    expect(PaginationItem).toBeDefined();
  });

  it("exports PaginationLink", () => {
    expect(PaginationLink).toBeDefined();
  });

  it("exports PaginationNext", () => {
    expect(PaginationNext).toBeDefined();
  });

  it("exports PaginationPrevious", () => {
    expect(PaginationPrevious).toBeDefined();
  });
});
