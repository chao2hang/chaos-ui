"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

interface CarouselContextValue {
  index: number
  total: number
  goTo: (i: number) => void
  next: () => void
  prev: () => void
  loop?: boolean
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null)

function useCarousel() {
  const ctx = React.useContext(CarouselContext)
  if (!ctx) throw new Error("Carousel components must be used within Carousel")
  return ctx
}

interface CarouselProps extends React.ComponentProps<"div"> {
  defaultIndex?: number
  loop?: boolean
  autoplay?: boolean
  interval?: number
  onIndexChange?: (index: number) => void
}

function Carousel({
  defaultIndex = 0,
  loop = true,
  autoplay = false,
  interval = 5000,
  onIndexChange,
  className,
  children,
  ...props
}: CarouselProps) {
  const total = React.useMemo(() => {
    let count = 0
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.type === CarouselContent) {
        React.Children.forEach(child.props.children, (item) => {
          if (React.isValidElement(item) && item.type === CarouselItem) {
            count++
          }
        })
      }
    })
    return count
  }, [children])
  const [index, setIndex] = React.useState(defaultIndex)

  const goTo = React.useCallback(
    (i: number) => {
      const next = loop
        ? ((i % total) + total) % total
        : Math.min(Math.max(0, i), total - 1)
      setIndex(next)
      onIndexChange?.(next)
    },
    [loop, total, onIndexChange]
  )

  const next = React.useCallback(() => goTo(index + 1), [goTo, index])
  const prev = React.useCallback(() => goTo(index - 1), [goTo, index])

  React.useEffect(() => {
    if (!autoplay) return
    const id = setInterval(next, interval)
    return () => clearInterval(id)
  }, [autoplay, interval, next])

  return (
    <CarouselContext.Provider value={{ index, total, goTo, next, prev, loop }}>
      <div
        data-slot="carousel"
        className={cn("relative w-full", className)}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") prev()
          if (e.key === "ArrowRight") next()
        }}
        tabIndex={0}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ className, children, ...props }: React.ComponentProps<"div">) {
  const { total, index } = useCarousel()
  return (
    <div className="overflow-hidden">
      <div
        data-slot="carousel-content"
        className={cn("flex transition-transform duration-300 ease-out", className)}
        style={{ transform: `translateX(-${(index * 100) / total}%)` }}
        {...props}
      >
        {children}
      </div>
    </div>
  )
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { total } = useCarousel()
  return (
    <div
      data-slot="carousel-item"
      className={cn("shrink-0 grow-0 basis-full", className)}
      style={{ width: `${100 / total}%` }}
      {...props}
    />
  )
}

function CarouselPrevious({ className, ...props }: React.ComponentProps<typeof Button>) {
  const { prev } = useCarousel()
  return (
    <Button
      data-slot="carousel-previous"
      variant="outline"
      size="icon"
      onClick={prev}
      className={cn(
        "absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full",
        className
      )}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="sr-only">Previous</span>
    </Button>
  )
}

function CarouselNext({ className, ...props }: React.ComponentProps<typeof Button>) {
  const { next } = useCarousel()
  return (
    <Button
      data-slot="carousel-next"
      variant="outline"
      size="icon"
      onClick={next}
      className={cn(
        "absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full",
        className
      )}
      {...props}
    >
      <ChevronRightIcon />
      <span className="sr-only">Next</span>
    </Button>
  )
}

function CarouselDots({ className, ...props }: React.ComponentProps<"div">) {
  const { total, index, goTo } = useCarousel()
  return (
    <div
      data-slot="carousel-dots"
      className={cn("absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1", className)}
      {...props}
    >
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => goTo(i)}
          aria-label={`Go to slide ${i + 1}`}
          className={cn(
            "size-2 rounded-full transition-colors",
            i === index ? "bg-primary" : "bg-primary/30 hover:bg-primary/50"
          )}
        />
      ))}
    </div>
  )
}

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
}
