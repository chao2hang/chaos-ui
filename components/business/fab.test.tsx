import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Fab, FabSpeedDial, BackTop } from "@/components/ui/fab";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
}));

describe("fab", () => {
  it("exports Fab, FabSpeedDial, BackTop", () => {
    expect(Fab).toBeDefined();
    expect(FabSpeedDial).toBeDefined();
    expect(BackTop).toBeDefined();
  });

  it("renders Fab with label", () => {
    render(<Fab label="新建" />);
    expect(screen.getByText("新建")).toBeDefined();
  });

  it("renders Fab icon-only (no label)", () => {
    render(<Fab icon={<span data-testid="ic">+</span>} />);
    expect(screen.getByTestId("ic")).toBeDefined();
  });

  it("Fab fires onClick", () => {
    const onClick = vi.fn();
    render(<Fab label="go" onClick={onClick} />);
    fireEvent.click(screen.getByText("go"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("Fab applies data-slot and fixed position classes", () => {
    const { container } = render(<Fab label="x" position="bottom-left" />);
    const el = container.querySelector('[data-slot="fab"]');
    expect(el).not.toBeNull();
    expect(el?.className).toContain("fixed");
    expect(el?.className).toContain("left-4");
  });

  it("Fab renders bottom-center position class", () => {
    const { container } = render(<Fab label="x" position="bottom-center" />);
    expect(container.querySelector('[data-slot="fab"]')?.className).toContain(
      "left-1/2",
    );
  });

  it("FabSpeedDial opens actions on trigger click and fires action onClick", () => {
    const onAction = vi.fn();
    render(
      <FabSpeedDial
        icon={<span>t</span>}
        actions={[
          { icon: <span>a1</span>, label: "Action 1", onClick: onAction },
        ]}
      />,
    );
    // actions hidden initially
    expect(screen.queryByText("Action 1")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "fab.speedDialOpen" }));
    expect(screen.getByText("Action 1")).toBeDefined();
    fireEvent.click(screen.getByRole("button", { name: "Action 1" }));
    expect(onAction).toHaveBeenCalledTimes(1);
    // closed after action
    expect(screen.queryByText("Action 1")).toBeNull();
  });

  it("FabSpeedDial toggles aria-expanded and aria-label", () => {
    render(<FabSpeedDial icon={<span>t</span>} actions={[]} />);
    const trigger = screen.getByRole("button", { name: "fab.speedDialOpen" });
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(trigger);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(trigger.getAttribute("aria-label")).toBe("fab.speedDialClose");
  });

  it("BackTop renders nothing when below threshold", () => {
    // jsdom window.scrollY is 0 by default; threshold 400 → not visible
    const { container } = render(<BackTop />);
    expect(container.querySelector('[data-slot="back-top"]')).toBeNull();
  });

  it("BackTop becomes visible when scroll exceeds threshold", () => {
    Object.defineProperty(window, "scrollY", {
      writable: true,
      configurable: true,
      value: 500,
    });
    const addSpy = vi.spyOn(window, "addEventListener");
    const { container } = render(<BackTop threshold={400} />);
    // initial onScroll call sets visible=true
    expect(container.querySelector('[data-slot="back-top"]')).not.toBeNull();
    expect(addSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
  });
});
