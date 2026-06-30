import { describe, it, expect } from "vitest";
import { ChatShell } from "./chat-shell";
import type { ChatShellProps } from "./chat-shell";

describe("chat-shell", () => {
  it("exports ChatShell", () => {
    expect(ChatShell).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ChatShellProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
