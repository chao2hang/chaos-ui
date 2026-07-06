import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Transfer, type TransferItem } from "@/components/business/transfer";
import { Badge } from "@/components/ui/badge";

const audienceFields: TransferItem[] = [
  { key: "name", label: "Name", description: "Customer display name" },
  { key: "email", label: "Email", description: "Primary contact address" },
  { key: "phone", label: "Phone", description: "SMS capable number" },
  {
    key: "lifetimeValue",
    label: "Lifetime value",
    description: "Total historical spend",
  },
  {
    key: "lastOrder",
    label: "Last order date",
    description: "Most recent purchase",
  },
  {
    key: "consent",
    label: "Marketing consent",
    description: "Required compliance field",
    disabled: true,
  },
  { key: "region", label: "Region", description: "Shipping market" },
];

const meta = {
  title: "Business/Transfer",
  component: Transfer,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof Transfer>;

export default meta;
type Story = StoryObj<typeof meta>;
type TransferProps = React.ComponentProps<typeof Transfer>;

function ControlledTransfer(args: TransferProps) {
  const [targetKeys, setTargetKeys] = React.useState(args.targetKeys ?? []);

  return (
    <div className="flex max-w-3xl flex-col gap-3">
      <Transfer {...args} targetKeys={targetKeys} onChange={setTargetKeys} />
      <p className="text-muted-foreground text-xs">
        Target keys:{" "}
        <span className="font-mono">
          {targetKeys.length ? targetKeys.join(", ") : "none"}
        </span>
      </p>
    </div>
  );
}

export const Default: Story = {
  args: {
    dataSource: audienceFields,
    targetKeys: ["email", "lifetimeValue"],
    titles: ["Available fields", "Export fields"],
  },
  render: (args) => <ControlledTransfer {...args} />,
};

export const OneWay: Story = {
  args: {
    dataSource: audienceFields,
    targetKeys: ["email"],
    titles: ["Available", "Selected"],
    oneWay: true,
  },
  render: (args) => <ControlledTransfer {...args} />,
};

export const CustomRender: Story = {
  args: {
    dataSource: audienceFields,
    targetKeys: ["email", "region"],
    titles: ["Source attributes", "Audience payload"],
    render: (item) => (
      <span className="flex min-w-0 items-center justify-between gap-2">
        <span className="min-w-0">
          <span className="block truncate">{item.label}</span>
          {item.description && (
            <span className="text-muted-foreground block truncate text-xs">
              {item.description}
            </span>
          )}
        </span>
        {item.disabled && <Badge variant="outline">Locked</Badge>}
      </span>
    ),
  },
  render: (args) => <ControlledTransfer {...args} />,
};

export const Disabled: Story = {
  args: {
    dataSource: audienceFields,
    targetKeys: ["email", "phone"],
    titles: ["Available", "Selected"],
    disabled: true,
  },
};
