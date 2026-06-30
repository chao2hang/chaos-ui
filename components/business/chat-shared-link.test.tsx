import { describe, it, expect } from "vitest";
import { ChatSharedLink } from "./chat-shared-link";
import type { ChatSharedLinkProps } from "./chat-shared-link";

describe("chat-shared-link", () => {
  it("exports ChatSharedLink", () => {
    expect(ChatSharedLink).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ChatSharedLinkProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
