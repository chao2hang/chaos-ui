import { describe, it, expect } from "vitest";
import { Notification } from "./notification";
import type { NotificationType, NotificationProps } from "./notification";

describe("notification", () => {
  it("exports Notification", () => {
    expect(Notification).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: NotificationType | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: NotificationProps | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
