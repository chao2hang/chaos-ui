import type { Meta, StoryObj } from "@storybook/react";
import { Forbidden } from "@/components/business/forbidden";

const meta = {
  title: "Business/Nav/Forbidden",
  component: Forbidden,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Forbidden>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomMessage: Story = {
  args: {
    title: "Access denied",
    description: "You do not have permission to view this page. Contact your admin.",
    code: "REPORTS_VIEW",
  },
};

export const WithRequest: Story = {
  args: {
    title: "Requires approval",
    description: "Request access to proceed.",
    onRequestAccess: () => {},
  },
};
