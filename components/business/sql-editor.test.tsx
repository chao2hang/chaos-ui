import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { SqlEditor } from "./sql-editor";

describe("SqlEditor", () => {
  it("renders with a SQL query", () => {
    const { container } = render(
      <SqlEditor value="SELECT id, name FROM users WHERE active = 1" />,
    );
    expect(container.querySelector(".cm-editor")).toBeDefined();
  });

  it("supports MySQL dialect", () => {
    const { container } = render(
      <SqlEditor value="SELECT NOW()" dialect="mysql" />,
    );
    expect(container.querySelector(".cm-editor")).toBeDefined();
  });

  it("supports PostgreSQL dialect", () => {
    const { container } = render(
      <SqlEditor value="SELECT NOW()::text" dialect="postgresql" />,
    );
    expect(container.querySelector(".cm-editor")).toBeDefined();
  });

  it("accepts readOnly prop", () => {
    const { container } = render(<SqlEditor value="SELECT 1" readOnly />);
    expect(container.querySelector(".cm-editor")).toBeDefined();
  });
});
