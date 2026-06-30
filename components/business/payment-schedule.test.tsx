import { describe, it, expect } from "vitest";
import { PaymentSchedule } from "./payment-schedule";
import type { PaymentScheduleProps } from "./payment-schedule";

describe("payment-schedule", () => {
  it("exports PaymentSchedule", () => {
    expect(PaymentSchedule).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: PaymentScheduleProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
