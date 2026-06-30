import { describe, it, expect } from "vitest";
import { ChatBranch } from "./chat-branch";
import type { ChatBranchProps } from "./chat-branch";

describe("chat-branch", () => {
  it("exports ChatBranch", () => {
    expect(ChatBranch).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ChatBranchProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
