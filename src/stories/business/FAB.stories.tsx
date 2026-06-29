import type { Meta, StoryObj } from "@storybook/react";
import { MessageSquareIcon, PlusIcon, UploadIcon } from "@/components/ui/icons";
import { Fab, FabSpeedDial } from "@/components/ui/fab";

const meta = {
  title: "Business/FAB",
  component: Fab,
  tags: ["autodocs", "a11y"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Fab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IconOnly: Story = {
  args: {
    icon: <PlusIcon />,
    "aria-label": "Create campaign",
  },
};

export const WithLabel: Story = {
  args: {
    icon: <PlusIcon />,
    label: "Create",
    position: "bottom-left",
  },
};

export const SpeedDial: Story = {
  render: () => (
    <FabSpeedDial
      icon={<PlusIcon />}
      actions={[
        {
          label: "Upload creative",
          icon: <UploadIcon />,
          onClick: () => undefined,
        },
        {
          label: "Message owner",
          icon: <MessageSquareIcon />,
          onClick: () => undefined,
        },
      ]}
    />
  ),
};
