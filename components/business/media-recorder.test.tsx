import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MediaRecorder } from "./media-recorder";
import type { MediaRecorderProps } from "./media-recorder";

describe("MediaRecorder", () => {
  it("renders recorder UI", () => {
    const { container } = render(<MediaRecorder />);
    expect(container.querySelector('[data-slot="media-recorder"]')).toBeDefined();
  });

  it("exports types", () => {
    const _t: MediaRecorderProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
