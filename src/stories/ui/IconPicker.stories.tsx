import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { IconPicker } from "@/components/ui/icon-picker";
import type { IconItem } from "@/components/ui/icon-picker";
import { RocketIcon, ZapIcon, FlameIcon, SunIcon, MoonIcon, CloudIcon } from "lucide-react";

const meta = {
  title: "Components/IconPicker",
  component: IconPicker,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    title: { control: "text" },
    placeholder: { control: "text" },
    maxRecent: { control: "number" },
  },
} satisfies Meta<typeof IconPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function DefaultIconPicker() {
  const [value, setValue] = useState<string | undefined>(undefined);
  return <IconPicker value={value!} onChange={setValue} />;
}

function WithValuePicker() {
  const [value, setValue] = useState("Settings");
  return <IconPicker value={value!} onChange={setValue} />;
}

const customIcons: IconItem[] = [
  { name: "Rocket", icon: RocketIcon, category: "Launch", keywords: ["launch", "deploy", "ship"] },
  { name: "Zap", icon: ZapIcon, category: "Energy", keywords: ["lightning", "fast", "power"] },
  { name: "Flame", icon: FlameIcon, category: "Energy", keywords: ["fire", "hot", "trending"] },
  { name: "Sun", icon: SunIcon, category: "Weather", keywords: ["day", "light", "bright"] },
  { name: "Moon", icon: MoonIcon, category: "Weather", keywords: ["night", "dark", "theme"] },
  { name: "Cloud", icon: CloudIcon, category: "Weather", keywords: ["weather", "overcast"] },
];

function CustomIconsPicker() {
  const [value, setValue] = useState<string | undefined>(undefined);
  return <IconPicker value={value!} onChange={setValue} icons={customIcons} title="Pick Custom Icon" />;
}

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/** Default icon picker with the full curated lucide icon set. */
export const Default: Story = {
  render: () => <DefaultIconPicker />,
};

/** Icon picker with a pre-selected value. */
export const WithValue: Story = {
  render: () => <WithValuePicker />,
};

/** Icon picker using a small custom icon set instead of the defaults. */
export const CustomIcons: Story = {
  render: () => <CustomIconsPicker />,
};

/** Icon picker rendered on a dark background. */
export const DarkMode: Story = {
  render: () => (
    <div className="dark bg-background p-8 rounded-lg">
      <DefaultIconPicker />
    </div>
  ),
};

/** Disabled icon picker -- the trigger cannot be interacted with. */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
