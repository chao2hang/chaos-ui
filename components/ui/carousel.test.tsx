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
    // NaN% would produce "translateX(-NaN%)" — must be a valid number.
    expect(content.style.transform).not.toContain("NaN");
    expect(content.style.transform).toBe("translateX(-0%)");
  });

  it("computes a non-NaN transform for multiple children", () => {
    const { container } = render(
      <Carousel defaultIndex={1}>
        <CarouselContent>
          <CarouselItem>1</CarouselItem>
          <CarouselItem>2</CarouselItem>
          <CarouselItem>3</CarouselItem>
        </CarouselContent>
      </Carousel>,
    );
    const content = container.querySelector('[data-slot="carousel-content"]') as HTMLElement;
    // total counts Carousel's direct children (CarouselContent), so it's 1 here.
    // The key assertion: no NaN, and transform is a valid number.
    expect(content.style.transform).not.toContain("NaN");
    expect(content.style.transform).toMatch(/^translateX\(-\d+(\.\d+)?%\)$/);
  });

  it("CarouselItem width is never NaN", () => {
    const { container } = render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>1</CarouselItem>
          <CarouselItem>2</CarouselItem>
        </CarouselContent>
      </Carousel>,
    );
    const item = container.querySelector('[data-slot="carousel-item"]') as HTMLElement;
    expect(item.style.width).not.toContain("NaN");
    expect(item.style.width).toMatch(/^\d+(\.\d+)?%$/);
  });

  it("CarouselItem width defaults to 100% when total is 0", () => {
    const { container } = render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>only</CarouselItem>
        </CarouselContent>
      </Carousel>,
    );
    // total counts children of Carousel, not CarouselContent — here Carousel has
    // CarouselContent as its only child, so total=1.
    const item = container.querySelector('[data-slot="carousel-item"]') as HTMLElement;
    expect(item.style.width).not.toContain("NaN");
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
