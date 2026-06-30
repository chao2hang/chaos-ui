import { describe, it, expect } from "vitest";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuPositioner,
} from "./navigation-menu";

describe("navigation-menu", () => {
  it("exports NavigationMenu", () => {
    expect(NavigationMenu).toBeDefined();
  });

  it("exports NavigationMenuContent", () => {
    expect(NavigationMenuContent).toBeDefined();
  });

  it("exports NavigationMenuIndicator", () => {
    expect(NavigationMenuIndicator).toBeDefined();
  });

  it("exports NavigationMenuItem", () => {
    expect(NavigationMenuItem).toBeDefined();
  });

  it("exports NavigationMenuLink", () => {
    expect(NavigationMenuLink).toBeDefined();
  });

  it("exports NavigationMenuList", () => {
    expect(NavigationMenuList).toBeDefined();
  });

  it("exports NavigationMenuTrigger", () => {
    expect(NavigationMenuTrigger).toBeDefined();
  });

  it("exports navigationMenuTriggerStyle", () => {
    expect(navigationMenuTriggerStyle).toBeDefined();
  });

  it("exports NavigationMenuPositioner", () => {
    expect(NavigationMenuPositioner).toBeDefined();
  });
});
