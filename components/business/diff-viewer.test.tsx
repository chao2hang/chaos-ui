import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DiffViewer } from "./diff-viewer";
import type {
  DiffChangeType,
  DiffViewerItem,
  DiffViewerProps,
} from "./diff-viewer";

describe("diff-viewer", () => {
  it("exports DiffViewer", () => {
    expect(DiffViewer).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: DiffChangeType | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: DiffViewerItem | undefined = undefined;
    expect(_tc2).toBeUndefined();
    const _tc3: DiffViewerProps | undefined = undefined;
    expect(_tc3).toBeUndefined();
  });

  it("renders header labels with defaults", () => {
    render(<DiffViewer items={[]} />);
    expect(screen.getByText("Field")).toBeDefined();
    expect(screen.getByText("Before")).toBeDefined();
    expect(screen.getByText("After")).toBeDefined();
    expect(screen.getByText("Change")).toBeDefined();
  });

  it("renders custom header labels", () => {
    render(<DiffViewer items={[]} beforeLabel="原值" afterLabel="新值" />);
    expect(screen.getByText("原值")).toBeDefined();
    expect(screen.getByText("新值")).toBeDefined();
  });

  it("renders item label falling back to field when label missing", () => {
    render(
      <DiffViewer
        items={[
          { field: "name", before: "Alice", after: "Bob", type: "changed" },
        ]}
      />,
    );
    expect(screen.getByText("name")).toBeDefined();
  });

  it("renders provided item label", () => {
    render(
      <DiffViewer
        items={[
          {
            field: "name",
            label: "Name",
            before: "Alice",
            after: "Bob",
            type: "changed",
          },
        ]}
      />,
    );
    expect(screen.getByText("Name")).toBeDefined();
  });

  it("defaults type to changed when omitted", () => {
    render(<DiffViewer items={[{ field: "f", before: "a", after: "b" }]} />);
    expect(screen.getByText("changed")).toBeDefined();
  });

  it("renders dash when before/after undefined", () => {
    render(<DiffViewer items={[{ field: "f", type: "unchanged" }]} />);
    const dashes = screen.getAllByText("-");
    expect(dashes.length).toBeGreaterThanOrEqual(2);
  });

  it("renders badges for each change type", () => {
    render(
      <DiffViewer
        items={[
          { field: "a", before: "x", after: "y", type: "added" },
          { field: "b", before: "x", after: "", type: "removed" },
          { field: "c", before: "x", after: "z", type: "changed" },
          { field: "d", before: "x", after: "x", type: "unchanged" },
        ]}
      />,
    );
    expect(screen.getByText("added")).toBeDefined();
    expect(screen.getByText("removed")).toBeDefined();
    expect(screen.getByText("changed")).toBeDefined();
    expect(screen.getByText("unchanged")).toBeDefined();
  });

  it("applies data-slot and forwards extra div props", () => {
    const { container } = render(
      <DiffViewer items={[]} data-testid="diff" role="group" />,
    );
    expect(container.querySelector('[data-slot="diff-viewer"]')).not.toBeNull();
    expect(container.querySelector('[data-testid="diff"]')).not.toBeNull();
  });

  it("renders react-node before/after values", () => {
    render(
      <DiffViewer
        items={[
          {
            field: "f",
            before: <strong>old</strong>,
            after: <em>new</em>,
            type: "changed",
          },
        ]}
      />,
    );
    expect(screen.getByText("old")).toBeDefined();
    expect(screen.getByText("new")).toBeDefined();
  });
});
