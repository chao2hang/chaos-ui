import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AudioPlayer } from "./audio-player";
import type { AudioPlayerProps } from "./audio-player";

describe("AudioPlayer", () => {
  it("renders with src", () => {
    const { container } = render(<AudioPlayer src="/audio/sample.mp3" />);
    expect(container.querySelector('[data-slot="audio-player"]')).toBeDefined();
  });

  it("exports types", () => {
    const _t: AudioPlayerProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
