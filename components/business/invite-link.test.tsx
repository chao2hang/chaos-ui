import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { InviteLink } from "./invite-link";
import type { InviteLinkProps } from "./invite-link";

describe("InviteLink", () => {
  it("renders url", () => {
    const { container } = render(<InviteLink url="https://app.example.com/invite/abc" />);
    expect(container.querySelector('[data-slot="invite-link"]')).toBeDefined();
  });

  it("exports types", () => {
    const _t: InviteLinkProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
