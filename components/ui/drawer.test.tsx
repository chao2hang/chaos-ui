import { describe, it, expect } from "vitest";
import {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from "./drawer";

describe("drawer", () => {
  it("exports Drawer", () => {
    expect(Drawer).toBeDefined();
  });

  it("exports DrawerPortal", () => {
    expect(DrawerPortal).toBeDefined();
  });

  it("exports DrawerOverlay", () => {
    expect(DrawerOverlay).toBeDefined();
  });

  it("exports DrawerTrigger", () => {
    expect(DrawerTrigger).toBeDefined();
  });

  it("exports DrawerClose", () => {
    expect(DrawerClose).toBeDefined();
  });

  it("exports DrawerContent", () => {
    expect(DrawerContent).toBeDefined();
  });

  it("exports DrawerHeader", () => {
    expect(DrawerHeader).toBeDefined();
  });

  it("exports DrawerFooter", () => {
    expect(DrawerFooter).toBeDefined();
  });

  it("exports DrawerTitle", () => {
    expect(DrawerTitle).toBeDefined();
  });

  it("exports DrawerDescription", () => {
    expect(DrawerDescription).toBeDefined();
  });
});
