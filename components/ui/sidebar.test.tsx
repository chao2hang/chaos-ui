import { describe, it, expect } from "vitest";

describe("Sidebar", () => {
  it("module is importable with expected exports", async () => {
    const mod = await import("@/components/ui/sidebar");
    expect(mod.Sidebar).toBeDefined();
    expect(mod.SidebarProvider).toBeDefined();
    expect(mod.useSidebar).toBeDefined();
  });
});
