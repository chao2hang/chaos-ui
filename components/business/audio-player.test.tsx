import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { AudioPlayer } from "./audio-player"

describe("AudioPlayer", () => {
  it("renders with src", () => {
    const { container } = render(
      <AudioPlayer src="https://example.com/audio.mp3" />,
    )
    expect(container.querySelector("media-player")).toBeTruthy()
  })

  it("renders with title and artist", () => {
    const { container } = render(
      <AudioPlayer
        src="https://example.com/audio.mp3"
        title="Test Song"
        artist="Test Artist"
      />,
    )
    expect(container.textContent).toContain("Test Song")
    expect(container.textContent).toContain("Test Artist")
  })

  it("renders with cover image", () => {
    const { container } = render(
      <AudioPlayer
        src="https://example.com/audio.mp3"
        title="Test Song"
        cover="https://example.com/cover.jpg"
      />,
    )
    expect(container.querySelector("img")).toBeTruthy()
  })

  it("renders with className", () => {
    const { container } = render(
      <AudioPlayer
        src="https://example.com/audio.mp3"
        title="Test"
        className="custom-audio"
      />,
    )
    expect(container.querySelector('[data-slot="audio-player"]')?.className).toContain("custom-audio")
  })
})
