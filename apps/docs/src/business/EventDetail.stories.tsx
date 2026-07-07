import type { Meta, StoryObj } from "@storybook/react";
import { EventDetail } from "@/components/business/calendar/event-detail";

const meta = {
  title: "Business/EventDetail",
  component: EventDetail,
  tags: ["autodocs"],
} satisfies Meta<typeof EventDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
