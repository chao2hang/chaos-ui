import { describe, expect, it } from "vitest";
import {
  INITIAL_DEMO_ROWS,
  addDemoRow,
  deleteDemoRow,
  filterDemoRows,
} from "./mock-data";

describe("filterDemoRows", () => {
  it("filters by name substring (case-insensitive)", () => {
    const rows = [
      {
        id: "1",
        name: "Alpha Plan",
        status: "active" as const,
        updatedAt: "2026-07-01",
      },
      {
        id: "2",
        name: "Beta",
        status: "draft" as const,
        updatedAt: "2026-07-02",
      },
    ];
    expect(filterDemoRows(rows, { name: "alp" })).toHaveLength(1);
    expect(filterDemoRows(rows, { name: "alp" })[0]?.id).toBe("1");
  });

  it("filters by status when provided", () => {
    expect(
      filterDemoRows(INITIAL_DEMO_ROWS, { status: "draft" }).every(
        (r) => r.status === "draft",
      ),
    ).toBe(true);
  });
});

describe("deleteDemoRow", () => {
  it("removes the matching id", () => {
    const next = deleteDemoRow(INITIAL_DEMO_ROWS, INITIAL_DEMO_ROWS[0]!.id);
    expect(next).toHaveLength(INITIAL_DEMO_ROWS.length - 1);
    expect(next.find((r) => r.id === INITIAL_DEMO_ROWS[0]!.id)).toBeUndefined();
  });
});

describe("addDemoRow", () => {
  it("prepends a new active row with generated id", () => {
    const next = addDemoRow(INITIAL_DEMO_ROWS, { name: "New Item" });
    expect(next).toHaveLength(INITIAL_DEMO_ROWS.length + 1);
    expect(next[0]?.name).toBe("New Item");
    expect(next[0]?.status).toBe("active");
    expect(next[0]?.id).toBeTruthy();
  });
});
