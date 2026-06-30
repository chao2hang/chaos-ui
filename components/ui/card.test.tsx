import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  CardSection,
} from "./card";

describe("card", () => {
  it("exports Card", () => {
    expect(Card).toBeDefined();
  });
  it("exports CardHeader", () => {
    expect(CardHeader).toBeDefined();
  });
  it("exports CardFooter", () => {
    expect(CardFooter).toBeDefined();
  });
  it("exports CardTitle", () => {
    expect(CardTitle).toBeDefined();
  });
  it("exports CardAction", () => {
    expect(CardAction).toBeDefined();
  });
  it("exports CardDescription", () => {
    expect(CardDescription).toBeDefined();
  });
  it("exports CardContent", () => {
    expect(CardContent).toBeDefined();
  });
  it("exports CardSection", () => {
    expect(CardSection).toBeDefined();
  });

  it("Card renders root with default size data attribute", () => {
    const { container } = render(<Card>body</Card>);
    const card = container.querySelector('[data-slot="card"]') as HTMLElement;
    expect(card).not.toBeNull();
    expect(card.getAttribute("data-size")).toBe("default");
  });

  it("Card renders with sm size and flush data attribute", () => {
    const { container } = render(
      <Card size="sm" flush>
        body
      </Card>,
    );
    const card = container.querySelector('[data-slot="card"]') as HTMLElement;
    expect(card.getAttribute("data-size")).toBe("sm");
    expect(card.hasAttribute("data-flush")).toBe(true);
  });

  it("CardTitle renders children and respects explicit size=sm", () => {
    const { getByText, container } = render(
      <CardTitle size="sm">Title</CardTitle>,
    );
    expect(getByText("Title")).toBeDefined();
    const title = container.querySelector('[data-slot="card-title"]') as HTMLElement;
    expect(title.className).toContain("text-sm");
  });

  it("CardDescription renders muted text", () => {
    const { getByText, container } = render(
      <CardDescription>A description</CardDescription>,
    );
    expect(getByText("A description")).toBeDefined();
    const desc = container.querySelector('[data-slot="card-description"]') as HTMLElement;
    expect(desc.className).toContain("text-muted-foreground");
  });

  it("CardHeader renders a header slot", () => {
    const { container, getByText } = render(
      <CardHeader>
        <CardTitle>H</CardTitle>
      </CardHeader>,
    );
    expect(container.querySelector('[data-slot="card-header"]')).not.toBeNull();
    expect(getByText("H")).toBeDefined();
  });

  it("CardAction renders an action slot", () => {
    const { container, getByText } = render(
      <CardAction>
        <button type="button">Edit</button>
      </CardAction>,
    );
    expect(container.querySelector('[data-slot="card-action"]')).not.toBeNull();
    expect(getByText("Edit")).toBeDefined();
  });

  it("CardContent renders content slot", () => {
    const { container, getByText } = render(
      <CardContent>Inner content</CardContent>,
    );
    expect(container.querySelector('[data-slot="card-content"]')).not.toBeNull();
    expect(getByText("Inner content")).toBeDefined();
  });

  it("CardContent flush removes padding classes", () => {
    const { container } = render(<CardContent flush>edge</CardContent>);
    const content = container.querySelector('[data-slot="card-content"]') as HTMLElement;
    // flush → empty string for the px padding class branch (no "px-(--card-spacing)")
    expect(content.className).not.toContain("px-(--card-spacing)");
  });

  it("CardFooter renders footer slot with border classes", () => {
    const { container, getByText } = render(
      <CardFooter>Footer text</CardFooter>,
    );
    const footer = container.querySelector('[data-slot="card-footer"]') as HTMLElement;
    expect(footer).not.toBeNull();
    expect(footer.className).toContain("border-t");
    expect(getByText("Footer text")).toBeDefined();
  });

  it("CardSection renders a plain partition when no title/actions", () => {
    const { container, getByText } = render(
      <CardSection>section body</CardSection>,
    );
    expect(container.querySelector('[data-slot="card-section"]')).not.toBeNull();
    expect(getByText("section body")).toBeDefined();
    // no header row
    expect(container.querySelector('[data-slot="card-section"] .text-sm')).toBeNull();
  });

  it("CardSection renders title row when title provided", () => {
    const { container, getByText } = render(
      <CardSection title="My Section">body</CardSection>,
    );
    expect(getByText("My Section")).toBeDefined();
    expect(getByText("body")).toBeDefined();
    const section = container.querySelector('[data-slot="card-section"]') as HTMLElement;
    expect(section.querySelector(".font-semibold")).not.toBeNull();
  });

  it("CardSection renders actions when provided", () => {
    const { getByText, container } = render(
      <CardSection title="S" actions={<button type="button">Act</button>}>
        body
      </CardSection>,
    );
    expect(getByText("Act")).toBeDefined();
    expect(container.querySelector('[data-slot="card-section"] button')).not.toBeNull();
  });

  it("composes a full Card with header/content/footer", () => {
    const { container, getByText } = render(
      <Card>
        <CardHeader>
          <CardTitle>Report</CardTitle>
          <CardDescription>Monthly report</CardDescription>
          <CardAction>
            <button type="button">Export</button>
          </CardAction>
        </CardHeader>
        <CardContent>Content goes here</CardContent>
        <CardFooter>Footer note</CardFooter>
      </Card>,
    );
    expect(getByText("Report")).toBeDefined();
    expect(getByText("Monthly report")).toBeDefined();
    expect(getByText("Export")).toBeDefined();
    expect(getByText("Content goes here")).toBeDefined();
    expect(getByText("Footer note")).toBeDefined();
    expect(container.querySelector('[data-slot="card"]')).not.toBeNull();
  });
});
