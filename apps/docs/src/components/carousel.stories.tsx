import type { Meta, StoryObj } from "@storybook/react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from "@/components/ui/carousel"

const meta = {
  title: "Components/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  argTypes: {
    defaultIndex: {
      control: { type: "number" },
      description: "Initial slide index",
    },
    loop: {
      control: "boolean",
      description: "Whether navigation wraps around at the ends",
    },
    autoplay: {
      control: "boolean",
      description: "Advance automatically on an interval",
    },
    interval: {
      control: { type: "number" },
      description: "Autoplay interval in ms",
    },
  },
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

const slides = [
  { id: 1, label: "Slide 1", color: "bg-rose-100 dark:bg-rose-950" },
  { id: 2, label: "Slide 2", color: "bg-amber-100 dark:bg-amber-950" },
  { id: 3, label: "Slide 3", color: "bg-emerald-100 dark:bg-emerald-950" },
  { id: 4, label: "Slide 4", color: "bg-sky-100 dark:bg-sky-950" },
]

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Carousel>
        <CarouselContent>
          {slides.map((s) => (
            <CarouselItem key={s.id}>
              <div className={`flex h-40 items-center justify-center rounded-md text-lg font-medium ${s.color}`}>
                {s.label}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <CarouselDots />
      </Carousel>
    </div>
  ),
}

export const WithoutLoop: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Carousel loop={false}>
        <CarouselContent>
          {slides.map((s) => (
            <CarouselItem key={s.id}>
              <div className={`flex h-40 items-center justify-center rounded-md text-lg font-medium ${s.color}`}>
                {s.label}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <CarouselDots />
      </Carousel>
    </div>
  ),
}

export const Autoplay: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Carousel autoplay interval={2000}>
        <CarouselContent>
          {slides.map((s) => (
            <CarouselItem key={s.id}>
              <div className={`flex h-40 items-center justify-center rounded-md text-lg font-medium ${s.color}`}>
                {s.label}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <CarouselDots />
      </Carousel>
    </div>
  ),
}

export const WithoutControls: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Carousel>
        <CarouselContent>
          {slides.map((s) => (
            <CarouselItem key={s.id}>
              <div className={`flex h-40 items-center justify-center rounded-md text-lg font-medium ${s.color}`}>
                {s.label}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="grid w-full max-w-3xl gap-6">
      <div>
        <p className="mb-2 text-xs text-muted-foreground">With controls & dots</p>
        <Carousel>
          <CarouselContent>
            {slides.map((s) => (
              <CarouselItem key={s.id}>
                <div className={`flex h-32 items-center justify-center rounded-md text-sm font-medium ${s.color}`}>
                  {s.label}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
          <CarouselDots />
        </Carousel>
      </div>
      <div>
        <p className="mb-2 text-xs text-muted-foreground">No loop, default</p>
        <Carousel loop={false} defaultIndex={0}>
          <CarouselContent>
            {slides.slice(0, 3).map((s) => (
              <CarouselItem key={s.id}>
                <div className={`flex h-32 items-center justify-center rounded-md text-sm font-medium ${s.color}`}>
                  {s.label}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
          <CarouselDots />
        </Carousel>
      </div>
    </div>
  ),
}

export const Dark: Story = {
  parameters: { backgrounds: { default: "dark" } },
  render: () => (
    <div className="dark w-full max-w-md">
      <Carousel>
        <CarouselContent>
          {slides.map((s) => (
            <CarouselItem key={s.id}>
              <div className={`flex h-40 items-center justify-center rounded-md text-lg font-medium ${s.color}`}>
                {s.label}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <CarouselDots />
      </Carousel>
    </div>
  ),
}
