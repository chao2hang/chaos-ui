import { describe, it, expect } from "vitest";
import { ChatInputToolbar } from "./chat-input-toolbar";
import type { ChatInputToolbarProps } from "./chat-input-toolbar";

describe("chat-input-toolbar", () => {
  it("exports ChatInputToolbar", () => {
    expect(ChatInputToolbar).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ChatInputToolbarProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
