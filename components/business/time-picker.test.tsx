import { describe, it, expect } from "vitest";
import { TimePicker, formatTimeInput } from "./time-picker";

describe("time-picker", () => {
  it("exports TimePicker", () => {
    expect(TimePicker).toBeDefined();
  });

  it("exports formatTimeInput", () => {
    expect(formatTimeInput).toBeDefined();
  });
});
