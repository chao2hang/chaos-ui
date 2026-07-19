import { describe, expect, it } from "vitest";
import {
  INITIAL_DEMO_ROWS,
  addDemoRow,
  confirmDemoRow,
  deleteDemoRow,
  filterDemoRows,
  formatMoney,
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
    const rows = [
      { ...INITIAL_DEMO_ROWS[0]!, status: "draft" as const },
      { ...INITIAL_DEMO_ROWS[1]!, status: "pending" as const },
    ];
    expect(
      filterDemoRows(rows, { status: "draft" }).every(
        (r) => r.status === "draft",
      ),
    ).toBe(true);
  });

  it("filters reconciliation rows by period and distributor", () => {
    const result = filterDemoRows(INITIAL_DEMO_ROWS, {
      period: "2026-06",
      distributor: "华东",
    });
    expect(result).toHaveLength(1);
    expect(result[0]?.period).toBe("2026-06");
    expect(result[0]?.distributor).toContain("华东");
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

describe("confirmDemoRow", () => {
  it("marks a pending row as confirmed without mutating the source", () => {
    const source = INITIAL_DEMO_ROWS[0]!;
    const next = confirmDemoRow(INITIAL_DEMO_ROWS, source.id, "2026-07-19");
    expect(next).not.toBe(INITIAL_DEMO_ROWS);
    expect(next.find((row) => row.id === source.id)?.status).toBe("confirmed");
    expect(next.find((row) => row.id === source.id)?.signedAt).toBe(
      "2026-07-19",
    );
    expect(source.status).toBe("pending");
  });
});

describe("formatMoney", () => {
  it("formats CNY amounts with two decimal places", () => {
    expect(formatMoney(1234.5)).toBe("¥1,234.50");
  });
});
