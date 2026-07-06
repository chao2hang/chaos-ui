import type { Meta, StoryObj } from "@storybook/react";
import { CreativePreview } from "@/components/business/creative-preview";

const creative = {
  title: "Stock the pantry before the weekend rush",
  eyebrow: "Limited time",
  body: "Bundle fresh staples with chef-picked sauces and get priority delivery windows this Friday.",
  cta: "Shop bundles",
  from: "Chaos Foods",
};

const meta = {
  title: "Business/CreativePreview",
  component: CreativePreview,
  tags: ["autodocs", "a11y"],
  args: {
    mode: "email",
    viewport: "desktop",
    ...creative,
  },
  argTypes: {
    mode: {
      control: { type: "select" },
      options: ["email", "push", "social", "ad"],
    },
    viewport: {
      control: { type: "select" },
      options: ["desktop", "mobile"],
    },
  },
} satisfies Meta<typeof CreativePreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DesktopAndMobile: Story = {
  render: () => (
    <div className="grid gap-4 xl:grid-cols-2">
      <CreativePreview mode="email" viewport="desktop" {...creative} />
      <CreativePreview mode="push" viewport="mobile" {...creative} />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="grid gap-4 xl:grid-cols-2">
      <CreativePreview mode="social" viewport="desktop" {...creative} />
      <CreativePreview mode="ad" viewport="mobile" {...creative} />
    </div>
  ),
};
