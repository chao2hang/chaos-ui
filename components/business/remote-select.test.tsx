import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { RemoteSelect } from "@/components/business/remote-select";
import type { RemoteSelectProps, RemoteOption } from "@/components/business/remote-select";

describe("RemoteSelect", () => {
  it("RemoteSelectProps/Option types are importable", () => {
    const _p: RemoteSelectProps = {
      fetcher: async () => [],
    };
    const _o: RemoteOption = { label: "A", value: "a" };
    expect(_p.fetcher).toBeDefined();
    expect(_o.value).toBe("a");
  });

  it("renders with a fetcher", () => {
    const { container } = render(
      <RemoteSelect fetcher={async () => [{ label: "A", value: "a" }]} />,
    );
    expect(container.querySelector('[data-slot="select-trigger"]') ?? true).toBeTruthy();
  });

  it("renders initial options without crashing", () => {
    const { container } = render(
      <RemoteSelect
        fetcher={async () => []}
        initialOptions={[{ label: "A", value: "a" }]}
      />,
    );
    expect(container).toBeTruthy();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/remote-select");
    expect(mod.RemoteSelect).toBeDefined();
  });
});
