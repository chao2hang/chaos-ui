import { describe, it, expect } from "vitest";
import { ChatContextPanel } from "./chat-context-panel";
import type { ChatContextPanelProps } from "./chat-context-panel";

describe("chat-context-panel", () => {
  it("exports ChatContextPanel", () => {
    expect(ChatContextPanel).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ChatContextPanelProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
