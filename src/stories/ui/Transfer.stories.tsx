import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Transfer, type TransferItem } from "@/components/ui/transfer";

const meta: Meta<typeof Transfer> = {
  title: "Components/Transfer",
  component: Transfer,
  tags: ["autodocs", "a11y"],
};

export default meta;

type Story = StoryObj<typeof Transfer>;

const sampleData: TransferItem[] = [
  { key: "1", label: "Option 1" },
  { key: "2", label: "Option 2", description: "With description" },
  { key: "3", label: "Option 3" },
  { key: "4", label: "Option 4", disabled: true },
  { key: "5", label: "Option 5" },
  { key: "6", label: "Option 6" },
];

export const Default: Story = {
  render: () => {
    const [targetKeys, setTargetKeys] = useState<string[]>(["1", "3"]);
    return (
      <Transfer
        dataSource={sampleData}
        targetKeys={targetKeys}
        onChange={setTargetKeys}
        titles={["Source", "Target"]}
      />
    );
  },
};

export const OneWay: Story = {
  render: () => {
    const [targetKeys, setTargetKeys] = useState<string[]>([]);
    return (
      <Transfer
        dataSource={sampleData}
        targetKeys={targetKeys}
        onChange={setTargetKeys}
        titles={["Available", "Selected"]}
        oneWay
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    dataSource: sampleData,
    targetKeys: ["1", "3"],
    titles: ["Source", "Target"],
    disabled: true,
  },
};

export const NoSearch: Story = {
  render: () => {
    const [targetKeys, setTargetKeys] = useState<string[]>([]);
    return (
      <Transfer
        dataSource={[
          { key: "a", label: "Alpha" },
          { key: "b", label: "Beta" },
          { key: "c", label: "Gamma" },
        ]}
        targetKeys={targetKeys}
        onChange={setTargetKeys}
        titles={["Available", "Selected"]}
        searchable={false}
      />
    );
  },
};

export const CustomRender: Story = {
  render: () => {
    const [targetKeys, setTargetKeys] = useState<string[]>([]);
    return (
      <Transfer
        dataSource={sampleData}
        targetKeys={targetKeys}
        onChange={setTargetKeys}
        titles={["Source", "Target"]}
        render={(item) => (
          <div>
            <span className="font-medium">{item.label}</span>
            {item.description && (
              <span className="text-muted-foreground ml-2 text-xs">
                {item.description}
              </span>
            )}
          </div>
        )}
      />
    );
  },
};
