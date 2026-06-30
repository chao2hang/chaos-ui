import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { AspectRatio } from "./aspect-ratio";

describe("AspectRatio", () => {
  it("exports AspectRatio", () => {
    expect(AspectRatio).toBeDefined();
  });

  it("renders children inside the aspect-ratio slot", () => {
    const { container } = render(
      <AspectRatio ratio={4 / 3}>
        <img alt="pic" src="/x.png" />
      </AspectRatio>,
    );
    const root = container.querySelector('[data-slot="aspect-ratio"]');
    expect(root).not.toBeNull();
    expect(root?.querySelector("img")).not.toBeNull();
  });

  it("applies the default 16/9 ratio when none provided", () => {
    const { container } = render(<AspectRatio>content</AspectRatio>);
    const root = container.querySelector(
      '[data-slot="aspect-ratio"]',
    ) as HTMLElement;
    expect(root.style.aspectRatio).toBe(String(16 / 9));
  });

  it("applies a custom ratio as an inline style", () => {
    const { container } = render(<AspectRatio ratio={1}>sq</AspectRatio>);
    const root = container.querySelector(
      '[data-slot="aspect-ratio"]',
    ) as HTMLElement;
    expect(root.style.aspectRatio).toBe("1");
  });

  it("merges a custom className onto the base classes", () => {
    const { container } = render(
      <AspectRatio className="rounded-md">x</AspectRatio>,
    );
    const root = container.querySelector(
      '[data-slot="aspect-ratio"]',
    ) as HTMLElement;
    expect(root.className).toContain("rounded-md");
    expect(root.className).toContain("overflow-hidden");
  });

  it("forwards extra div props", () => {
    const { container } = render(
      <AspectRatio title="hello">x</AspectRatio>,
    );
    const root = container.querySelector(
      '[data-slot="aspect-ratio"]',
    ) as HTMLElement;
    expect(root.title).toBe("hello");
  });

  it("merges caller-supplied style with the ratio style", () => {
    const { container } = render(
      <AspectRatio ratio={2} style={{ width: "200px" }}>
        x
      </AspectRatio>,
    );
    const root = container.querySelector(
      '[data-slot="aspect-ratio"]',
    ) as HTMLElement;
    expect(root.style.width).toBe("200px");
    expect(root.style.aspectRatio).toBe("2");
  });

  it("module is importable", async () => {
    const mod = await import("./aspect-ratio");
    expect(mod.AspectRatio).toBeDefined();
  });
});
