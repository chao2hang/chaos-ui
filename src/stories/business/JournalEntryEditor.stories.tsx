import type { Meta, StoryObj } from "@storybook/react";
import { JournalEntryEditor } from "@/components/business/journal-entry-editor";
import type { JournalEntryLine, AccountOption } from "@/components/business/journal-entry-editor";

const meta = {
  title: "Business/JournalEntryEditor",
  component: JournalEntryEditor,
  tags: ["autodocs"],
} satisfies Meta<typeof JournalEntryEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

const accounts: AccountOption[] = [
  { code: "1001", name: "Cash", normalBalance: "debit" },
  { code: "1002", name: "Bank Deposit", normalBalance: "debit" },
  { code: "1122", name: "Accounts Receivable", normalBalance: "debit" },
  { code: "2001", name: "Accounts Payable", normalBalance: "credit" },
  { code: "4001", name: "Sales Revenue", normalBalance: "credit" },
  { code: "5001", name: "Cost of Goods Sold", normalBalance: "debit" },
  { code: "6601", name: "Selling Expenses", normalBalance: "debit" },
];

const balancedLines: JournalEntryLine[] = [
  { id: "1", accountCode: "1001", accountName: "Cash", debit: 5000, credit: 0, description: "Cash sale" },
  { id: "2", accountCode: "4001", accountName: "Sales Revenue", debit: 0, credit: 5000, description: "Recognize revenue" },
];

/** Balanced journal entry with debit and credit totals matching. */
export const Default: Story = {
  args: {
    lines: balancedLines,
    accounts,
    voucherNo: "JV-2026-07-001",
    currencySymbol: "¥",
  },
};

/** Unbalanced entry showing the difference. */
export const Unbalanced: Story = {
  args: {
    lines: [
      { id: "1", accountCode: "1001", accountName: "Cash", debit: 3000, credit: 0 },
      { id: "2", accountCode: "4001", accountName: "Revenue", debit: 0, credit: 2500 },
    ],
    accounts,
    voucherNo: "JV-2026-07-002",
  },
};

/** Complex multi-line entry. */
export const ComplexEntry: Story = {
  args: {
    lines: [
      { id: "1", accountCode: "1122", accountName: "Accounts Receivable", debit: 11700, credit: 0, description: "Invoice #12345" },
      { id: "2", accountCode: "4001", accountName: "Sales Revenue", debit: 0, credit: 10000, description: "Product sales" },
      { id: "3", accountCode: "2221", accountName: "VAT Payable", debit: 0, credit: 1700, description: "Output VAT 17%" },
      { id: "4", accountCode: "5001", accountName: "Cost of Goods Sold", debit: 6000, credit: 0, description: "COGS" },
      { id: "5", accountCode: "1401", accountName: "Inventory", debit: 0, credit: 6000, description: "Release inventory" },
    ],
    accounts,
    voucherNo: "JV-2026-07-003",
  },
};

/** Empty editor ready for data entry. */
export const Empty: Story = {
  args: {
    lines: [],
    accounts,
  },
};

/** Read-only view of a posted journal entry. */
export const ReadOnly: Story = {
  args: {
    lines: balancedLines,
    accounts,
    voucherNo: "JV-2026-07-004",
    readOnly: true,
  },
};

/** Using USD currency symbol. */
export const USDCurrency: Story = {
  args: {
    lines: balancedLines,
    accounts,
    voucherNo: "JV-2026-07-005",
    currencySymbol: "$",
  },
};
