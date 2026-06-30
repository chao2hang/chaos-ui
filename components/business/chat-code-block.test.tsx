import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChatCodeBlock } from "./chat-code-block";
import type { ChatCodeBlockProps } from "./chat-code-block";

describe("chat-code-block", () => {
  it("exports ChatCodeBlock", () => {
    expect(ChatCodeBlock).toBeDefined();
  });

  it("exports types", () => {
    const _tc: ChatCodeBlockProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders the code content and language label", () => {
    render(<ChatCodeBlock code="console.log(1)" language="ts" />);
    expect(screen.getByText("console.log(1)")).toBeDefined();
    expect(screen.getByText("ts")).toBeDefined();
  });

  it("renders the filename when provided", () => {
    render(<ChatCodeBlock code="x = 1" filename="app.ts" />);
    expect(screen.getByText("app.ts")).toBeDefined();
  });
});
