import { describe, it, expect } from "vitest";
import { MessageProvider } from "./message-provider";
import type { MessageProviderProps } from "./message-provider";

describe("message-provider", () => {
  it("exports MessageProvider", () => {
    expect(MessageProvider).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: MessageProviderProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
