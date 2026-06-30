import { describe, it, expect } from "vitest";
import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "./sheet";

describe("sheet", () => {
  it("exports Sheet", () => {
    expect(Sheet).toBeDefined();
  });

  it("exports SheetTrigger", () => {
    expect(SheetTrigger).toBeDefined();
  });

  it("exports SheetClose", () => {
    expect(SheetClose).toBeDefined();
  });

  it("exports SheetContent", () => {
    expect(SheetContent).toBeDefined();
  });

  it("exports SheetHeader", () => {
    expect(SheetHeader).toBeDefined();
  });

  it("exports SheetFooter", () => {
    expect(SheetFooter).toBeDefined();
  });

  it("exports SheetTitle", () => {
    expect(SheetTitle).toBeDefined();
  });

  it("exports SheetDescription", () => {
    expect(SheetDescription).toBeDefined();
  });
});
