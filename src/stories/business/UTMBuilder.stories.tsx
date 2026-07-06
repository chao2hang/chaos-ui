import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { UTMBuilder } from "@/components/business/utm-builder";
import type { UTMBuilderProps } from "@/components/business/utm-builder";

function InteractiveUTMBuilder(args: UTMBuilderProps) {
  const [resultUrl, setResultUrl] = useState("");

  return (
    <div className="max-w-3xl space-y-3">
      <UTMBuilder {...args} onChange={(_, nextUrl) => setResultUrl(nextUrl)} />
      <div className="bg-muted/30 rounded-xl border p-3 text-xs">
        <span className="font-medium">Latest emitted URL: </span>
        <span className="text-muted-foreground break-all">
          {resultUrl || "Edit a field to emit onChange."}
        </span>
      </div>
    </div>
  );
}

const meta = {
  title: "Business/UTMBuilder",
  component: UTMBuilder,
  tags: ["autodocs", "a11y"],
  args: {
    value: {
      url: "https://qxyfoods.example/spring-pantry",
      source: "newsletter",
      medium: "email",
      campaign: "spring_pantry_launch",
      content: "hero_cta",
    },
  },
} satisfies Meta<typeof UTMBuilder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <InteractiveUTMBuilder {...args} />,
};

export const Variants: Story = {
  args: {
    value: {
      url: "https://qxyfoods.example/bundles",
      source: "paid-social",
      medium: "cpc",
      campaign: "bundle_retention",
      term: "family dinner kit",
    },
  },
  render: (args) => <InteractiveUTMBuilder {...args} />,
};
