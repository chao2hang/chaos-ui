import type { Meta, StoryObj } from "@storybook/react";
import { Fab, FabSpeedDial } from "@/components/ui/fab";
import {
  PlusIcon,
  EditIcon,
  Share2Icon,
  TrashIcon,
} from "@/components/ui/icons";

const meta = {
  title: "Components/Fab",
  component: Fab,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Fab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IconOnly: Story = {
  args: { icon: <PlusIcon /> },
};

export const WithLabel: Story = {
  args: { icon: <PlusIcon />, label: "New" },
};

export const BottomLeft: Story = {
  args: { icon: <PlusIcon />, position: "bottom-left" },
};

export const SpeedDial: Story = {
  render: () => (
    <FabSpeedDial
      icon={<PlusIcon />}
      actions={[
        { icon: <EditIcon />, label: "Edit", onClick: () => {} },
        { icon: <Share2Icon />, label: "Share", onClick: () => {} },
        { icon: <TrashIcon />, label: "Delete", onClick: () => {} },
      ]}
    />
  ),
};

export const SpeedDialLeft: Story = {
  render: () => (
    <FabSpeedDial
      icon={<PlusIcon />}
      position="bottom-left"
      actions={[
        { icon: <EditIcon />, label: "Edit", onClick: () => {} },
        { icon: <Share2Icon />, label: "Share", onClick: () => {} },
      ]}
    />
  ),
};
