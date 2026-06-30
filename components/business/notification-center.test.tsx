import { describe, it, expect } from "vitest";
import { NotificationCenter } from "./notification-center";
import type { NotificationItem } from "./notification-center";

describe("notification-center", () => {
  it("exports NotificationCenter", () => {
    expect(NotificationCenter).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: NotificationItem | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
