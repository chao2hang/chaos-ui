import { render, screen } from "@testing-library/react";
import type { ComponentType } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ComponentPreviewImpl } from "./component-preview-impl";

const mocks = vi.hoisted(() => ({
  previews: {} as Record<string, ComponentType>,
  storyPreviews: {} as Record<string, ComponentType>,
}));

vi.mock("@/components/component-previews", () => ({
  componentPreviews: mocks.previews,
}));

vi.mock("@/components/component-story-previews", () => ({
  componentStoryPreviews: mocks.storyPreviews,
}));

function resetMocks() {
  for (const key of Object.keys(mocks.previews)) delete mocks.previews[key];
  for (const key of Object.keys(mocks.storyPreviews))
    delete mocks.storyPreviews[key];
}

function assertPreviewFallback(name: string) {
  expect(
    screen.getByText(/No live preview available for/i),
  ).toBeInTheDocument();
  expect(screen.getByText(name)).toBeInTheDocument();
}

describe("ComponentPreviewImpl", () => {
  afterEach(() => {
    resetMocks();
    vi.clearAllMocks();
  });

  it("renders the no-live-preview fallback when no demo or story exists", () => {
    render(<ComponentPreviewImpl name="Ghost" />);

    assertPreviewFallback("Ghost");
  });

  it("prefers hand-authored previews over story previews", () => {
    mocks.previews.Button = () => <div>Hand preview</div>;
    mocks.storyPreviews.Button = () => <div>Story preview</div>;

    render(<ComponentPreviewImpl name="Button" />);

    expect(screen.getByText("Hand preview")).toBeInTheDocument();
    expect(screen.queryByText("Story preview")).not.toBeInTheDocument();
  });

  it("uses story previews when no hand-authored demo exists", () => {
    mocks.storyPreviews.Alert = () => <div>Story alert</div>;

    render(<ComponentPreviewImpl name="Alert" />);

    expect(screen.getByText("Story alert")).toBeInTheDocument();
  });

  it("uses story previews for business components", () => {
    mocks.storyPreviews.DataTable = () => <div>Rows preview</div>;

    render(<ComponentPreviewImpl name="DataTable" />);

    expect(screen.getByText("Rows preview")).toBeInTheDocument();
    expect(
      screen.queryByText(/No live preview available for/i),
    ).not.toBeInTheDocument();
  });

  it("shows the fallback when no demo or story is registered", () => {
    render(<ComponentPreviewImpl name="UnknownComponent" />);

    assertPreviewFallback("UnknownComponent");
  });
});
