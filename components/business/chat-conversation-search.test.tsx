import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChatConversationSearch } from "./chat-conversation-search";
import type { ChatConversationSearchProps } from "./chat-conversation-search";

describe("chat-conversation-search", () => {
  it("exports ChatConversationSearch", () => {
    expect(ChatConversationSearch).toBeDefined();
  });

  it("exports types", () => {
    const _tc: ChatConversationSearchProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders results title and snippet", () => {
    render(
      <ChatConversationSearch
        query="hello"
        results={[{ id: "1", title: "Greeting", snippet: "hello world" }]}
      />,
    );
    expect(screen.getByText("Greeting")).toBeDefined();
    expect(screen.getByText("hello world")).toBeDefined();
  });

  it("renders no-results state", () => {
    render(<ChatConversationSearch query="zzz" results={[]} />);
    expect(screen.getByText(/No results for/)).toBeDefined();
  });
});
