import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Message } from "./message";

describe("Message", () => {
  it("exports Message", () => {
    expect(Message).toBeDefined();
  });

  it("renders info variant by default", () => {
    const { container } = render(<Message>Info message</Message>);
    expect(screen.getByText("Info message")).toBeDefined();
    expect(container.querySelector('[data-variant="info"]')).not.toBeNull();
  });

  it("renders success variant", () => {
    const { container } = render(<Message variant="success">Success!</Message>);
    expect(container.querySelector('[data-variant="success"]')).not.toBeNull();
  });

  it("renders warning variant", () => {
    const { container } = render(<Message variant="warning">Warning!</Message>);
    expect(container.querySelector('[data-variant="warning"]')).not.toBeNull();
  });

  it("renders error variant", () => {
    const { container } = render(<Message variant="error">Error!</Message>);
    expect(container.querySelector('[data-variant="error"]')).not.toBeNull();
  });

  it("renders custom icon", () => {
    render(
      <Message icon={<span data-testid="custom-icon" />}>Custom icon</Message>,
    );
    expect(screen.getByTestId("custom-icon")).toBeDefined();
  });

  it("renders action element", () => {
    render(
      <Message action={<button data-testid="action-btn">Undo</button>}>
        With action
      </Message>,
    );
    expect(screen.getByTestId("action-btn")).toBeDefined();
  });

  it("has role status", () => {
    const { container } = render(<Message>Info</Message>);
    expect(container.querySelector('[role="status"]')).not.toBeNull();
  });

  it("has data-slot attribute", () => {
    const { container } = render(<Message>Info</Message>);
    expect(container.querySelector('[data-slot="message"]')).not.toBeNull();
  });

  it("module is importable", async () => {
    const mod = await import("./message");
    expect(mod.Message).toBeDefined();
  });
});
