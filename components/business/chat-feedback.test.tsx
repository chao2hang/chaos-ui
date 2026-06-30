import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChatFeedback } from "./chat-feedback";
import type { ChatFeedbackProps } from "./chat-feedback";

describe("chat-feedback", () => {
  it("exports ChatFeedback", () => {
    expect(ChatFeedback).toBeDefined();
  });

  it("exports types", () => {
    const _tc: ChatFeedbackProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders like and dislike buttons", () => {
    render(<ChatFeedback onLike={() => {}} onDislike={() => {}} />);
    expect(screen.getByLabelText("Good response")).toBeDefined();
    expect(screen.getByLabelText("Bad response")).toBeDefined();
  });

  it("renders comment button when onComment provided", () => {
    render(<ChatFeedback onComment={() => {}} />);
    expect(screen.getByText("Comment")).toBeDefined();
  });
});
