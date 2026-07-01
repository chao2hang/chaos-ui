import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from "./carousel";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (k: string, _opts?: unknown) => k,
    i18n: { language: "en" },
  }),
}));

describe("Carousel", () => {
  it("does not crash with zero items (no NaN transform)", () => {
    const { container } = render(
      <Carousel>
        <CarouselContent />
      </Carousel>,
    );
    const content = container.querySelector(
      '[data-slot="carousel-content"]',
    ) as HTMLElement;
    expect(content.style.transform).not.toContain("NaN");
    expect(content.style.transform).toBe("translateX(-0%)");
  });

  it("total reflects CarouselItem count (not Carousel direct children)", () => {
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
    const content = container.querySelector(
      '[data-slot="carousel-content"]',
    ) as HTMLElement;
    expect(content.style.transform).toBe("translateX(-33.333333333333336%)");
    const dots = container.querySelectorAll(
      '[data-slot="carousel-dots"] button',
    );
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
    const item = container.querySelector(
      '[data-slot="carousel-item"]',
    ) as HTMLElement;
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
    const dots = container.querySelectorAll(
      '[data-slot="carousel-dots"] button',
    );
    expect(dots.length).toBe(2);
  });

  it("CarouselPrevious/Next buttons call prev/next on click", () => {
    const onIndexChange = vi.fn();
    const { container, getByRole } = render(
      <Carousel defaultIndex={0} onIndexChange={onIndexChange}>
        <CarouselContent>
          <CarouselItem>a</CarouselItem>
          <CarouselItem>b</CarouselItem>
          <CarouselItem>c</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>,
    );
    // start at index 0
    const content = container.querySelector(
      '[data-slot="carousel-content"]',
    ) as HTMLElement;
    expect(content.style.transform).toBe("translateX(-0%)");

    const nextBtn = getByRole("button", { name: "carousel.next" });
    fireEvent.click(nextBtn);
    expect(onIndexChange).toHaveBeenLastCalledWith(1);
    expect(content.style.transform).toBe("translateX(-33.333333333333336%)");

    const prevBtn = getByRole("button", { name: "carousel.previous" });
    fireEvent.click(prevBtn);
    expect(onIndexChange).toHaveBeenLastCalledWith(0);
  });

  it("loop wraps around when calling next at last index", () => {
    const onIndexChange = vi.fn();
    const { getByRole, container } = render(
      <Carousel defaultIndex={2} loop onIndexChange={onIndexChange}>
        <CarouselContent>
          <CarouselItem>a</CarouselItem>
          <CarouselItem>b</CarouselItem>
          <CarouselItem>c</CarouselItem>
        </CarouselContent>
        <CarouselNext />
      </Carousel>,
    );
    const nextBtn = getByRole("button", { name: "carousel.next" });
    fireEvent.click(nextBtn);
    // 3 items, index 2 → next → ((3 % 3)+3)%3 = 0
    expect(onIndexChange).toHaveBeenLastCalledWith(0);
    const content = container.querySelector(
      '[data-slot="carousel-content"]',
    ) as HTMLElement;
    expect(content.style.transform).toBe("translateX(-0%)");
  });

  it("no loop clamps to last index", () => {
    const onIndexChange = vi.fn();
    const { getByRole } = render(
      <Carousel defaultIndex={2} loop={false} onIndexChange={onIndexChange}>
        <CarouselContent>
          <CarouselItem>a</CarouselItem>
          <CarouselItem>b</CarouselItem>
          <CarouselItem>c</CarouselItem>
        </CarouselContent>
        <CarouselNext />
      </Carousel>,
    );
    fireEvent.click(getByRole("button", { name: "carousel.next" }));
    // clamped to total-1 = 2 → onIndexChange still called with 2
    expect(onIndexChange).toHaveBeenLastCalledWith(2);
  });

  it("CarouselDots click calls goTo with target index", () => {
    const onIndexChange = vi.fn();
    const { container } = render(
      <Carousel onIndexChange={onIndexChange}>
        <CarouselContent>
          <CarouselItem>a</CarouselItem>
          <CarouselItem>b</CarouselItem>
        </CarouselContent>
        <CarouselDots />
      </Carousel>,
    );
    const dots = container.querySelectorAll(
      '[data-slot="carousel-dots"] button',
    );
    fireEvent.click(dots[1]!);
    expect(onIndexChange).toHaveBeenLastCalledWith(1);
  });

  it("keyboard ArrowRight/ArrowLeft navigates", () => {
    const onIndexChange = vi.fn();
    const { container } = render(
      <Carousel onIndexChange={onIndexChange}>
        <CarouselContent>
          <CarouselItem>a</CarouselItem>
          <CarouselItem>b</CarouselItem>
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

  it("autoplay advances via interval", () => {
    vi.useFakeTimers();
    const onIndexChange = vi.fn();
    render(
      <Carousel autoplay interval={1000} onIndexChange={onIndexChange}>
        <CarouselContent>
          <CarouselItem>a</CarouselItem>
          <CarouselItem>b</CarouselItem>
        </CarouselContent>
      </Carousel>,
    );
    vi.advanceTimersByTime(1000);
    expect(onIndexChange).toHaveBeenLastCalledWith(1);
    vi.useRealTimers();
  });

  it("CarouselDots active dot has bg-primary class", () => {
    const { container } = render(
      <Carousel defaultIndex={1}>
        <CarouselContent>
          <CarouselItem>a</CarouselItem>
          <CarouselItem>b</CarouselItem>
          <CarouselItem>c</CarouselItem>
        </CarouselContent>
        <CarouselDots />
      </Carousel>,
    );
    const dots = container.querySelectorAll(
      '[data-slot="carousel-dots"] button',
    );
    expect((dots[1] as HTMLElement).className).toContain("bg-primary");
    expect((dots[0] as HTMLElement).className).toContain("bg-primary/30");
  });
});
