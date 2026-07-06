import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SegmentedControl } from "@/components/ui/segmented-control";

/**
 * SegmentedControl is a generic `<T extends string>`. The Storybook typing
 * uses a concrete literal union to keep `args` type-safe; individual stories
 * override the option set as needed.
 */
type View = "list" | "grid" | "board";
type Density = "compact" | "cozy" | "spacious";

const viewOptions = [
  { value: "list" as const, label: "List" },
  { value: "grid" as const, label: "Grid" },
  { value: "board" as const, label: "Board" },
];

const noop = (value: View) => {
  void value;
};

const meta = {
  title: "Components/SegmentedControl",
  component: SegmentedControl<View>,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { options: viewOptions },
} satisfies Meta<typeof SegmentedControl<View>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: viewOptions,
    defaultValue: "list",
    onChange: noop,
  },
};

export const Small: Story = {
  args: {
    options: viewOptions,
    defaultValue: "grid",
    size: "sm",
    onChange: noop,
  },
};

export const Large: Story = {
  args: {
    options: viewOptions,
    defaultValue: "board",
    size: "lg",
    onChange: noop,
  },
};

export const WithDisabledOption: Story = {
  args: {
    options: [
      { value: "list" as const, label: "List" },
      { value: "grid" as const, label: "Grid" },
      { value: "board" as const, label: "Board", disabled: true },
    ],
    defaultValue: "list",
    onChange: noop,
  },
};

export const Vertical: Story = {
  args: {
    options: viewOptions,
    defaultValue: "list",
    orientation: "vertical",
    onChange: noop,
  },
};

/** Controlled example with a different option set. */
export const Controlled: Story = {
  render: () => {
    const Controlled = () => {
      const [value, setValue] = React.useState<Density>("cozy");
      const options = [
        { value: "compact" as const, label: "Compact" },
        { value: "cozy" as const, label: "Cozy" },
        { value: "spacious" as const, label: "Spacious" },
      ];
      return (
        <div className="flex flex-col gap-3">
          <SegmentedControl<Density>
            options={options}
            value={value}
            onChange={setValue}
          />
          <p className="text-muted-foreground text-xs">
            Selected: <span className="font-medium">{value}</span>
          </p>
        </div>
      );
    };
    return <Controlled />;
  },
};
