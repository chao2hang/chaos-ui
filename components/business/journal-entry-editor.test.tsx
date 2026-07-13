import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { JournalEntryEditor } from "./journal-entry-editor";
import type { JournalEntryLine, AccountOption } from "./journal-entry-editor";

vi.mock("@/components/ui/icons", () => ({
  PlusIcon: (p: Record<string, unknown>) => <svg data-testid="plus" {...p} />,
  Trash2Icon: (p: Record<string, unknown>) => (
    <svg data-testid="trash" {...p} />
  ),
  CheckCircle2Icon: (p: Record<string, unknown>) => (
    <svg data-testid="check" {...p} />
  ),
  AlertCircleIcon: (p: Record<string, unknown>) => (
    <svg data-testid="alert" {...p} />
  ),
  ChevronDownIcon: (p: Record<string, unknown>) => (
    <svg data-testid="chevron-down" {...p} />
  ),
}));

const accounts: AccountOption[] = [
  { code: "1001", name: "Cash", normalBalance: "debit" },
  { code: "4001", name: "Revenue", normalBalance: "credit" },
  { code: "2001", name: "Accounts Payable", normalBalance: "credit" },
];

const balancedLines: JournalEntryLine[] = [
  { id: "1", accountCode: "1001", accountName: "Cash", debit: 1000, credit: 0 },
  {
    id: "2",
    accountCode: "4001",
    accountName: "Revenue",
    debit: 0,
    credit: 1000,
  },
];

const unbalancedLines: JournalEntryLine[] = [
  { id: "1", accountCode: "1001", accountName: "Cash", debit: 1000, credit: 0 },
  {
    id: "2",
    accountCode: "4001",
    accountName: "Revenue",
    debit: 0,
    credit: 500,
  },
];

describe("JournalEntryEditor", () => {
  it("renders with data-slot", () => {
    const { container } = render(
      <JournalEntryEditor lines={balancedLines} accounts={accounts} />,
    );
    expect(
      container.querySelector('[data-slot="journal-entry-editor"]'),
    ).toBeTruthy();
  });

  it("shows balanced badge when debit equals credit", () => {
    render(<JournalEntryEditor lines={balancedLines} accounts={accounts} />);
    expect(screen.getByText("Balanced")).toBeTruthy();
  });

  it("shows unbalanced badge when debit does not equal credit", () => {
    render(<JournalEntryEditor lines={unbalancedLines} accounts={accounts} />);
    expect(screen.getByText(/Unbalanced/)).toBeTruthy();
  });

  it("displays total debit and credit", () => {
    render(<JournalEntryEditor lines={balancedLines} accounts={accounts} />);
    // Total debit and total credit are both 1,000, so the formatted string repeats.
    expect(screen.getAllByText("¥1,000.00").length).toBe(2);
  });

  it("calls onChange when add line button is clicked", () => {
    const onChange = vi.fn();
    render(
      <JournalEntryEditor
        lines={balancedLines}
        accounts={accounts}
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByText("Add Line"));
    expect(onChange).toHaveBeenCalledTimes(1);
    const newLines = onChange.mock.calls[0]![0]!;
    expect(newLines.length).toBe(3);
  });

  it("calls onChange when remove button is clicked", () => {
    const onChange = vi.fn();
    render(
      <JournalEntryEditor
        lines={balancedLines}
        accounts={accounts}
        onChange={onChange}
      />,
    );
    const removeButtons = screen.getAllByLabelText("Remove line");
    fireEvent.click(removeButtons[0]!);
    expect(onChange).toHaveBeenCalledTimes(1);
    const newLines = onChange.mock.calls[0]![0]!;
    expect(newLines.length).toBe(1);
  });

  it("entering debit clears credit on same line", () => {
    const onChange = vi.fn();
    const linesWithCredit: JournalEntryLine[] = [
      {
        id: "1",
        accountCode: "1001",
        accountName: "Cash",
        debit: 0,
        credit: 500,
      },
    ];
    render(
      <JournalEntryEditor
        lines={linesWithCredit}
        accounts={accounts}
        onChange={onChange}
      />,
    );
    const debitInputs = screen.getAllByLabelText("Debit amount");
    fireEvent.change(debitInputs[0]!, { target: { value: "300" } });
    const updated = onChange.mock.calls[0]![0]! as JournalEntryLine[];
    expect(updated[0]!.debit).toBe(300);
    expect(updated[0]!.credit).toBe(0);
  });

  it("renders empty state when no lines", () => {
    render(<JournalEntryEditor lines={[]} accounts={accounts} />);
    expect(screen.getByText(/No journal lines/)).toBeTruthy();
  });

  it("renders account dropdown when accounts are provided", () => {
    render(<JournalEntryEditor lines={balancedLines} accounts={accounts} />);
    const selects = screen.getAllByRole("combobox");
    expect(selects.length).toBe(2);
  });

  it("renders text input when accounts are not provided", () => {
    render(<JournalEntryEditor lines={balancedLines} />);
    const inputs = screen.getAllByLabelText("Account code");
    expect(inputs.length).toBe(2);
  });

  it("shows voucher number when provided", () => {
    render(
      <JournalEntryEditor lines={balancedLines} voucherNo="JV-2026-001" />,
    );
    expect(screen.getByText(/JV-2026-001/)).toBeTruthy();
  });

  it("applies custom className", () => {
    const { container } = render(
      <JournalEntryEditor lines={balancedLines} className="custom-je" />,
    );
    const el = container.querySelector(
      '[data-slot="journal-entry-editor"]',
    ) as HTMLElement;
    expect(el.className).toContain("custom-je");
  });

  it("does not show action column in read-only mode", () => {
    render(<JournalEntryEditor lines={balancedLines} readOnly />);
    expect(screen.queryByText("Add Line")).toBeNull();
    expect(screen.queryByLabelText("Remove line")).toBeNull();
  });
});
