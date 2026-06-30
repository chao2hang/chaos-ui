import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useWebsocket } from "./use-websocket";

describe("useWebsocket", () => {
  it("exposes send/close helpers when no url", () => {
    const { result } = renderHook(() => useWebsocket(null));
    expect(typeof result.current.send).toBe("function");
    expect(typeof result.current.close).toBe("function");
    expect(result.current.lastMessage).toBeUndefined();
  });
});
