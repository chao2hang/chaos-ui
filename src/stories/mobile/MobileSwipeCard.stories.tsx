import type { Meta, StoryObj } from "@storybook/react";
import { MobileSwipeCard } from "@/components/mobile/mobile-swipe-card";
import { Button } from "@/components/ui/button";

const noop = () => {};

const sampleCards = [
  <div
    key="1"
    className="flex h-full flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-rose-400 to-pink-600 text-white"
  >
    <p className="text-lg font-semibold">Card one</p>
    <p className="text-sm opacity-90">Swipe right to keep</p>
  </div>,
  <div
    key="2"
    className="flex h-full flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 text-white"
  >
    <p className="text-lg font-semibold">Card two</p>
    <p className="text-sm opacity-90">Swipe left to dismiss</p>
  </div>,
  <div
    key="3"
    className="flex h-full flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-white"
  >
    <p className="text-lg font-semibold">Card three</p>
    <p className="text-sm opacity-90">Last card</p>
  </div>,
];

const meta = {
  title: "Mobile/MobileSwipeCard",
  component: MobileSwipeCard,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    children: sampleCards,
    onComplete: noop,
  },
} satisfies Meta<typeof MobileSwipeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { height: 420 },
};

export const ShortStack: Story = {
  args: { height: 280 },
};

export const SingleCard: Story = {
  args: {
    children: [sampleCards[0]],
    height: 360,
  },
};

export const CompleteCallback: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4 p-4">
      <p className="text-sm text-muted-foreground">
        Swipe all cards away to fire <code>onComplete</code>.
      </p>
      <MobileSwipeCard height={360} onComplete={() => alert("All cards swiped!")}>
        {sampleCards}
      </MobileSwipeCard>
      <Button variant="outline" onClick={() => window.location.reload()}>
        Reload story
      </Button>
    </div>
  ),
};
