import { describe, it, expect } from "vitest";
import {
  Timeline,
  TimelineItem,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
  TimelineTime,
  timelineDotVariants,
} from "./timeline";

describe("timeline", () => {
  it("exports Timeline", () => {
    expect(Timeline).toBeDefined();
  });

  it("exports TimelineItem", () => {
    expect(TimelineItem).toBeDefined();
  });

  it("exports TimelineDot", () => {
    expect(TimelineDot).toBeDefined();
  });

  it("exports TimelineConnector", () => {
    expect(TimelineConnector).toBeDefined();
  });

  it("exports TimelineContent", () => {
    expect(TimelineContent).toBeDefined();
  });

  it("exports TimelineTitle", () => {
    expect(TimelineTitle).toBeDefined();
  });

  it("exports TimelineDescription", () => {
    expect(TimelineDescription).toBeDefined();
  });

  it("exports TimelineTime", () => {
    expect(TimelineTime).toBeDefined();
  });

  it("exports timelineDotVariants", () => {
    expect(timelineDotVariants).toBeDefined();
  });
});
