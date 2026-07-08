import type { Meta, StoryObj } from "@storybook/react";
import { BrowseInput } from "@/components/ui/browse-input";
import { useState } from "react";

const meta: Meta<typeof BrowseInput> = {
  title: "Components/BrowseInput",
  component: BrowseInput,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: "Select item..." },
};

export const WithValue: Story = {
  args: { defaultValue: "Selected item" },
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Disabled" },
};

export const ReadOnly: Story = {
  args: { readOnly: true, defaultValue: "Read only" },
};

export const Small: Story = {
  args: { placeholder: "Small size" },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div className="max-w-sm space-y-2">
        <BrowseInput
          value={value}
          onChange={setValue}
          onBrowse={() => alert("Browse clicked")}
          placeholder="Click browse or type..."
        />
        <p className="text-muted-foreground text-sm">
          Value: {value || "(empty)"}
        </p>
      </div>
    );
  },
};
