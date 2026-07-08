import type { Meta, StoryObj } from "@storybook/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const meta: Meta<typeof Carousel> = {
  title: "Components/Carousel",
  component: Carousel,
  tags: ["autodocs"],

export default meta;
type Story = StoryObj<typeof meta>;

const slides = [
  { color: "bg-blue-100", label: "Slide 1" },
  { color: "bg-green-100", label: "Slide 2" },
  { color: "bg-purple-100", label: "Slide 3" },
];

export const Default: Story = {
  render: () => (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {slides.map((s, i) => (
          <CarouselItem key={i}>
            <div
              className={`flex h-40 items-center justify-center rounded ${s.color}`}
            >
              <span className="text-lg font-semibold">{s.label}</span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};
