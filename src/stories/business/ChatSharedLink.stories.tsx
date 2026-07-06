import type { Meta, StoryObj } from "@storybook/react";
import { ChatSharedLink } from "@/components/business/chat-shared-link";

const meta = {
  title: "Business/Chat/ChatSharedLink",
  component: ChatSharedLink,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ChatSharedLink>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Shared article with title and description. */
export const ArticleLink: Story = {
  args: {
    url: "https://overreacted.io/goodbye-clean-code/",
    title: "Goodbye, Clean Code",
    description:
      "An essay on why over-optimizing for readability can hurt your team.",
  },
};

/** Bare URL — only hostname shown. */
export const BareUrl: Story = {
  args: {
    url: "https://github.com/facebook/react",
  },
};

/** Internal company link. */
export const InternalLink: Story = {
  args: {
    url: "https://wiki.internal.company.com/docs/api/v2/auth",
    title: "API v2 — Authentication",
    description: "Internal wiki page covering OAuth2 flows for the v2 API.",
  },
};

/** Link with subdomain. */
export const Subdomain: Story = {
  args: {
    url: "https://docs.example.com/guides/getting-started",
    title: "Getting Started Guide",
    description: "Step-by-step setup instructions for new developers.",
  },
};

/** Invalid URL (falls back to raw string). */
export const InvalidUrl: Story = {
  args: {
    url: "not-a-valid-url",
    title: "Mystery Link",
  },
};
