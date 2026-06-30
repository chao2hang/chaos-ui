import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { EmbedLayout } from "./embed-layout";

describe("EmbedLayout", () => {
  it("renders header and children", () => {
    render(
      <EmbedLayout header={<div>Embed Header</div>}>
        <p>Embed body content</p>
      </EmbedLayout>,
    );
    expect(screen.getByText("Embed Header")).toBeDefined();
    expect(screen.getByText("Embed body content")).toBeDefined();
  });

  it("renders only content when header omitted", () => {
    render(<EmbedLayout>Standalone content</EmbedLayout>);
    expect(screen.getByText("Standalone content")).toBeDefined();
    expect(screen.queryByText("Embed Header")).toBeNull();
  });
});
