import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ImageViewer } from "@/components/ui/image-viewer";
import type {
  ImageViewerProps,
  ImageViewerImage,
} from "@/components/ui/image-viewer";

const singleImage = [{ src: "/test.jpg", alt: "Test Image" }];
const multipleImages = [
  { src: "/img1.jpg", alt: "Image 1" },
  { src: "/img2.jpg", alt: "Image 2" },
  { src: "/img3.jpg", alt: "Image 3" },
];

describe("ImageViewer", () => {
  it("exports ImageViewer component", () => {
    expect(ImageViewer).toBeDefined();
    expect(typeof ImageViewer).toBe("function");
  });

  it("exports ImageViewerProps type", () => {
    const props: ImageViewerProps = {
      open: true,
      onOpenChange: () => {},
      images: [],
    };
    expect(props).toBeDefined();
  });

  it("exports ImageViewerImage type", () => {
    const img: ImageViewerImage = { src: "/test.jpg", alt: "Test" };
    expect(img).toBeDefined();
  });

  it("returns null when not open", () => {
    const { container } = render(
      <ImageViewer open={false} onOpenChange={() => {}} images={singleImage} />,
    );
    expect(container.innerHTML).toBe("");
  });

  it("returns null when images array is empty", () => {
    const { container } = render(
      <ImageViewer open={true} onOpenChange={() => {}} images={[]} />,
    );
    expect(container.innerHTML).toBe("");
  });

  it("renders the image viewer overlay when open", () => {
    render(
      <ImageViewer open={true} onOpenChange={() => {}} images={singleImage} />,
    );
    expect(screen.getByRole("img")).toBeDefined();
  });

  it("renders image with correct src and alt", () => {
    render(
      <ImageViewer open={true} onOpenChange={() => {}} images={singleImage} />,
    );
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/test.jpg");
    expect(img).toHaveAttribute("alt", "Test Image");
  });

  it("renders close button", () => {
    render(
      <ImageViewer open={true} onOpenChange={() => {}} images={singleImage} />,
    );
    expect(screen.getByLabelText("Close")).toBeDefined();
  });

  it("calls onOpenChange(false) when close button is clicked", () => {
    const onOpenChange = vi.fn();
    render(
      <ImageViewer
        open={true}
        onOpenChange={onOpenChange}
        images={singleImage}
      />,
    );
    fireEvent.click(screen.getByLabelText("Close"));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("calls onOpenChange(false) when overlay background is clicked", () => {
    const onOpenChange = vi.fn();
    const { container } = render(
      <ImageViewer
        open={true}
        onOpenChange={onOpenChange}
        images={singleImage}
      />,
    );
    const overlay = container.querySelector('[data-slot="image-viewer"]');
    expect(overlay).not.toBeNull();
    fireEvent.click(overlay!);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("does not call onOpenChange when image itself is clicked", () => {
    const onOpenChange = vi.fn();
    render(
      <ImageViewer
        open={true}
        onOpenChange={onOpenChange}
        images={singleImage}
      />,
    );
    fireEvent.click(screen.getByRole("img"));
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("renders prev/next buttons for multiple images", () => {
    render(
      <ImageViewer
        open={true}
        onOpenChange={() => {}}
        images={multipleImages}
      />,
    );
    expect(screen.getByLabelText("Previous")).toBeDefined();
    expect(screen.getByLabelText("Next")).toBeDefined();
  });

  it("does not render prev/next buttons for single image", () => {
    render(
      <ImageViewer open={true} onOpenChange={() => {}} images={singleImage} />,
    );
    expect(screen.queryByLabelText("Previous")).toBeNull();
    expect(screen.queryByLabelText("Next")).toBeNull();
  });

  it("navigates to next image on Next button click", () => {
    render(
      <ImageViewer
        open={true}
        onOpenChange={() => {}}
        images={multipleImages}
      />,
    );
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/img1.jpg");

    fireEvent.click(screen.getByLabelText("Next"));
    expect(screen.getByRole("img")).toHaveAttribute("src", "/img2.jpg");
  });

  it("navigates to previous image on Previous button click", () => {
    render(
      <ImageViewer
        open={true}
        onOpenChange={() => {}}
        images={multipleImages}
        index={1}
      />,
    );
    expect(screen.getByRole("img")).toHaveAttribute("src", "/img2.jpg");

    fireEvent.click(screen.getByLabelText("Previous"));
    expect(screen.getByRole("img")).toHaveAttribute("src", "/img1.jpg");
  });

  it("wraps around to last image when clicking Previous on first image", () => {
    render(
      <ImageViewer
        open={true}
        onOpenChange={() => {}}
        images={multipleImages}
      />,
    );
    fireEvent.click(screen.getByLabelText("Previous"));
    expect(screen.getByRole("img")).toHaveAttribute("src", "/img3.jpg");
  });

  it("wraps around to first image when clicking Next on last image", () => {
    render(
      <ImageViewer
        open={true}
        onOpenChange={() => {}}
        images={multipleImages}
        index={2}
      />,
    );
    fireEvent.click(screen.getByLabelText("Next"));
    expect(screen.getByRole("img")).toHaveAttribute("src", "/img1.jpg");
  });

  it("renders zoom controls", () => {
    render(
      <ImageViewer open={true} onOpenChange={() => {}} images={singleImage} />,
    );
    expect(screen.getByText("Zoom Out")).toBeDefined();
    expect(screen.getByText("Zoom In")).toBeDefined();
    expect(screen.getByText("Rotate")).toBeDefined();
  });

  it("displays zoom percentage", () => {
    render(
      <ImageViewer open={true} onOpenChange={() => {}} images={singleImage} />,
    );
    expect(screen.getByText("100%")).toBeDefined();
  });

  it("increases zoom on Zoom In click", () => {
    render(
      <ImageViewer open={true} onOpenChange={() => {}} images={singleImage} />,
    );
    fireEvent.click(screen.getByText("Zoom In"));
    expect(screen.getByText("125%")).toBeDefined();
  });

  it("decreases zoom on Zoom Out click", () => {
    render(
      <ImageViewer open={true} onOpenChange={() => {}} images={singleImage} />,
    );
    fireEvent.click(screen.getByText("Zoom Out"));
    expect(screen.getByText("75%")).toBeDefined();
  });

  it("does not zoom below 0.5x (50%)", () => {
    render(
      <ImageViewer open={true} onOpenChange={() => {}} images={singleImage} />,
    );
    // Click Zoom Out multiple times
    for (let i = 0; i < 5; i++) {
      fireEvent.click(screen.getByText("Zoom Out"));
    }
    expect(screen.getByText("50%")).toBeDefined();
  });

  it("does not zoom above 3x (300%)", () => {
    render(
      <ImageViewer open={true} onOpenChange={() => {}} images={singleImage} />,
    );
    for (let i = 0; i < 10; i++) {
      fireEvent.click(screen.getByText("Zoom In"));
    }
    expect(screen.getByText("300%")).toBeDefined();
  });

  it("rotates image on Rotate click", () => {
    render(
      <ImageViewer open={true} onOpenChange={() => {}} images={singleImage} />,
    );
    const img = screen.getByRole("img");
    expect(img.style.transform).toContain("rotate(0deg)");

    fireEvent.click(screen.getByText("Rotate"));
    expect(img.style.transform).toContain("rotate(90deg)");
  });

  it("displays image counter for multiple images", () => {
    render(
      <ImageViewer
        open={true}
        onOpenChange={() => {}}
        images={multipleImages}
      />,
    );
    expect(screen.getByText("1 / 3")).toBeDefined();
  });

  it("does not display image counter for single image", () => {
    render(
      <ImageViewer open={true} onOpenChange={() => {}} images={singleImage} />,
    );
    // No counter text like "1 / 1" should appear
    expect(screen.queryByText(/1 \/ 1/)).toBeNull();
  });

  it("starts at specified index", () => {
    render(
      <ImageViewer
        open={true}
        onOpenChange={() => {}}
        images={multipleImages}
        index={2}
      />,
    );
    expect(screen.getByRole("img")).toHaveAttribute("src", "/img3.jpg");
    expect(screen.getByText("3 / 3")).toBeDefined();
  });

  it("resets zoom and rotation when reopened", () => {
    const { rerender } = render(
      <ImageViewer open={true} onOpenChange={() => {}} images={singleImage} />,
    );
    // Zoom in and rotate
    fireEvent.click(screen.getByText("Zoom In"));
    fireEvent.click(screen.getByText("Rotate"));

    // Close
    rerender(
      <ImageViewer open={false} onOpenChange={() => {}} images={singleImage} />,
    );

    // Reopen
    rerender(
      <ImageViewer open={true} onOpenChange={() => {}} images={singleImage} />,
    );
    expect(screen.getByText("100%")).toBeDefined();
    expect(screen.getByRole("img").style.transform).toContain("rotate(0deg)");
  });

  it("renders image with empty alt when alt not provided", () => {
    const images = [{ src: "/no-alt.jpg" }];
    const { container } = render(
      <ImageViewer open={true} onOpenChange={() => {}} images={images} />,
    );
    const img = container.querySelector("img");
    expect(img).toHaveAttribute("alt", "");
  });
});
