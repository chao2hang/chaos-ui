import { describe, it, expect } from "vitest";
import { ChatCommandMenu } from "./chat-command-menu";
import type { ChatCommandMenuProps } from "./chat-command-menu";

describe("chat-command-menu", () => {
  it("exports ChatCommandMenu", () => {
    expect(ChatCommandMenu).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ChatCommandMenuProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
