import { describe, it, expect } from "vitest";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListVariants,
} from "./tabs";

describe("tabs", () => {
  it("exports Tabs", () => {
    expect(Tabs).toBeDefined();
  });

  it("exports TabsList", () => {
    expect(TabsList).toBeDefined();
  });

  it("exports TabsTrigger", () => {
    expect(TabsTrigger).toBeDefined();
  });

  it("exports TabsContent", () => {
    expect(TabsContent).toBeDefined();
  });

  it("exports tabsListVariants", () => {
    expect(tabsListVariants).toBeDefined();
  });
});
