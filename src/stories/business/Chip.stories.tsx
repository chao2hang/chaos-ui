import type { Meta, StoryObj } from "@storybook/react";
import { FilterIcon, TagIcon } from "@/components/ui/icons";
import { Chip } from "@/components/business/chip";

const meta = {
  title: "Business/Chip",
  component: Chip,
  tags: ["autodocs", "a11y"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "default",
        "primary",
        "success",
        "warning",
        "destructive",
        "info",
        "outline",
      ],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "default", "lg"],
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Lifecycle",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Chip>Default</Chip>
      <Chip variant="primary">Primary</Chip>
      <Chip variant="success">Success</Chip>
      <Chip variant="warning">Warning</Chip>
      <Chip variant="destructive">Blocked</Chip>
      <Chip variant="info">Info</Chip>
      <Chip variant="outline">Outline</Chip>
    </div>
  ),
};

export const Removable: Story = {
  args: {
    children: "Region: APAC",
    icon: <FilterIcon className="size-3" />,
    removable: true,
    onRemove: () => undefined,
  },
};

export const FilterSummary: Story = {
  render: () => (
    <div className="flex max-w-lg flex-wrap gap-2 rounded-lg border p-4">
      <Chip icon={<TagIcon className="size-3" />} variant="primary">
        Active campaigns
      </Chip>
      <Chip removable onRemove={() => undefined}>
        Owner: Growth
      </Chip>
      <Chip removable onRemove={() => undefined}>
        Budget above $50k
      </Chip>
      <Chip variant="outline">3 saved filters</Chip>
    </div>
  ),
};
