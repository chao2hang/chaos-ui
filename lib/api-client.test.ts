import { describe, it, expect } from "vitest";
import { ApiClient, getApiClient } from "./api-client";
import type { ApiError } from "./api-client";

describe("api-client", () => {
  it("exports ApiClient", () => {
    expect(ApiClient).toBeDefined();
  });
  it("exports getApiClient", () => {
    expect(getApiClient).toBeDefined();
  });
  it("exports types", () => {
    const _tc1: ApiError | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
