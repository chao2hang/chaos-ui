import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { VideoPlayer } from "./video-player"

describe("VideoPlayer", () => {
  it("renders with src", () => {
    const { container } = render(
      <VideoPlayer src="https://example.com/video.mp4" />,
    )
    expect(container.querySelector("media-player")).toBeTruthy()
  })

  it("renders with title", () => {
    const { container } = render(
      <VideoPlayer src="https://example.com/video.mp4" title="Test Video" />,
    )
    expect(container.textContent).toContain("Test Video")
  })

  it("renders with poster", () => {
    const { container } = render(
      <VideoPlayer
        src="https://example.com/video.mp4"
        title="Test"
        poster="https://example.com/poster.jpg"
      />,
    )
    expect(container.querySelector("media-player")).toBeTruthy()
  })

  it("renders with autoplay", () => {
    const { container } = render(
      <VideoPlayer
        src="https://example.com/video.mp4"
        title="Test"
        autoplay
      />,
    )
    expect(container.querySelector("media-player")).toBeTruthy()
  })

  it("renders with captions tracks", () => {
    const { container } = render(
      <VideoPlayer
        src="https://example.com/video.mp4"
        title="Test"
        captions={[{ src: "/subs.vtt", label: "English", lang: "en" }]}
      />,
    )
    const player = container.querySelector("media-player")
    expect(player).toBeTruthy()
  })

  it("renders with className", () => {
    const { container } = render(
      <VideoPlayer
        src="https://example.com/video.mp4"
        title="Test"
        className="custom-class"
      />,
    )
    expect(container.querySelector('[data-slot="video-player"]')?.className).toContain("custom-class")
  })
})
