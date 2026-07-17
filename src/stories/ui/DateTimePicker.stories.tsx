import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import {
  PeriodPicker,
  type PeriodPickerProps,
} from "@/components/ui/period-picker";

const meta: Meta<typeof DateTimePicker> = {
  title: "UI/DateTimePicker",
  component: DateTimePicker,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "日期时间选择器（对齐 Ecology WeaDatePicker + WeaTimePicker）：组合 Calendar + 时分步进。PeriodPicker 对齐 WeaPeriod（年/季/月）。",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DateTimePicker>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <div className="space-y-4">
        <DateTimePicker
          value={value}
          onChange={setValue}
          placeholder="选择日期时间"
        />
        <pre className="text-muted-foreground text-xs">
          {value ? value.toISOString() : "undefined"}
        </pre>
      </div>
    );
  },
};

export const ShowTime: Story = {
  render: () => {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <DateTimePicker
        value={value}
        onChange={setValue}
        showTime
        placeholder="选择日期和时间"
      />
    );
  },
};

export const StringValue: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);
    return (
      <div className="space-y-4">
        <DateTimePicker
          valueAsString
          value={value}
          onChange={setValue}
          showTime
          placeholder="字符串模式"
        />
        <pre className="text-muted-foreground text-xs">{value || "empty"}</pre>
      </div>
    );
  },
};

export const SmallSize: Story = {
  render: () => {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <DateTimePicker
        size="sm"
        value={value}
        onChange={setValue}
        placeholder="小尺寸"
      />
    );
  },
};

const periodMeta: Meta<typeof PeriodPicker> = {
  title: "UI/PeriodPicker",
  component: PeriodPicker,
  tags: ["autodocs"],
};
void periodMeta;

export const PeriodDefault: Story = {
  render: () => {
    const [value, setValue] = useState<PeriodPickerProps["value"]>();
    return (
      <div className="space-y-4">
        <PeriodPicker
          {...(value ? { value } : {})}
          onChange={(_range, v) => setValue(v)}
        />
        <pre className="text-muted-foreground text-xs">
          {value ? JSON.stringify(value) : "undefined"}
        </pre>
      </div>
    );
  },
};

export const PeriodQuarter: Story = {
  render: () => {
    const [value, setValue] = useState<PeriodPickerProps["value"]>();
    return (
      <PeriodPicker
        granularity="quarter"
        {...(value ? { value } : {})}
        onChange={(_range, v) => setValue(v)}
      />
    );
  },
};
