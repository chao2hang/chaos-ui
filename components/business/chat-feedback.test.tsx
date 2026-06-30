import { describe, it, expect } from "vitest";
import { ChatFeedback } from "./chat-feedback";
import type { ChatFeedbackProps } from "./chat-feedback";

describe("chat-feedback", () => {
  it("exports ChatFeedback", () => {
    expect(ChatFeedback).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ChatFeedbackProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
