import type { Meta, StoryObj } from "@storybook/react";
import { ConfigProvider } from "@/components/ui/config-provider";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Components/ConfigProvider",
  component: ConfigProvider,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { children: null },
} satisfies Meta<typeof ConfigProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

const Demo = () => (
  <div className="flex flex-col gap-3">
    <div className="rounded-lg border p-4">
      <p className="mb-2 text-sm font-medium">Themed surface</p>
      <p className="text-muted-foreground text-sm">
        Buttons and radii inherit the ConfigProvider theme.
      </p>
    </div>
    <div className="flex gap-2">
      <Button>Primary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  </div>
);

/** Default: no overrides — components use tokens from CSS. */
export const Default: Story = {
  render: () => (
    <ConfigProvider>
      <Demo />
    </ConfigProvider>
  ),
};

/** Custom primary color + radius applied via CSS variables. */
export const CustomTheme: Story = {
  render: () => (
    <ConfigProvider
      theme={{
        primaryColor: "oklch(0.62 0.18 152)",
        borderRadius: 12,
      }}
    >
      <Demo />
    </ConfigProvider>
  ),
};

/** Thin scrollbars enabled for the subtree. */
export const ThinScrollbars: Story = {
  render: () => (
    <ConfigProvider theme={{ scrollbar: "thin" }}>
      <div className="h-40 overflow-y-scroll rounded-lg border p-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <p key={i} className="text-sm">
            Item {i + 1} — scroll me
          </p>
        ))}
      </div>
    </ConfigProvider>
  ),
};

/** RTL direction for right-to-left layouts. */
export const RightToLeft: Story = {
  render: () => (
    <ConfigProvider direction="rtl">
      <div dir="rtl" className="rounded-lg border p-4">
        <p className="mb-2 text-sm font-medium">RTL container</p>
        <p className="text-muted-foreground text-sm">
          Content and controls read right-to-left.
        </p>
      </div>
    </ConfigProvider>
  ),
};

/** Animation disabled globally. */
export const NoAnimation: Story = {
  render: () => (
    <ConfigProvider disableAnimation>
      <Demo />
    </ConfigProvider>
  ),
};
