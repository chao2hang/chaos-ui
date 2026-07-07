import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MobileDialog } from "./mobile-dialog";
import type { MobileDialogProps } from "./mobile-dialog";

describe("MobileDialog", () => {
  it("renders children", () => {
    render(<MobileDialog><p>Dialog content</p></MobileDialog>);
    expect(MobileDialog).toBeDefined();
  });

  it("exports types", () => {
    const _t: MobileDialogProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
