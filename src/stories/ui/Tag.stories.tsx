import type { Meta, StoryObj } from "@storybook/react";
import { Tag, TagGroup } from "@/components/ui/tag";
import { CheckIcon, XIcon } from "lucide-react";

const meta = {
  title: "Components/Tag",
  component: Tag,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = () => {};

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Default variant. */
export const Default: Story = {
  args: {
    children: "Default",
  },
};

/** All built-in color variants. */
export const ColorVariants: Story = {
  render: () => (
    <TagGroup>
      <Tag>default</Tag>
      <Tag color="primary">primary</Tag>
      <Tag color="success">success</Tag>
      <Tag color="warning">warning</Tag>
      <Tag color="error">error</Tag>
      <Tag color="info">info</Tag>
    </TagGroup>
  ),
};

/** Closable tag with close callback. */
export const Closable: Story = {
  args: {
    color: "primary",
    closable: true,
    onClose: noop,
    children: "Removable",
  },
};

/** With leading icon. */
export const WithIcon: Story = {
  args: {
    color: "success",
    icon: <CheckIcon className="size-3" />,
    children: "Verified",
  },
};

/** Borderless tag. */
export const Borderless: Story = {
  args: {
    color: "info",
    bordered: false,
    children: "Soft info",
  },
};

/** Custom color via hex string. */
export const CustomColor: Story = {
  args: {
    color: "#8b5cf6",
    children: "Grape",
  },
};

/** Error tag with icon for reject states. */
export const RejectState: Story = {
  args: {
    color: "error",
    icon: <XIcon className="size-3" />,
    closable: true,
    onClose: noop,
    children: "Rejected",
  },
};
