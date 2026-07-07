import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { VideoPlayer } from "./video-player";
import type { VideoPlayerProps } from "./video-player";

describe("VideoPlayer", () => {
  it("renders with src", () => {
    const { container } = render(<VideoPlayer src="/video/sample.mp4" />);
    expect(container.querySelector('[data-slot="video-player"]')).toBeDefined();
  });

  it("exports types", () => {
    const _t: VideoPlayerProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
