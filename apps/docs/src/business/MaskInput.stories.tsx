import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { MaskInput } from "@/components/business/mask-input";

const meta: Meta<typeof MaskInput> = {
  title: "Business/MaskInput",
  component: MaskInput,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    mask: "(999) 999-9999",
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

const MaskInputWithState = (args: any) => {
  const [value, setValue] = useState(args.value ?? "");
  return <MaskInput {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: MaskInputWithState,
};

export const SSNMask: Story = {
  args: {
    mask: "999-99-9999",
    placeholder: "SSN",
  },
  render: MaskInputWithState,
};

export const ZipCodeMask: Story = {
  args: {
    mask: "99999",
    placeholder: "ZIP Code",
  },
  render: MaskInputWithState,
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: MaskInputWithState,
};

export const Dark: Story = {
  args: {
    mask: "(999) 999-9999",
    value: "(123) 456-7890",
  },
  parameters: { backgrounds: { default: "dark" } },
  render: MaskInputWithState,
};
