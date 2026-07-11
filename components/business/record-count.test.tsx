import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RecordCount, totalDescription } from "./record-count";

describe("totalDescription", () => {
  it("defaults unit to 条记录", () => {
    expect(totalDescription(12)).toBe("共 12 条记录");
  });

  it("accepts custom unit", () => {
    expect(totalDescription(3, "人")).toBe("共 3 人");
  });
});

describe("RecordCount", () => {
  it("renders default description", () => {
    render(<RecordCount total={8} />);
    expect(screen.getByText("共 8 条记录")).toBeDefined();
  });

  it("supports bare mode", () => {
    render(<RecordCount total={5} unit="个经销商" bare />);
    expect(screen.getByText("5 个经销商")).toBeDefined();
  });
});
