import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StarIcon, Loader2Icon } from "lucide-react";
import { Icon } from "./icon";

describe("Icon", () => {
  it("exports Icon component", () => {
    expect(Icon).toBeDefined();
  });

  it("renders with an icon", () => {
    render(<Icon icon={StarIcon} data-testid="icon" />);
    const el = screen.getByTestId("icon");
    expect(el).toBeInTheDocument();
    expect(el.querySelector("svg")).toBeInTheDocument();
  });

  it("renders with default size (inherit)", () => {
    render(<Icon icon={StarIcon} data-testid="icon" />);
    const svg = screen.getByTestId("icon").querySelector("svg");
    expect(svg?.style.width).toBe("1em");
    expect(svg?.style.height).toBe("1em");
  });

  it("renders sm size", () => {
    render(<Icon icon={StarIcon} size="sm" data-testid="icon" />);
    const svg = screen.getByTestId("icon").querySelector("svg");
    expect(svg?.style.width).toBe("0.875rem");
  });

  it("renders md size", () => {
    render(<Icon icon={StarIcon} size="md" data-testid="icon" />);
    const svg = screen.getByTestId("icon").querySelector("svg");
    expect(svg?.style.width).toBe("1.25rem");
  });

  it("renders lg size", () => {
    render(<Icon icon={StarIcon} size="lg" data-testid="icon" />);
    const svg = screen.getByTestId("icon").querySelector("svg");
    expect(svg?.style.width).toBe("1.5rem");
  });

  it("renders xl size", () => {
    render(<Icon icon={StarIcon} size="xl" data-testid="icon" />);
    const svg = screen.getByTestId("icon").querySelector("svg");
    expect(svg?.style.width).toBe("2rem");
  });

  it("applies spin animation class", () => {
    render(<Icon icon={Loader2Icon} spin data-testid="icon" />);
    const el = screen.getByTestId("icon");
    expect(el.className).toContain("animate-spin");
  });

  it("applies pulse animation class", () => {
    render(<Icon icon={StarIcon} pulse data-testid="icon" />);
    const el = screen.getByTestId("icon");
    expect(el.className).toContain("animate-pulse");
  });

  it("applies custom className", () => {
    render(
      <Icon icon={StarIcon} className="text-primary" data-testid="icon" />,
    );
    const el = screen.getByTestId("icon");
    expect(el.className).toContain("text-primary");
  });

  it("forwards aria-hidden", () => {
    render(<Icon icon={StarIcon} data-testid="icon" />);
    expect(screen.getByTestId("icon")).toHaveAttribute("aria-hidden", "true");
  });
});
