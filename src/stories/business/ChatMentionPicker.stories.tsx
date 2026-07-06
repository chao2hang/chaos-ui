import type { Meta, StoryObj } from "@storybook/react";
import { ChatMentionPicker } from "@/components/business/chat-mention-picker";

const meta = {
  title: "Business/Chat/ChatMentionPicker",
  component: ChatMentionPicker,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ChatMentionPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = (id: string) => {
  void id;
};

const users = [
  {
    id: "1",
    name: "Alice Chen",
    avatar: "https://placehold.co/40x40/3b82f6/ffffff?text=AC",
  },
  {
    id: "2",
    name: "Bob Kim",
    avatar: "https://placehold.co/40x40/10b981/ffffff?text=BK",
  },
  {
    id: "3",
    name: "Carol Wang",
    avatar: "https://placehold.co/40x40/f59e0b/ffffff?text=CW",
  },
  { id: "4", name: "Dave Patel" },
  {
    id: "5",
    name: "Eve Müller",
    avatar: "https://placehold.co/40x40/8b5cf6/ffffff?text=EM",
  },
];

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Five users, some with avatars and some without. */
export const Default: Story = {
  args: { users, onSelect: noop },
};

/** Two users only. */
export const TwoUsers: Story = {
  args: {
    users: users.slice(0, 2),
    onSelect: noop,
  },
};

/** Users without avatars (initials fallback). */
export const NoAvatars: Story = {
  args: {
    users: [
      { id: "1", name: "Alice Chen" },
      { id: "2", name: "Bob Kim" },
      { id: "3", name: "Carol Wang" },
    ],
    onSelect: noop,
  },
};

/** Empty picker (no users matched the @ query). */
export const Empty: Story = {
  args: { users: [], onSelect: noop },
};
