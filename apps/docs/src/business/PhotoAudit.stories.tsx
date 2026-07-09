import type { Meta, StoryObj } from "@storybook/react";
import { PhotoAudit } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof PhotoAudit> = {
  title: "Business/PhotoAudit",
  component: PhotoAudit,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
