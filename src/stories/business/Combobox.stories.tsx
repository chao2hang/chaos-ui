import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Combobox, type ComboboxOption } from "@/components/ui/combobox";

const assigneeOptions: ComboboxOption[] = [
  {
    value: "lin",
    label: "Lin Chen",
    description: "Campaign owner",
    keywords: ["owner", "campaign"],
    group: "Marketing",
  },
  {
    value: "maya",
    label: "Maya Singh",
    description: "Lifecycle strategist",
    keywords: ["email", "retention"],
    group: "Marketing",
  },
  {
    value: "noah",
    label: "Noah Park",
    description: "Growth analyst",
    keywords: ["analytics", "growth"],
    group: "Data",
  },
  {
    value: "elena",
    label: "Elena Rossi",
    description: "Brand designer",
    keywords: ["creative", "brand"],
    group: "Creative",
  },
  {
    value: "archived",
    label: "Archived owner",
    description: "Disabled option",
    disabled: true,
    group: "Archived",
  },
];

const meta = {
  title: "Business/Combobox",
  component: Combobox,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;
type ComboboxProps = React.ComponentProps<typeof Combobox>;

function ControlledCombobox(args: ComboboxProps) {
  const [value, setValue] = React.useState(args.value);

  return (
    <div className="flex max-w-sm flex-col gap-3">
      <Combobox {...args} value={(value ?? "") as string} onChange={setValue} />
      <p className="text-muted-foreground text-xs">
        Selected value: <span className="font-mono">{value ?? "none"}</span>
      </p>
    </div>
  );
}

export const Default: Story = {
  args: {
    options: assigneeOptions,
    value: "maya",
    placeholder: "Select an assignee",
    searchPlaceholder: "Search people...",
  },
  render: (args) => <ControlledCombobox {...args} />,
};

export const CustomOption: Story = {
  args: {
    options: assigneeOptions,
    value: "noah",
    placeholder: "Select an owner",
    renderOption: (option) => (
      <span className="flex flex-col">
        <span>{option.label}</span>
        {option.description && (
          <span className="text-muted-foreground text-xs">
            {option.description}
          </span>
        )}
      </span>
    ),
  },
  render: (args) => <ControlledCombobox {...args} />,
};

export const NotSearchable: Story = {
  args: {
    options: assigneeOptions,
    value: "lin",
    searchable: false,
    clearable: false,
  },
  render: (args) => <ControlledCombobox {...args} />,
};

export const Disabled: Story = {
  args: {
    options: assigneeOptions,
    value: "elena",
    disabled: true,
  },
};

export const Empty: Story = {
  args: {
    options: [],
    placeholder: "No owners available",
    emptyText: "No matching owners",
  },
  render: (args) => <ControlledCombobox {...args} />,
};
