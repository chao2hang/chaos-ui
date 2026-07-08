import type { Meta, StoryObj } from "@storybook/react";
import { ColorPicker } from "@/components/ui/color-picker";
import { useState } from "react";

const meta: Meta<typeof ColorPicker> = {
  title: "Components/ColorPicker",
  component: ColorPicker,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [color, setColor] = useState("#3b82f6");
    return <ColorPicker value={color} onChange={setColor} />;
  },
};

export const WithPreview: Story = {
  render: () => {
    const [color, setColor] = useState("#10b981");
    return (
      <div className="space-y-4">
        <ColorPicker value={color} onChange={setColor} />
        <div className="flex items-center gap-2">
          <div
            className="h-12 w-12 rounded border"
            style={{ backgroundColor: color }}
          />
          <code className="text-sm">{color}</code>
        </div>
      </div>
    );
  },
};
