import type { Meta, StoryObj } from "@storybook/react";
import { SplitButton } from "@/components/ui/split-button";
import {
  PlusIcon,
  DownloadIcon,
  CopyIcon,
  EditIcon,
  FileTextIcon,
} from "@/components/ui/icons";

const meta = {
  title: "Components/SplitButton",
  component: SplitButton,
  tags: ["autodocs", "a11y"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "outline", "secondary", "ghost", "destructive"],
      description: "The visual style of the button",
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "default", "lg"],
      description: "The size of the button",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
    loading: {
      control: "boolean",
      description: "Whether the button is in a loading state",
    },
  },
} satisfies Meta<typeof SplitButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultActions = [
  { label: "Save As", icon: <CopyIcon /> },
  { label: "Save All", icon: <FileTextIcon /> },
  { label: "Export", icon: <DownloadIcon /> },
];

export const Default: Story = {
  args: {
    children: "Save",
    actions: defaultActions,
  },
};

export const WithIcon: Story = {
  args: {
    children: "Download",
    icon: <DownloadIcon />,
    actions: [
      { label: "Download as PDF", icon: <FileTextIcon /> },
      { label: "Download as CSV", icon: <FileTextIcon /> },
    ],
  },
};

export const AllVariants: Story = {
  args: {} as any,
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <SplitButton variant="default" actions={defaultActions}>
        Default
      </SplitButton>
      <SplitButton variant="outline" actions={defaultActions}>
        Outline
      </SplitButton>
      <SplitButton variant="secondary" actions={defaultActions}>
        Secondary
      </SplitButton>
      <SplitButton variant="ghost" actions={defaultActions}>
        Ghost
      </SplitButton>
      <SplitButton variant="destructive" actions={defaultActions}>
        Destructive
      </SplitButton>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {} as any,
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <SplitButton size="xs" actions={defaultActions}>
        Extra Small
      </SplitButton>
      <SplitButton size="sm" actions={defaultActions}>
        Small
      </SplitButton>
      <SplitButton size="default" actions={defaultActions}>
        Default
      </SplitButton>
      <SplitButton size="lg" actions={defaultActions}>
        Large
      </SplitButton>
    </div>
  ),
};

export const WithActions: Story = {
  args: {
    children: "Publish",
    icon: <PlusIcon />,
    actions: [
      { label: "Publish Now", icon: <PlusIcon /> },
      { label: "Schedule", icon: <EditIcon /> },
      { label: "Save Draft", icon: <CopyIcon />, separator: true },
      {
        label: "Delete",
        destructive: true,
        separator: true,
      },
    ],
  },
};

export const Loading: Story = {
  args: {
    children: "Saving...",
    loading: true,
    actions: defaultActions,
  },
};

export const Disabled: Story = {
  args: {
    children: "Save",
    disabled: true,
    actions: defaultActions,
  },
};
