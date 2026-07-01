import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { Countdown } from "@/components/ui/countdown";
import type {
  CountdownProps,
  CountdownFormat,
} from "@/components/ui/countdown";

describe("Countdown", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("exports Countdown component", () => {
    expect(Countdown).toBeDefined();
    expect(typeof Countdown).toBe("function");
  });

  it("exports CountdownProps type", () => {
    const props: CountdownProps = {
      target: Date.now() + 3600000,
      format: "HH:mm:ss",
      onFinish: () => {},
      days: false,
      className: "test",
    };
    expect(props).toBeDefined();
  });

  it("exports CountdownFormat type", () => {
    const fmt: CountdownFormat = "HH:mm:ss";
    expect(fmt).toBeDefined();
  });

  it("renders with data-slot attribute", () => {
    const { container } = render(<Countdown target={Date.now() + 3600000} />);
    expect(container.querySelector('[data-slot="countdown"]')).not.toBeNull();
  });

  it("displays countdown in HH:mm:ss format by default", () => {
    // Target is 1 hour, 23 minutes, 45 seconds from now
    const now = Date.now();
    const target = now + (1 * 3600 + 23 * 60 + 45) * 1000;
    vi.setSystemTime(now);

    render(<Countdown target={target} />);
    expect(screen.getByText("01:23:45")).toBeDefined();
  });

  it("displays countdown in mm:ss format", () => {
    const now = Date.now();
    const target = now + (5 * 60 + 30) * 1000;
    vi.setSystemTime(now);

    render(<Countdown target={target} format="mm:ss" />);
    expect(screen.getByText("05:30")).toBeDefined();
  });

  it("displays countdown in dd:HH:mm:ss format", () => {
    const now = Date.now();
    const target = now + (2 * 86400 + 3 * 3600 + 15 * 60 + 20) * 1000;
    vi.setSystemTime(now);

    render(<Countdown target={target} format="dd:HH:mm:ss" />);
    expect(screen.getByText("2:03:15:20")).toBeDefined();
  });

  it("displays countdown in dd:HH:mm:ss format when days=true", () => {
    const now = Date.now();
    const target = now + (1 * 86400 + 2 * 3600 + 30 * 60 + 10) * 1000;
    vi.setSystemTime(now);

    render(<Countdown target={target} days />);
    expect(screen.getByText("1:02:30:10")).toBeDefined();
  });

  it("displays milliseconds in ms format", () => {
    const now = Date.now();
    const target = now + 5000;
    vi.setSystemTime(now);

    render(<Countdown target={target} format="ms" />);
    expect(screen.getByText("5000")).toBeDefined();
  });

  it("displays 00:00:00 when countdown is finished", () => {
    const pastTarget = Date.now() - 10000;
    vi.setSystemTime(Date.now());

    render(<Countdown target={pastTarget} />);
    expect(screen.getByText("00:00:00")).toBeDefined();
  });

  it("calls onFinish when countdown reaches zero", () => {
    const now = Date.now();
    const target = now + 1000; // 1 second from now
    vi.setSystemTime(now);
    const onFinish = vi.fn();

    render(<Countdown target={target} onFinish={onFinish} />);
    expect(onFinish).not.toHaveBeenCalled();

    // Advance past the target
    act(() => {
      vi.setSystemTime(target + 1000);
      vi.advanceTimersByTime(1100);
    });

    expect(onFinish).toHaveBeenCalledTimes(1);
  });

  it("does not call onFinish again after already finished", () => {
    const now = Date.now();
    const target = now + 1000;
    vi.setSystemTime(now);
    const onFinish = vi.fn();

    render(<Countdown target={target} onFinish={onFinish} />);

    act(() => {
      vi.setSystemTime(target + 1000);
      vi.advanceTimersByTime(1100);
    });
    expect(onFinish).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    // Should still only be called once
    expect(onFinish).toHaveBeenCalledTimes(1);
  });

  it("pads single-digit hours, minutes, seconds", () => {
    const now = Date.now();
    const target = now + (0 * 3600 + 5 * 60 + 3) * 1000;
    vi.setSystemTime(now);

    render(<Countdown target={target} />);
    expect(screen.getByText("00:05:03")).toBeDefined();
  });

  it("applies custom className", () => {
    const { container } = render(
      <Countdown target={Date.now() + 3600000} className="my-countdown" />,
    );
    const el = container.querySelector('[data-slot="countdown"]');
    expect(el?.className).toContain("my-countdown");
  });

  it("applies font-mono and tabular-nums classes", () => {
    const { container } = render(<Countdown target={Date.now() + 3600000} />);
    const el = container.querySelector('[data-slot="countdown"]');
    expect(el?.className).toContain("font-mono");
    expect(el?.className).toContain("tabular-nums");
  });

  it("handles NaN target as finished", () => {
    render(<Countdown target={NaN} />);
    expect(screen.getByText("00:00:00")).toBeDefined();
  });

  it("handles string format that is not a standard format", () => {
    const now = Date.now();
    const target = now + (1 * 3600 + 5 * 60 + 9) * 1000;
    vi.setSystemTime(now);

    // Non-standard format falls through to the default HH:mm:ss
    render(<Countdown target={target} format="custom" />);
    expect(screen.getByText("01:05:09")).toBeDefined();
  });

  it("displays 0 milliseconds when finished in ms format", () => {
    const pastTarget = Date.now() - 5000;
    vi.setSystemTime(Date.now());

    render(<Countdown target={pastTarget} format="ms" />);
    // When finished, always shows 00:00:00 regardless of format
    expect(screen.getByText("00:00:00")).toBeDefined();
  });
});
