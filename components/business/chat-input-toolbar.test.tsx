import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChatInputToolbar } from "./chat-input-toolbar";
import type { ChatInputToolbarProps } from "./chat-input-toolbar";

describe("chat-input-toolbar", () => {
  it("exports ChatInputToolbar", () => {
    expect(ChatInputToolbar).toBeDefined();
  });

  it("exports types", () => {
    const _tc: ChatInputToolbarProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders tool labels", () => {
    render(
      <ChatInputToolbar tools={[{ id: "attach", label: "Attach" }]} />,
    );
    expect(screen.getByText("Attach")).toBeDefined();
    expect(screen.getByLabelText("Attach file")).toBeDefined();
  });
});
