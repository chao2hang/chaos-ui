import { describe, it, expect } from "vitest";
import { useWebsocket } from "./use-websocket";

describe("use-websocket", () => {
  it("exports useWebsocket", () => {
    expect(useWebsocket).toBeDefined();
  });
});
