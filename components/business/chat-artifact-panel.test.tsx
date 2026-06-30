import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChatArtifactPanel } from "./chat-artifact-panel";
import type { ChatArtifactPanelProps } from "./chat-artifact-panel";

describe("chat-artifact-panel", () => {
  it("exports ChatArtifactPanel", () => {
    expect(ChatArtifactPanel).toBeDefined();
  });

  it("exports types", () => {
    const _tc: ChatArtifactPanelProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders the artifact title and type", () => {
    render(<ChatArtifactPanel title="Quarterly Report" type="document" content="# Hello" />);
    expect(screen.getByText("Quarterly Report")).toBeDefined();
    expect(screen.getByText("document")).toBeDefined();
  });

  it("renders markdown content", () => {
    render(<ChatArtifactPanel content="# Title" />);
    expect(screen.getByText("Title")).toBeDefined();
  });

  it("shows placeholder when no content", () => {
    render(<ChatArtifactPanel title="Empty" />);
    expect(screen.getByText("No content generated yet.")).toBeDefined();
  });
});
