import { describe, it, expect } from "vitest";
import { List, ListHeader, ListItem, ListFooter } from "./list";
import type {
  ListProps,
  ListItemProps,
  ListHeaderProps,
  ListFooterProps,
} from "./list";

describe("list", () => {
  it("exports List", () => {
    expect(List).toBeDefined();
  });

  it("exports ListHeader", () => {
    expect(ListHeader).toBeDefined();
  });

  it("exports ListItem", () => {
    expect(ListItem).toBeDefined();
  });

  it("exports ListFooter", () => {
    expect(ListFooter).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ListProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: ListItemProps | undefined = undefined;
    expect(_tc2).toBeUndefined();
    const _tc3: ListHeaderProps | undefined = undefined;
    expect(_tc3).toBeUndefined();
    const _tc4: ListFooterProps | undefined = undefined;
    expect(_tc4).toBeUndefined();
  });
});
