import { describe, it, expect } from "vitest";
import { AccountBalance } from "./account-balance";
import type { AccountBalanceProps } from "./account-balance";

describe("account-balance", () => {
  it("exports AccountBalance", () => {
    expect(AccountBalance).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: AccountBalanceProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
