import type { Meta, StoryObj } from "@storybook/react";
import { Masonry } from "@/components/ui/masonry";

const meta: Meta<typeof Masonry> = {
  title: "Components/Masonry",
  component: Masonry,
  tags: ["autodocs", "a11y"],
};

export default meta;

type Story = StoryObj<typeof Masonry>;

const cards = [
  { color: "bg-blue-100 dark:bg-blue-900/30", height: "h-32", label: "Card 1" },
  {
    color: "bg-green-100 dark:bg-green-900/30",
    height: "h-48",
    label: "Card 2",
  },
  {
    color: "bg-amber-100 dark:bg-amber-900/30",
    height: "h-24",
    label: "Card 3",
  },
  { color: "bg-red-100 dark:bg-red-900/30", height: "h-40", label: "Card 4" },
  {
    color: "bg-purple-100 dark:bg-purple-900/30",
    height: "h-36",
    label: "Card 5",
  },
  { color: "bg-cyan-100 dark:bg-cyan-900/30", height: "h-28", label: "Card 6" },
  { color: "bg-pink-100 dark:bg-pink-900/30", height: "h-44", label: "Card 7" },
  {
    color: "bg-indigo-100 dark:bg-indigo-900/30",
    height: "h-20",
    label: "Card 8",
  },
];

export const Default: Story = {
  args: {
    columns: 3,
    gap: 16,
    children: cards.map((card, i) => (
      <div
        key={i}
        className={`${card.color} ${card.height} flex items-center justify-center rounded-lg border p-4 font-medium`}
      >
        {card.label}
      </div>
    )),
  },
};

export const TwoColumns: Story = {
  args: {
    columns: 2,
    gap: 12,
    children: cards.map((card, i) => (
      <div
        key={i}
        className={`${card.color} ${card.height} flex items-center justify-center rounded-lg border p-4 font-medium`}
      >
        {card.label}
      </div>
    )),
  },
};

export const FourColumns: Story = {
  args: {
    columns: 4,
    gap: 8,
    children: cards.map((card, i) => (
      <div
        key={i}
        className={`${card.color} ${card.height} flex items-center justify-center rounded-lg border p-4 font-medium`}
      >
        {card.label}
      </div>
    )),
  },
};

export const ImageGallery: Story = {
  args: {
    columns: 3,
    gap: 16,
    children: Array.from({ length: 9 }, (_, i) => (
      <div key={i} className="bg-muted overflow-hidden rounded-lg border">
        <div
          className="flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 text-2xl font-bold text-white"
          style={{ height: `${120 + Math.random() * 160}px` }}
        >
          {i + 1}
        </div>
      </div>
    )),
  },
};
