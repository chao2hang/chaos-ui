import { describe, it, expect } from "vitest";
import { ChatHeader } from "./chat-header";
import type { ChatHeaderProps } from "./chat-header";

describe("chat-header", () => {
  it("exports ChatHeader", () => {
    expect(ChatHeader).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ChatHeaderProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
