import type { Meta, StoryObj } from "@storybook/react";
import { ChatModelSwitcher } from "@/components/business/chat-model-switcher";

const meta = {
  title: "Business/Chat/ChatModelSwitcher",
  component: ChatModelSwitcher,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ChatModelSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = (id: string) => {
  void id;
};

const models = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    description: "Most capable — best for complex reasoning.",
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o Mini",
    description: "Faster and cheaper — great for everyday tasks.",
  },
  {
    id: "o1-preview",
    name: "o1 Preview",
    description: "Step-by-step reasoning for hard problems.",
  },
  {
    id: "claude-3.5-sonnet",
    name: "Claude 3.5 Sonnet",
    description: "Strong coding and writing capabilities.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Four models, GPT-4o active. */
export const Default: Story = {
  args: {
    models,
    activeId: "gpt-4o",
    onSwitch: noop,
  },
};

/** Mini model active — cheaper tier. */
export const MiniActive: Story = {
  args: {
    models,
    activeId: "gpt-4o-mini",
    onSwitch: noop,
  },
};

/** Only two models available. */
export const TwoModels: Story = {
  args: {
    models: models.slice(0, 2),
    activeId: "gpt-4o",
    onSwitch: noop,
  },
};

/** Single model (switcher still renders but no alternatives). */
export const SingleModel: Story = {
  args: {
    models: [
      {
        id: "gpt-4o",
        name: "GPT-4o",
        description: "Most capable — best for complex reasoning.",
      },
    ],
    activeId: "gpt-4o",
    onSwitch: noop,
  },
};
