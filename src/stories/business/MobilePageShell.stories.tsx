import type { Meta, StoryObj } from "@storybook/react";
import { MobilePageShell } from "@/components/business/mobile-page-shell";

const meta = {
  title: "Business/Mobile/MobilePageShell",
  component: MobilePageShell,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: { onBack: () => {} },
} satisfies Meta<typeof MobilePageShell>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = () => {};

const sampleBody = (
  <div className="text-muted-foreground p-4 text-sm">
    <p className="mb-3">Page body content goes here.</p>
    <p>
      This shell provides a mobile-app-style header with optional back button
      and a scrollable content area.
    </p>
  </div>
);

export const TitleOnly: Story = {
  args: {
    title: "Account",
    children: sampleBody,
  },
};

export const WithBack: Story = {
  args: {
    title: "Edit profile",
    onBack: noop,
    children: sampleBody,
  },
};

export const Bare: Story = {
  args: { children: sampleBody },
};
