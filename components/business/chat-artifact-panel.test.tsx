import { describe, it, expect } from "vitest";
import { ChatArtifactPanel } from "./chat-artifact-panel";
import type { ChatArtifactPanelProps } from "./chat-artifact-panel";

describe("chat-artifact-panel", () => {
  it("exports ChatArtifactPanel", () => {
    expect(ChatArtifactPanel).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ChatArtifactPanelProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
