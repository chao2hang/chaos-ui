import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChatImageGallery } from "./chat-image-gallery";
import type { ChatImageGalleryProps } from "./chat-image-gallery";

describe("chat-image-gallery", () => {
  it("exports ChatImageGallery", () => {
    expect(ChatImageGallery).toBeDefined();
  });

  it("exports types", () => {
    const _tc: ChatImageGalleryProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders image alt text", () => {
    render(<ChatImageGallery images={[{ src: "/a.png", alt: "Diagram" }]} />);
    expect(screen.getByRole("link", { name: "Diagram" })).toBeDefined();
  });

  it("renders a gallery label for multiple images", () => {
    render(
      <ChatImageGallery
        images={[
          { src: "/a.png" },
          { src: "/b.png" },
          { src: "/c.png" },
        ]}
      />,
    );
    expect(screen.getByRole("group", { name: "Image gallery, 3 images" })).toBeDefined();
  });
});
