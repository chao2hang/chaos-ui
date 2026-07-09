import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from "@chaos_team/chaos-ui/ui";

const ThreeSlides = () => (
  <Carousel>
    <CarouselContent>
      <CarouselItem>
        <div>one</div>
      </CarouselItem>
      <CarouselItem>
        <div>two</div>
      </CarouselItem>
      <CarouselItem>
        <div>three</div>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
    <CarouselDots />
  </Carousel>
);

describe("Carousel", () => {
  it("renders the slot, items, and dots", () => {
    const { container } = render(<ThreeSlides />);
    expect(container.querySelector('[data-slot="carousel"]')).toBeTruthy();
    expect(
      container.querySelectorAll('[data-slot="carousel-item"]'),
    ).toHaveLength(3);
    const dots = container.querySelectorAll(
      '[data-slot="carousel-dots"] button',
    );
    expect(dots).toHaveLength(3);
  });

  it("navigates between slides when the next/prev buttons are clicked", () => {
    const onIndexChange = vi.fn();
    const { container } = render(
      <Carousel onIndexChange={onIndexChange}>
        <CarouselContent>
          <CarouselItem>one</CarouselItem>
          <CarouselItem>two</CarouselItem>
          <CarouselItem>three</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>,
    );
    fireEvent.click(
      container.querySelector('[data-slot="carousel-next"]') as HTMLElement,
    );
    expect(onIndexChange).toHaveBeenLastCalledWith(1);
    fireEvent.click(
      container.querySelector('[data-slot="carousel-previous"]') as HTMLElement,
    );
    expect(onIndexChange).toHaveBeenLastCalledWith(0);
  });

  it("wraps around when loop is enabled (default)", () => {
    const onIndexChange = vi.fn();
    const { container } = render(
      <Carousel onIndexChange={onIndexChange} defaultIndex={0}>
        <CarouselContent>
          <CarouselItem>one</CarouselItem>
          <CarouselItem>two</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>,
    );
    fireEvent.click(
      container.querySelector('[data-slot="carousel-previous"]') as HTMLElement,
    );
    expect(onIndexChange).toHaveBeenLastCalledWith(1);
  });

  it("clamps to bounds when loop is disabled", () => {
    const onIndexChange = vi.fn();
    const { container } = render(
      <Carousel loop={false} onIndexChange={onIndexChange} defaultIndex={0}>
        <CarouselContent>
          <CarouselItem>one</CarouselItem>
          <CarouselItem>two</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>,
    );
    fireEvent.click(
      container.querySelector('[data-slot="carousel-previous"]') as HTMLElement,
    );
    expect(onIndexChange).toHaveBeenLastCalledWith(0);
  });

  it("responds to ArrowLeft/ArrowRight keys", () => {
    const onIndexChange = vi.fn();
    const { container } = render(
      <Carousel onIndexChange={onIndexChange}>
        <CarouselContent>
          <CarouselItem>one</CarouselItem>
          <CarouselItem>two</CarouselItem>
          <CarouselItem>three</CarouselItem>
        </CarouselContent>
      </Carousel>,
    );
    const root = container.querySelector(
      '[data-slot="carousel"]',
    ) as HTMLElement;
    fireEvent.keyDown(root, { key: "ArrowRight" });
    expect(onIndexChange).toHaveBeenLastCalledWith(1);
    fireEvent.keyDown(root, { key: "ArrowLeft" });
    expect(onIndexChange).toHaveBeenLastCalledWith(0);
  });

  it("jumps to a slide when a dot is clicked", () => {
    const onIndexChange = vi.fn();
    const { container } = render(
      <Carousel onIndexChange={onIndexChange}>
        <CarouselContent>
          <CarouselItem>one</CarouselItem>
          <CarouselItem>two</CarouselItem>
          <CarouselItem>three</CarouselItem>
        </CarouselContent>
        <CarouselDots />
      </Carousel>,
    );
    const dotButtons = container.querySelectorAll(
      '[data-slot="carousel-dots"] button',
    );
    expect(dotButtons).toHaveLength(3);
    expect(
      (dotButtons[0] as HTMLButtonElement).getAttribute("aria-label"),
    ).toBe("Go to slide 1");
    fireEvent.click(dotButtons[2] as HTMLElement);
    expect(onIndexChange).toHaveBeenLastCalledWith(2);
  });

  it("exposes accessible labels for the prev/next buttons", () => {
    render(<ThreeSlides />);
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });
});
