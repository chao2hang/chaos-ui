"use client";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

interface CarouselContextValue {
  index: number;
  total: number;
  goTo: (i: number) => void;
  next: () => void;
  prev: () => void;
  loop?: boolean;
  /** CarouselContent reports its item count here. */
  setTotal: (n: number) => void;
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

function useCarousel() {
  const ctx = React.useContext(CarouselContext);
  if (!ctx) throw new Error("Carousel components must be used within Carousel");
  return ctx;
}

interface CarouselProps extends React.ComponentProps<"div"> {
  defaultIndex?: number;
  loop?: boolean;
  autoplay?: boolean;
  interval?: number;
  onIndexChange?: (index: number) => void;
}

/**
 * @component Carousel
 * @category ui/shell
 * @since 0.2.0
 * @description A slideshow component for cycling through content with autoplay, looping, and navigation / 轮播组件，支持自动播放、循环和导航控制
 * @keywords carousel, slider, slideshow, autoplay, loop
 * @example
 * <Carousel loop autoplay>
 *   <CarouselContent>
 *     <CarouselItem>Slide 1</CarouselItem>
 *     <CarouselItem>Slide 2</CarouselItem>
 *   </CarouselContent>
 *   <CarouselPrevious />
 *   <CarouselNext />
 *   <CarouselDots />
 * </Carousel>
 */
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
  // total is reported by CarouselContent (the actual item count), not the
  // count of Carousel's direct children (which includes CarouselContent/Dots).
  const [total, setTotal] = React.useState(0);
  const [index, setIndex] = React.useState(defaultIndex);

  const goTo = React.useCallback(
    (i: number) => {
      if (total <= 0) return;
      const next = loop
        ? ((i % total) + total) % total
        : Math.min(Math.max(0, i), total - 1);
      setIndex(next);
      onIndexChange?.(next);
    },
    [loop, total, onIndexChange],
  );

  const next = React.useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = React.useCallback(() => goTo(index - 1), [goTo, index]);

  React.useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [autoplay, interval, next]);

  return (
    <CarouselContext.Provider
      value={{ index, total, goTo, next, prev, loop, setTotal }}
    >
      <div
        data-slot="carousel"
        className={cn("relative w-full", className)}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") prev();
          if (e.key === "ArrowRight") next();
        }}
        tabIndex={0}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

/**
 * @component CarouselContent
 * @category ui/shell
 * @since 0.2.0
 * @description The scrollable track that contains CarouselItem children / 包含轮播项的滚动轨道
 * @keywords carousel, content, track, slider
 * @example
 * <CarouselContent>
 *   <CarouselItem>Slide 1</CarouselItem>
 * </CarouselContent>
 */
function CarouselContent({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const { total, index, setTotal } = useCarousel();
  // Report the actual CarouselItem count (this component's children) up to the
  // Carousel so total reflects items, not the Carousel's direct children.
  const itemCount = React.Children.count(children);
  React.useEffect(() => {
    setTotal(itemCount);
  }, [itemCount, setTotal]);
  return (
    <div className="overflow-hidden">
      <div
        data-slot="carousel-content"
        className={cn(
          "flex transition-transform duration-300 ease-out",
          className,
        )}
        style={{
          transform: `translateX(-${total > 0 ? (index * 100) / total : 0}%)`,
        }}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * @component CarouselItem
 * @category ui/shell
 * @since 0.2.0
 * @description A single slide within a CarouselContent / 轮播中的单个幻灯片
 * @keywords carousel, slide, item
 * @example
 * <CarouselItem>Slide content</CarouselItem>
 */
function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { total } = useCarousel();
  return (
    <div
      data-slot="carousel-item"
      className={cn("shrink-0 grow-0 basis-full", className)}
      style={{ width: `${total > 0 ? 100 / total : 100}%` }}
      {...props}
    />
  );
}

/**
 * @component CarouselPrevious
 * @category ui/shell
 * @since 0.2.0
 * @description Button to navigate to the previous slide / 切换到上一张幻灯片的按钮
 * @keywords carousel, previous, navigation, arrow
 * @example
 * <CarouselPrevious />
 */
function CarouselPrevious({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { t } = useTranslation("ui");
  const { prev } = useCarousel();
  return (
    <Button
      data-slot="carousel-previous"
      variant="outline"
      size="icon"
      onClick={prev}
      className={cn(
        "absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full",
        className,
      )}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="sr-only">{t("carousel.previous")}</span>
    </Button>
  );
}

/**
 * @component CarouselNext
 * @category ui/shell
 * @since 0.2.0
 * @description Button to navigate to the next slide / 切换到下一张幻灯片的按钮
 * @keywords carousel, next, navigation, arrow
 * @example
 * <CarouselNext />
 */
function CarouselNext({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { t } = useTranslation("ui");
  const { next } = useCarousel();
  return (
    <Button
      data-slot="carousel-next"
      variant="outline"
      size="icon"
      onClick={next}
      className={cn(
        "absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full",
        className,
      )}
      {...props}
    >
      <ChevronRightIcon />
      <span className="sr-only">{t("carousel.next")}</span>
    </Button>
  );
}

/**
 * @component CarouselDots
 * @category ui/shell
 * @since 0.2.0
 * @description Dot indicators showing current slide position with click-to-navigate / 显示当前位置的圆点指示器，可点击跳转
 * @keywords carousel, dots, indicator, pagination
 * @example
 * <CarouselDots />
 */
function CarouselDots({ className, ...props }: React.ComponentProps<"div">) {
  const { t } = useTranslation("ui");
  const { total, index, goTo } = useCarousel();
  return (
    <div
      data-slot="carousel-dots"
      className={cn(
        "absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1",
        className,
      )}
      {...props}
    >
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => goTo(i)}
          aria-label={t("carousel.goToSlide", { count: i + 1 })}
          className={cn(
            "size-2 rounded-full transition-colors",
            i === index ? "bg-primary" : "bg-primary/30 hover:bg-primary/50",
          )}
        />
      ))}
    </div>
  );
}

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
};
