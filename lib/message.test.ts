import { describe, it, expect } from "vitest";
import { message } from "./message";
import type {
  MessageType,
  MessagePlacement,
  MessageOptions,
  MessageGlobalConfig,
} from "./message";

describe("message", () => {
  it("exports message", () => {
    expect(message).toBeDefined();
  });
  it("exports types", () => {
    const _tc1: MessageType | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: MessagePlacement | undefined = undefined;
    expect(_tc2).toBeUndefined();
    const _tc3: MessageOptions | undefined = undefined;
    expect(_tc3).toBeUndefined();
    const _tc4: MessageGlobalConfig | undefined = undefined;
    expect(_tc4).toBeUndefined();
  });
});
