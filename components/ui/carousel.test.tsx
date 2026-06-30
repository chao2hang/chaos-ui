import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
} from "@/components/ui/carousel";

describe("Carousel", () => {
  it("does not crash with zero items (no NaN transform)", () => {
    const { container } = render(
      <Carousel>
        <CarouselContent />
      </Carousel>,
    );
    const content = container.querySelector('[data-slot="carousel-content"]') as HTMLElement;
    expect(content.style.transform).not.toContain("NaN");
  });

  it("total reflects CarouselItem count (not Carousel direct children)", () => {
    // Carousel's direct children include CarouselContent + CarouselDots, but
    // total must be the item count (3) for correct transform/dots.
    const { container } = render(
      <Carousel defaultIndex={1}>
        <CarouselContent>
          <CarouselItem>1</CarouselItem>
          <CarouselItem>2</CarouselItem>
          <CarouselItem>3</CarouselItem>
        </CarouselContent>
        <CarouselDots />
      </Carousel>,
    );
    const content = container.querySelector('[data-slot="carousel-content"]') as HTMLElement;
    // index=1, total=3 → 1*100/3 ≈ 33.33%
    expect(content.style.transform).toBe("translateX(-33.333333333333336%)");
    const dots = container.querySelectorAll('[data-slot="carousel-dots"] button');
    expect(dots.length).toBe(3);
  });

  it("CarouselItem width is 100/total for multiple items", () => {
    const { container } = render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>1</CarouselItem>
          <CarouselItem>2</CarouselItem>
        </CarouselContent>
      </Carousel>,
    );
    const item = container.querySelector('[data-slot="carousel-item"]') as HTMLElement;
    expect(item.style.width).toBe("50%");
  });

  it("CarouselDots renders one dot per item", () => {
    const { container } = render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>1</CarouselItem>
          <CarouselItem>2</CarouselItem>
        </CarouselContent>
        <CarouselDots />
      </Carousel>,
    );
    const dots = container.querySelectorAll('[data-slot="carousel-dots"] button');
    expect(dots.length).toBe(2);
  });
});
