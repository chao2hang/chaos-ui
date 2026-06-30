import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
} from "./avatar";

describe("avatar", () => {
  it("exports Avatar", () => {
    expect(Avatar).toBeDefined();
  });
  it("exports AvatarImage", () => {
    expect(AvatarImage).toBeDefined();
  });
  it("exports AvatarFallback", () => {
    expect(AvatarFallback).toBeDefined();
  });
  it("exports AvatarGroup", () => {
    expect(AvatarGroup).toBeDefined();
  });
  it("exports AvatarGroupCount", () => {
    expect(AvatarGroupCount).toBeDefined();
  });
  it("exports AvatarBadge", () => {
    expect(AvatarBadge).toBeDefined();
  });

  it("renders Avatar root with default size and data-slot", () => {
    const { container } = render(<Avatar data-testid="av" />);
    const root = container.querySelector('[data-slot="avatar"]');
    expect(root).not.toBeNull();
    expect(root?.getAttribute("data-size")).toBe("default");
  });

  it("renders Avatar with sm/lg size attributes", () => {
    const { container } = render(
      <>
        <Avatar size="sm" />
        <Avatar size="lg" />
      </>,
    );
    const roots = container.querySelectorAll('[data-slot="avatar"]');
    expect(roots[0]?.getAttribute("data-size")).toBe("sm");
    expect(roots[1]?.getAttribute("data-size")).toBe("lg");
  });

  it("applies custom fontSize as inline style (number → px)", () => {
    const { container } = render(<Avatar fontSize={14} />);
    const root = container.querySelector('[data-slot="avatar"]') as HTMLElement;
    expect(root.style.fontSize).toBe("14px");
  });

  it("applies custom fontSize as inline style (string)", () => {
    const { container } = render(<Avatar fontSize="1.5rem" />);
    const root = container.querySelector('[data-slot="avatar"]') as HTMLElement;
    expect(root.style.fontSize).toBe("1.5rem");
  });

  it("AvatarFallback renders fallback text", () => {
    const { container, getByText } = render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>,
    );
    expect(getByText("JD")).toBeDefined();
    expect(container.querySelector('[data-slot="avatar-fallback"]')).not.toBeNull();
  });

  it("AvatarImage accepts src/alt props without crashing (img renders only after load in jsdom)", () => {
    // In jsdom, the image never fires a `load` event, so AvatarImage stays
    // unmounted (returns null) and the fallback renders instead.
    const { getByText } = render(
      <Avatar>
        <AvatarImage src="/me.png" alt="me" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>,
    );
    expect(getByText("JD")).toBeDefined();
  });

  it("AvatarBadge renders a span badge with children", () => {
    const { container, getByText } = render(
      <Avatar>
        <AvatarBadge>
          <span>online</span>
        </AvatarBadge>
      </Avatar>,
    );
    expect(getByText("online")).toBeDefined();
    expect(container.querySelector('[data-slot="avatar-badge"]')).not.toBeNull();
  });

  it("AvatarGroup renders multiple avatars", () => {
    const { container } = render(
      <AvatarGroup>
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
      </AvatarGroup>,
    );
    expect(container.querySelector('[data-slot="avatar-group"]')).not.toBeNull();
    expect(container.querySelectorAll('[data-slot="avatar"]')).toHaveLength(2);
  });

  it("AvatarGroupCount renders a count element", () => {
    const { container, getByText } = render(
      <AvatarGroup>
        <AvatarGroupCount>+3</AvatarGroupCount>
      </AvatarGroup>,
    );
    expect(getByText("+3")).toBeDefined();
    expect(container.querySelector('[data-slot="avatar-group-count"]')).not.toBeNull();
  });
});
