import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RedPacket } from "./red-packet";
import type { RedPacketProps } from "./red-packet";

describe("RedPacket", () => {
  it("renders label", () => {
    render(<RedPacket label="¥8.88" />);
    expect(screen.getByText("¥8.88")).toBeDefined();
  });

  it("exports types", () => {
    const _t: RedPacketProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
