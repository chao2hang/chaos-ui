import { describe, it, expect } from "vitest";
import { ChatLayout } from "./chat-layout";
import type { ChatLayoutProps } from "./chat-layout";

describe("chat-layout", () => {
  it("exports ChatLayout", () => {
    expect(ChatLayout).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ChatLayoutProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
