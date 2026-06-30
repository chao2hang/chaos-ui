import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ImageGallery } from "./image-gallery";
import type { ImageGalleryProps } from "./image-gallery";

describe("ImageGallery", () => {
  const images = [
    { src: "/a.jpg", alt: "封面" },
    { src: "/b.jpg", alt: "内页" },
  ];

  it("renders the first image by default", () => {
    render(<ImageGallery images={images} />);
    const main = screen.getByAltText("封面") as HTMLImageElement;
    expect(main).toBeDefined();
    expect(main.getAttribute("src")).toBe("/a.jpg");
  });

  it("shows an empty state when there are no images", () => {
    render(<ImageGallery images={[]} />);
    expect(screen.getByText("暂无图片")).toBeDefined();
  });

  it("switches to the second image when its thumbnail is clicked", () => {
    render(<ImageGallery images={images} />);
    fireEvent.click(screen.getByRole("button", { name: "查看第 2 张图片" }));
    const main = screen.getByAltText("内页") as HTMLImageElement;
    expect(main.getAttribute("src")).toBe("/b.jpg");
  });

  it("advances to the next image via the next button", () => {
    render(<ImageGallery images={images} />);
    fireEvent.click(screen.getByRole("button", { name: "下一张" }));
    expect(
      (screen.getByAltText("内页") as HTMLImageElement).getAttribute("src"),
    ).toBe("/b.jpg");
  });

  it("toggles expanded state", () => {
    render(<ImageGallery images={images} />);
    const toggle = screen.getByRole("button", { name: "放大" });
    fireEvent.click(toggle);
    expect(screen.getByRole("button", { name: "缩小" })).toBeDefined();
    expect(toggle.getAttribute("aria-pressed")).toBe("true");
  });

  it("exports types", () => {
    const _tc: ImageGalleryProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });
});
