import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChatCardMessage } from "./chat-card-message";
import type { ChatCardMessageProps } from "./chat-card-message";

describe("chat-card-message", () => {
  it("exports ChatCardMessage", () => {
    expect(ChatCardMessage).toBeDefined();
  });

  it("exports types", () => {
    const _tc: ChatCardMessageProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders the card title and description", () => {
    render(<ChatCardMessage title="Release v2" description="Shipped today" />);
    expect(screen.getByText("Release v2")).toBeDefined();
    expect(screen.getByText("Shipped today")).toBeDefined();
  });

  it("renders metadata label/value pairs", () => {
    render(<ChatCardMessage title="Doc" metadata={[{ label: "Author", value: "Alice" }]} />);
    expect(screen.getByText("Author")).toBeDefined();
    expect(screen.getByText("Alice")).toBeDefined();
  });
});
