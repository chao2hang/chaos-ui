import type { Meta, StoryObj } from "@storybook/react";
import { Callout } from "@/components/business/callout";

const meta = {
  title: "Business/Dialogs/Callout",
  component: Callout,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { children: null },
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    variant: "info",
    title: "Did you know?",
    children: <p>You can use Cmd+K to open the command palette.</p>,
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    title: "Import complete",
    children: <p>1,250 records were imported successfully.</p>,
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Storage almost full",
    children: <p>You have used 92% of your storage quota.</p>,
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    title: "Upload failed",
    children: <p>The file exceeds the 10 MB limit. Please resize and try again.</p>,
  },
};

export const Default: Story = {
  args: {
    children: <p>A default callout with no title.</p>,
  },
};
