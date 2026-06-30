import { describe, it, expect } from "vitest";
import { ChatSidebar } from "./chat-sidebar";
import type { ChatSidebarProps } from "./chat-sidebar";

describe("chat-sidebar", () => {
  it("exports ChatSidebar", () => {
    expect(ChatSidebar).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ChatSidebarProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
