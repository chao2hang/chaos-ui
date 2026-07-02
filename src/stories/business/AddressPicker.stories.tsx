import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AddressPicker } from "@/components/business/address-picker";
import type { AddressOption } from "@/components/business/address-picker";

function ControlledExample(args: React.ComponentProps<typeof AddressPicker>) {
  const [value, setValue] = useState<string[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  return (
    <div className="max-w-md space-y-3">
      <AddressPicker
        {...args}
        value={value}
        onChange={(codes, lbls) => {
          setValue(codes);
          setLabels(lbls);
        }}
      />
      <p className="text-sm text-muted-foreground">
        Selected: {labels.join(" / ") || "none"}
      </p>
    </div>
  );
}

function FourLevelExample(args: React.ComponentProps<typeof AddressPicker>) {
  const [value, setValue] = useState<string[]>([]);

  const handleLoad = async (parentCode: string): Promise<AddressOption[]> => {
    // Simulate async fetch for street-level data
    await new Promise((r) => setTimeout(r, 800));
    return [
      { code: parentCode + "-S1", name: "\u671b\u4eac\u8857\u9053" },
      { code: parentCode + "-S2", name: "\u9152\u4ed9\u6865\u8857\u9053" },
      { code: parentCode + "-S3", name: "\u592a\u9633\u5bab\u8857\u9053" },
    ];
  };

  return (
    <div className="max-w-md space-y-3">
      <AddressPicker
        {...args}
        value={value}
        level={4}
        onLoad={handleLoad}
        onChange={(codes) => setValue(codes)}
      />
      <p className="text-sm text-muted-foreground">
        Codes: {value.join(" > ") || "none"}
      </p>
    </div>
  );
}

const meta = {
  title: "Business/AddressPicker",
  component: AddressPicker,
  tags: ["autodocs"],
} satisfies Meta<typeof AddressPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default 3-level picker (province / city / district) */
export const Default: Story = {
  render: (args) => <ControlledExample {...args} />,
};

/** 4-level picker with lazy-loaded street data */
export const FourLevel: Story = {
  render: (args) => <FourLevelExample {...args} />,
};

/** Pre-filled value */
export const WithValue: Story = {
  args: {
    value: ["330000", "330100", "330106"],
    clearable: true,
  },
};

/** Disabled state */
export const Disabled: Story = {
  args: {
    disabled: true,
    value: ["330000", "330100", "330106"],
    placeholder: "Pick address",
  },
};

/** Dark mode */
export const DarkMode: Story = {
  render: (args) => <ControlledExample {...args} />,
  parameters: {
    themes: { themeOverride: "dark" },
  },
};
