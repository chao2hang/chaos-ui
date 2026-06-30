import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDataScope } from "./use-data-scope";

describe("useDataScope", () => {
  it("holds and patches scope", () => {
    const { result } = renderHook(() =>
      useDataScope<{ companyId: string; dept?: string }>({ companyId: "1" }),
    );
    expect(result.current.scope.companyId).toBe("1");
    act(() => result.current.patch({ dept: "eng" }));
    expect(result.current.scope.dept).toBe("eng");
    act(() => result.current.setScope({ companyId: "2" }));
    expect(result.current.scope.companyId).toBe("2");
  });

  it("reset restores initial", () => {
    const { result } = renderHook(() =>
      useDataScope<{ companyId: string }>({ companyId: "1" }),
    );
    act(() => result.current.setScope({ companyId: "9" }));
    act(() => result.current.reset());
    expect(result.current.scope.companyId).toBe("1");
  });

  it("subscribe fires on changes", () => {
    const { result } = renderHook(() =>
      useDataScope<{ companyId: string }>({ companyId: "1" }),
    );
    let seen = "";
    act(() => result.current.subscribe((s) => (seen = s.companyId)));
    act(() => result.current.setScope({ companyId: "5" }));
    expect(seen).toBe("5");
  });
});
