import type { Meta, StoryObj } from "@storybook/react";
import { MobileCard } from "@/components/mobile/mobile-card";
import { MobileButton } from "@/components/mobile/mobile-button";

const meta = {
  title: "Mobile/MobileCard",
  component: MobileCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof MobileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Card title",
    description: "Card description",
    children: <p className="text-sm text-muted-foreground">Card body content.</p>,
  },
};

export const WithActions: Story = {
  args: {
    title: "Confirm action",
    description: "Are you sure?",
    children: <p className="text-sm text-muted-foreground">This action cannot be undone.</p>,
    actions: (
      <>
        <MobileButton variant="outline">Cancel</MobileButton>
        <MobileButton>Confirm</MobileButton>
      </>
    ),
  },
};

export const BodyOnly: Story = {
  args: {
    children: (
      <div className="space-y-2">
        <p className="text-sm font-medium">Compact card</p>
        <p className="text-xs text-muted-foreground">
          No title or description — just body content.
        </p>
      </div>
    ),
  },
};
