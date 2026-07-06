import type { Meta, StoryObj } from "@storybook/react";
import { MobileInput } from "@/components/mobile/mobile-input";
import { MobileTextarea } from "@/components/mobile/mobile-textarea";
import { MobileSelect } from "@/components/mobile/mobile-select";

const meta = {
  title: "Mobile/MobileInput",
  component: MobileInput,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof MobileInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: "Mobile input" },
};

export const WithError: Story = {
  args: { placeholder: "With error", "aria-invalid": true },
};

export const Textarea: Story = {
  render: () => (
    <div className="max-w-sm p-4">
      <MobileTextarea placeholder="Mobile textarea" />
    </div>
  ),
};

export const Select: Story = {
  render: () => (
    <div className="max-w-sm p-4">
      <MobileSelect
        options={[
          { value: "1", label: "Option 1" },
          { value: "2", label: "Option 2" },
          { value: "3", label: "Option 3" },
        ]}
        placeholder="Select option"
      />
    </div>
  ),
};

export const AllControls: Story = {
  render: () => (
    <div className="max-w-sm space-y-3 p-4">
      <MobileInput placeholder="Mobile input" />
      <MobileInput placeholder="With error" aria-invalid />
      <MobileTextarea placeholder="Mobile textarea" />
      <MobileSelect
        options={[
          { value: "1", label: "Option 1" },
          { value: "2", label: "Option 2" },
        ]}
        placeholder="Select option"
      />
    </div>
  ),
};
