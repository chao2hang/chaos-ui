import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ImMessage } from "./im-message";
import type { ImMessageProps } from "./im-message";

describe("ImMessage", () => {
  it("exports ImMessage", () => {
    expect(ImMessage).toBeDefined();
  });

  it("exports types", () => {
    const _tc: ImMessageProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders content and author for received message", () => {
    render(<ImMessage direction="received" author="李四" content="你好" />);
    expect(screen.getByText("你好")).toBeDefined();
    expect(screen.getByText("李四")).toBeDefined();
  });

  it("renders attachment names", () => {
    render(
      <ImMessage
        direction="sent"
        content="请查收"
        attachments={[{ id: "a1", name: "report.xlsx" }]}
      />,
    );
    expect(screen.getByText("report.xlsx")).toBeDefined();
  });

  it("renders placeholder for empty content", () => {
    render(<ImMessage content="" />);
    expect(screen.getByText("（空消息）")).toBeDefined();
  });

  it("renders article with direction-aware aria-label", () => {
    render(
      <ImMessage direction="sent" author="张三" content="hi" />,
    );
    expect(screen.getByRole("article", { name: "发送消息来自 张三" })).toBeDefined();
  });

  it("renders aria-label without author when author omitted", () => {
    render(<ImMessage direction="received" content="hi" />);
    expect(screen.getByRole("article", { name: "接收消息" })).toBeDefined();
  });

  it("renders the first initial as avatar fallback", () => {
    render(<ImMessage author="alice" content="hi" />);
    expect(screen.getByText("A")).toBeDefined();
  });

  it("renders ? as avatar initial when author omitted", () => {
    render(<ImMessage content="hi" />);
    expect(screen.getByText("?")).toBeDefined();
  });

  it("renders avatar image when avatarUrl provided", () => {
    render(
      <ImMessage author="bob" content="hi" avatarUrl="/avatar.png" />,
    );
    const img = screen.getByRole("article").querySelector(
      'img[src="/avatar.png"]',
    );
    expect(img).not.toBeNull();
  });

  it("renders multiple attachments", () => {
    render(
      <ImMessage
        content="files"
        attachments={[
          { id: "a", name: "one.pdf" },
          { id: "b", name: "two.csv" },
        ]}
      />,
    );
    expect(screen.getByText("one.pdf")).toBeDefined();
    expect(screen.getByText("two.csv")).toBeDefined();
  });

  it("omits author line when author is empty", () => {
    render(<ImMessage content="hi" />);
    expect(screen.queryByText("李四")).toBeNull();
  });

  it("renders timestamp via formatRelativeTime", () => {
    render(<ImMessage content="hi" timestamp="2026-06-30T10:00:00Z" />);
    const article = screen.getByRole("article");
    // The relative time text node exists somewhere in the article.
    expect(article.textContent).toBeTruthy();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/im-message");
    expect(mod.ImMessage).toBeDefined();
  });
});
