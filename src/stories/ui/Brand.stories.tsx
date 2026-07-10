import type { Meta, StoryObj } from "@storybook/react";
import { AppLogo, BrandBadge } from "@/components/ui/brand";

const meta = {
  title: "Components/Brand",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AppLogoDefault: Story = {
  name: "AppLogo — Default",
  render: () => <AppLogo text="C" gradient="brand" label="Chaos UI" />,
};

export const AppLogoGradients: Story = {
  name: "AppLogo — Gradient Presets",
  render: () => (
    <div className="flex flex-wrap gap-6">
      {(
        [
          "brand",
          "teal",
          "blue",
          "purple",
          "sunset",
          "forest",
          "ocean",
          "mono",
        ] as const
      ).map((g) => (
        <div key={g} className="flex flex-col items-center gap-2">
          <AppLogo text="C" gradient={g} size={48} />
          <span className="text-muted-foreground text-xs">{g}</span>
        </div>
      ))}
    </div>
  ),
};

export const AppLogoCustomGradient: Story = {
  name: "AppLogo — Custom CSS Gradient",
  render: () => (
    <AppLogo
      text="✦"
      gradient="linear-gradient(135deg, #0ea5e9, #6366f1)"
      size={56}
      label="Custom Gradient"
    />
  ),
};

export const AppLogoSizes: Story = {
  name: "AppLogo — Sizes",
  render: () => (
    <div className="flex items-end gap-4">
      {[32, 40, 48, 64, 80].map((s) => (
        <AppLogo key={s} text="C" size={s} gradient="teal" />
      ))}
    </div>
  ),
};

export const AppLogoLabelBottom: Story = {
  name: "AppLogo — Label Below",
  render: () => (
    <AppLogo
      text="C"
      gradient="blue"
      label="Login Portal"
      labelPosition="bottom"
    />
  ),
};

export const BrandBadgeDefault: Story = {
  name: "BrandBadge — Default",
  render: () => <BrandBadge text="C" gradient="teal" label="Chaos" />,
};

export const BrandBadgeSizes: Story = {
  name: "BrandBadge — All Sizes",
  render: () => (
    <div className="flex items-center gap-6">
      {(["xs", "sm", "md", "lg"] as const).map((s) => (
        <BrandBadge key={s} text="C" size={s} gradient="purple" label={s} />
      ))}
    </div>
  ),
};

export const BrandBadgeShapes: Story = {
  name: "BrandBadge — Shapes",
  render: () => (
    <div className="flex items-center gap-6">
      <BrandBadge text="C" variant="square" gradient="teal" label="square" />
      <BrandBadge text="C" variant="pill" gradient="blue" label="pill" />
      <BrandBadge text="C" variant="circle" gradient="sunset" label="circle" />
    </div>
  ),
};

export const BrandBadgeGradients: Story = {
  name: "BrandBadge — All Gradients",
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(
        [
          "brand",
          "teal",
          "blue",
          "purple",
          "sunset",
          "forest",
          "ocean",
          "mono",
        ] as const
      ).map((g) => (
        <BrandBadge key={g} text="C" gradient={g} label={g} />
      ))}
    </div>
  ),
};
