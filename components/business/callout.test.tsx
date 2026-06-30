import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Callout } from "./callout";
import type { CalloutProps } from "./callout";

describe("Callout", () => {
  it("renders title and children", () => {
    render(
      <Callout title="注意" variant="warning">
        请核对数据
      </Callout>,
    );
    expect(screen.getByText("注意")).toBeDefined();
    expect(screen.getByText("请核对数据")).toBeDefined();
  });

  it("renders children without a title", () => {
    render(<Callout>普通提示</Callout>);
    expect(screen.getByText("普通提示")).toBeDefined();
  });

  it("exports types", () => {
    const _t: CalloutProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
