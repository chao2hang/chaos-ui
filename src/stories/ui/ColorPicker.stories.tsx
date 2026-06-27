import type { Meta, StoryObj } from "@storybook/react";
import { ColorPicker } from "@/components/ui/color-picker";
import { useState } from "react";

const meta = {
  title: "Components/ColorPicker",
  component: ColorPicker,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

function DefaultColorPicker() {
  const [color, setColor] = useState("#3b82f6");
  return <ColorPicker value={color} onChange={setColor} />;
}

function ColorPickerWithPreview() {
  const [color, setColor] = useState("#10b981");
  return (
    <div className="space-y-4">
      <ColorPicker value={color} onChange={setColor} />
      <div className="flex items-center gap-2">
        <div
          className="w-12 h-12 rounded border"
          style={{ backgroundColor: color }}
        />
        <code className="text-sm">{color}</code>
      </div>
    </div>
  );
}

export const Default: Story = {
  render: () => <DefaultColorPicker />,
};

export const WithPreview: Story = {
  render: () => <ColorPickerWithPreview />,
};
