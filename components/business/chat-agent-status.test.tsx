import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChatAgentStatus } from "./chat-agent-status";
import type { ChatAgentStatusProps } from "./chat-agent-status";

describe("chat-agent-status", () => {
  it("exports ChatAgentStatus", () => {
    expect(ChatAgentStatus).toBeDefined();
  });

  it("exports types", () => {
    const _tc: ChatAgentStatusProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders a default label for the thinking status", () => {
    render(<ChatAgentStatus status="thinking" />);
    expect(screen.getByText("Thinking")).toBeDefined();
  });

  it("renders a custom label when provided", () => {
    render(<ChatAgentStatus status="done" label="Finished" />);
    expect(screen.getByText("Finished")).toBeDefined();
  });

  it("renders the done label for done status", () => {
    render(<ChatAgentStatus status="done" />);
    expect(screen.getByText("Done")).toBeDefined();
  });
});
