import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { PreviewChrome } from "./preview-chrome";

describe("PreviewChrome", () => {
  it("calls onSceneChange when a scene tab is clicked", async () => {
    const user = userEvent.setup();
    const onSceneChange = vi.fn();
    render(
      <PreviewChrome
        scenes={[
          { id: "a", label: "A" },
          { id: "b", label: "B" },
        ]}
        activeScene="a"
        onSceneChange={onSceneChange}
      >
        <div>body</div>
      </PreviewChrome>,
    );
    await user.click(screen.getByRole("tab", { name: "B" }));
    expect(onSceneChange).toHaveBeenCalledWith("b");
  });

  it("calls onReset when reset is clicked", async () => {
    const user = userEvent.setup();
    const onReset = vi.fn();
    render(
      <PreviewChrome
        scenes={[{ id: "a", label: "A" }]}
        activeScene="a"
        onSceneChange={() => {}}
        onReset={onReset}
        resetLabel="Reset"
      >
        <div>body</div>
      </PreviewChrome>,
    );
    await user.click(screen.getByRole("button", { name: "Reset" }));
    expect(onReset).toHaveBeenCalled();
  });
});
