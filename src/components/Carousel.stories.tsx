import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const meta = {
  title: "Components/Carousel",
  component: Carousel,
  tags: ["autodocs", "a11y"],
  argTypes: {
    defaultIndex: {
      control: { type: "number", min: 0, max: 3, step: 1 },
      description: "The initially active slide index",
    },
    loop: {
      control: "boolean",
      description: "Whether navigation wraps around",
    },
    autoplay: {
      control: "boolean",
      description: "Advance slides automatically",
    },
    interval: {
      control: { type: "number", min: 1000, max: 10000, step: 500 },
      description: "Autoplay interval in milliseconds",
    },
  },
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

const slides = [
  { title: "Discover", description: "Introduce the new dashboard experience." },
  { title: "Organize", description: "Group project activity into clear workstreams." },
  { title: "Report", description: "Share progress with stakeholders in minutes." },
  { title: "Launch", description: "Move confidently from review to release." },
]

function CarouselDemo({
  autoplay = false,
  defaultIndex = 0,
  interval = 3000,
  loop = true,
}: {
  autoplay?: boolean
  defaultIndex?: number
  interval?: number
  loop?: boolean
}) {
  return (
    <Carousel
      autoplay={autoplay}
      defaultIndex={defaultIndex}
      interval={interval}
      loop={loop}
      className="w-full max-w-xl rounded-xl border bg-card shadow-sm"
    >
      <CarouselContent className="w-[400%]">
        {slides.map((slide, index) => (
          <CarouselItem key={slide.title} className="basis-1/4">
            <div className="flex aspect-video flex-col justify-end gap-2 bg-muted p-8">
              <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Step {index + 1}
              </div>
              <div className="text-2xl font-semibold">{slide.title}</div>
              <p className="max-w-sm text-sm text-muted-foreground">{slide.description}</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots />
    </Carousel>
  )
}

export const Default: Story = {
  args: {
    autoplay: false,
    defaultIndex: 0,
    interval: 3000,
    loop: true,
  },
  render: (args) => <CarouselDemo {...args} />,
}

export const StartOnThirdSlide: Story = {
  render: () => <CarouselDemo defaultIndex={2} />,
}

export const Autoplay: Story = {
  render: () => <CarouselDemo autoplay interval={2500} />,
}

