import type { Meta, StoryObj } from "@storybook/react";
import { EventDetail } from "@/components/business/calendar/event-detail";

const meta: Meta<typeof EventDetail> = {
  title: "Business/EventDetail",
  component: EventDetail,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
