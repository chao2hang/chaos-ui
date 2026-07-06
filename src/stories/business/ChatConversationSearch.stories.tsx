import type { Meta, StoryObj } from "@storybook/react";
import { ChatConversationSearch } from "@/components/business/chat-conversation-search";

const meta = {
  title: "Business/Chat/ChatConversationSearch",
  component: ChatConversationSearch,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ChatConversationSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = (q: string) => {
  void q;
};

/* -------------------------------------------------------------------------- */
/*  Sample data                                                               */
/* -------------------------------------------------------------------------- */

const results = [
  {
    id: "1",
    title: "TCP vs UDP explained",
    snippet: "...UDP is typically preferred for real-time media...",
  },
  {
    id: "2",
    title: "Network protocols overview",
    snippet: "...TCP guarantees ordered delivery while UDP...",
  },
  {
    id: "3",
    title: "Video streaming architecture",
    snippet: "...we chose UDP to reduce latency by 40%...",
  },
];

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Active search with a query and results. */
export const WithResults: Story = {
  args: {
    query: "udp",
    onQueryChange: noop,
    results,
  },
};

/** Search field with no query yet. */
export const EmptyQuery: Story = {
  args: {
    query: "",
    onQueryChange: noop,
    results: [],
  },
};

/** Query with no matching results. */
export const NoResults: Story = {
  args: {
    query: "nonexistent",
    onQueryChange: noop,
    results: [],
  },
};

/** Long query string to test truncation. */
export const LongQuery: Story = {
  args: {
    query: "how to configure nginx reverse proxy with ssl termination",
    onQueryChange: noop,
    results: [
      {
        id: "1",
        title: "Nginx reverse proxy guide",
        snippet: "...ssl_certificate /path/to/cert.pem;...",
      },
    ],
  },
};
