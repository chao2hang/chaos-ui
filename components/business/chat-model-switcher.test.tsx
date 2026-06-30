import { describe, it, expect } from "vitest";
import { ChatModelSwitcher } from "./chat-model-switcher";
import type { ChatModelSwitcherProps } from "./chat-model-switcher";

describe("chat-model-switcher", () => {
  it("exports ChatModelSwitcher", () => {
    expect(ChatModelSwitcher).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ChatModelSwitcherProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
