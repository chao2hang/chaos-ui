import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { ImageGallery } from "./image-gallery"

const images = [
  { id: "1", src: "https://example.com/1.jpg", alt: "Image 1", caption: "Photo 1" },
  { id: "2", src: "https://example.com/2.jpg", alt: "Image 2" },
  { id: "3", src: "https://example.com/3.jpg", alt: "Image 3" },
]

describe("ImageGallery", () => {
  it("renders all images", () => {
    const { container } = render(<ImageGallery images={images} />)
    const imgs = container.querySelectorAll("img")
    expect(imgs.length).toBe(3)
  })

  it("renders captions", () => {
    const { container } = render(<ImageGallery images={images} />)
    expect(container.textContent).toContain("Photo 1")
  })

  it("renders with custom className", () => {
    const { container } = render(<ImageGallery images={images} className="custom-ig" />)
    expect(container.querySelector('[data-slot="image-gallery"]')?.className).toContain("custom-ig")
  })
})
