import { describe, it, expect } from "vitest";
import { ChatCardMessage } from "./chat-card-message";
import type { ChatCardMessageProps } from "./chat-card-message";

describe("chat-card-message", () => {
  it("exports ChatCardMessage", () => {
    expect(ChatCardMessage).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ChatCardMessageProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
