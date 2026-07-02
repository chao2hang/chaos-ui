import type { Meta, StoryObj } from "@storybook/react";
import { MultiCurrencyInput } from "@/components/business/multi-currency-input";

const meta = {
  title: "Business/MultiCurrencyInput",
  component: MultiCurrencyInput,
  tags: ["autodocs"],
} satisfies Meta<typeof MultiCurrencyInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const rates = {
  USD: 7.25,
  EUR: 7.85,
  GBP: 9.2,
  JPY: 0.045,
  HKD: 0.93,
  SGD: 5.35,
  AUD: 4.72,
};

/** Default multi-currency input with USD to CNY conversion. */
export const Default: Story = {
  args: {
    value: 1500,
    currency: "USD",
    baseCurrency: "CNY",
    rates,
  },
};

/** EUR conversion with editable rate. */
export const EURConversion: Story = {
  args: {
    value: 800,
    currency: "EUR",
    baseCurrency: "CNY",
    rates,
  },
};

/** JPY with large amount and small rate. */
export const JPYConversion: Story = {
  args: {
    value: 100000,
    currency: "JPY",
    baseCurrency: "CNY",
    rates,
  },
};

/** Same currency (no conversion needed). */
export const SameCurrency: Story = {
  args: {
    value: 5000,
    currency: "CNY",
    baseCurrency: "CNY",
    rates,
  },
};

/** Read-only mode. */
export const ReadOnly: Story = {
  args: {
    value: 2500,
    currency: "GBP",
    baseCurrency: "CNY",
    rates,
    readOnly: true,
  },
};

/** No rate override (locked rate). */
export const LockedRate: Story = {
  args: {
    value: 1200,
    currency: "USD",
    baseCurrency: "CNY",
    rates,
    allowRateOverride: false,
  },
};
