import { describe, it, expect } from "vitest";
import {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
} from "./progress";

describe("progress", () => {
  it("exports Progress", () => {
    expect(Progress).toBeDefined();
  });

  it("exports ProgressTrack", () => {
    expect(ProgressTrack).toBeDefined();
  });

  it("exports ProgressIndicator", () => {
    expect(ProgressIndicator).toBeDefined();
  });

  it("exports ProgressLabel", () => {
    expect(ProgressLabel).toBeDefined();
  });

  it("exports ProgressValue", () => {
    expect(ProgressValue).toBeDefined();
  });
});
