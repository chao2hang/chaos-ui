import { describe, it, expect } from "vitest";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "./context-menu";

describe("context-menu", () => {
  it("exports ContextMenu", () => {
    expect(ContextMenu).toBeDefined();
  });

  it("exports ContextMenuCheckboxItem", () => {
    expect(ContextMenuCheckboxItem).toBeDefined();
  });

  it("exports ContextMenuContent", () => {
    expect(ContextMenuContent).toBeDefined();
  });

  it("exports ContextMenuGroup", () => {
    expect(ContextMenuGroup).toBeDefined();
  });

  it("exports ContextMenuItem", () => {
    expect(ContextMenuItem).toBeDefined();
  });

  it("exports ContextMenuLabel", () => {
    expect(ContextMenuLabel).toBeDefined();
  });

  it("exports ContextMenuPortal", () => {
    expect(ContextMenuPortal).toBeDefined();
  });

  it("exports ContextMenuRadioGroup", () => {
    expect(ContextMenuRadioGroup).toBeDefined();
  });

  it("exports ContextMenuRadioItem", () => {
    expect(ContextMenuRadioItem).toBeDefined();
  });

  it("exports ContextMenuSeparator", () => {
    expect(ContextMenuSeparator).toBeDefined();
  });

  it("exports ContextMenuSub", () => {
    expect(ContextMenuSub).toBeDefined();
  });

  it("exports ContextMenuSubContent", () => {
    expect(ContextMenuSubContent).toBeDefined();
  });

  it("exports ContextMenuSubTrigger", () => {
    expect(ContextMenuSubTrigger).toBeDefined();
  });

  it("exports ContextMenuTrigger", () => {
    expect(ContextMenuTrigger).toBeDefined();
  });
});
