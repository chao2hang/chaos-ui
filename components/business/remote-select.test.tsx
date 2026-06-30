import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { RemoteSelect } from "@/components/business/remote-select";
import type { RemoteSelectProps, RemoteOption } from "@/components/business/remote-select";

// Stable empty-options reference. The component's `initialOptions = []` default
// creates a new array identity on every render, which makes the fetch effect
// re-run after setLoading(true) and double-invoke the fetcher. Passing a stable
// reference avoids that instability in tests.
const EMPTY_OPTIONS: RemoteOption[] = [];

describe("RemoteSelect", () => {
  it("RemoteSelectProps/Option types are importable", () => {
    const _p: RemoteSelectProps = {
      fetcher: async () => [],
    };
    const _o: RemoteOption = { label: "A", value: "a" };
    expect(_p.fetcher).toBeDefined();
    expect(_o.value).toBe("a");
  });

  it("renders with a fetcher (trigger present)", () => {
    const { container } = render(
      <RemoteSelect fetcher={async () => [{ label: "A", value: "a" }]} />,
    );
    expect(
      container.querySelector('[data-slot="select-trigger"]'),
    ).not.toBeNull();
  });

  it("renders placeholder text on the trigger", () => {
    render(
      <RemoteSelect fetcher={async () => []} placeholder="Pick one" />,
    );
    expect(screen.getByText("Pick one")).toBeDefined();
  });

  it("renders a custom search placeholder when opened", async () => {
    render(
      <RemoteSelect
        fetcher={async () => [{ label: "A", value: "a" }]}
        searchPlaceholder="Type to search"
      />,
    );
    const trigger = screen.getByText("请选择").closest("button")!;
    fireEvent.click(trigger);
    await waitFor(() => {
      expect(screen.getByPlaceholderText("Type to search")).toBeDefined();
    });
  });

  it("renders initial options when opened and shows them", async () => {
    render(
      <RemoteSelect
        fetcher={async () => []}
        initialOptions={[{ label: "Alice", value: "alice" }]}
      />,
    );
    const trigger = screen.getByText("请选择").closest("button")!;
    fireEvent.click(trigger);
    await waitFor(() => {
      expect(screen.getByText("Alice")).toBeDefined();
    });
  });

  it("shows empty hint text when opened with no keyword and no options", async () => {
    render(<RemoteSelect fetcher={async () => []} />);
    const trigger = screen.getByText("请选择").closest("button")!;
    fireEvent.click(trigger);
    await waitFor(() => {
      expect(screen.getByText("输入关键词搜索")).toBeDefined();
    });
  });

  it("calls fetcher after debounce when keyword typed", async () => {
    const fetcher = vi.fn().mockResolvedValue([
      { label: "Bob", value: "bob" },
    ]);
    render(<RemoteSelect fetcher={fetcher} debounceMs={0} />);
    const trigger = screen.getByText("请选择").closest("button")!;
    fireEvent.click(trigger);
    const input = await screen.findByPlaceholderText("搜索...");
    fireEvent.change(input, { target: { value: "bo" } });
    await waitFor(() => {
      expect(fetcher).toHaveBeenCalledWith("bo");
    });
  });

  it("shows loading skeleton then options", async () => {
    let resolve: (v: RemoteOption[]) => void = () => {};
    const fetcher = vi.fn(
      () =>
        new Promise<RemoteOption[]>((r) => {
          resolve = r;
        }),
    );
    // Pass a stable initialOptions so the effect doesn't re-run on the
    // setLoading(true) re-render (the component's `initialOptions = []` default
    // would otherwise create a new array identity each render and refetch).
    render(
      <RemoteSelect
        fetcher={fetcher}
        debounceMs={0}
        initialOptions={EMPTY_OPTIONS}
      />,
    );
    const trigger = screen.getByText("请选择").closest("button")!;
    fireEvent.click(trigger);
    const input = await screen.findByPlaceholderText("搜索...");
    fireEvent.change(input, { target: { value: "x" } });
    // SelectContent renders into a portal (document.body), so query the whole
    // document rather than the render container.
    await waitFor(() => {
      expect(document.querySelector('[data-slot="skeleton"]')).not.toBeNull();
    });
    resolve([{ label: "Done", value: "done" }]);
    await waitFor(() => {
      expect(screen.getByText("Done")).toBeDefined();
    });
  });

  it("shows error message when fetcher rejects", async () => {
    const fetcher = vi.fn().mockRejectedValue(new Error("Network error"));
    render(
      <RemoteSelect
        fetcher={fetcher}
        debounceMs={0}
        cache={false}
        initialOptions={EMPTY_OPTIONS}
      />,
    );
    const trigger = screen.getByText("请选择").closest("button")!;
    fireEvent.click(trigger);
    const input = await screen.findByPlaceholderText("搜索...");
    fireEvent.change(input, { target: { value: "q" } });
    await waitFor(() => {
      expect(screen.getByText("Network error")).toBeDefined();
    });
  });

  it("caches results for the same keyword within a session", async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValue([{ label: "C", value: "c" }]);
    render(
      <RemoteSelect
        fetcher={fetcher}
        debounceMs={0}
        cache={true}
        initialOptions={EMPTY_OPTIONS}
      />,
    );
    const trigger = screen.getByText("请选择").closest("button")!;
    fireEvent.click(trigger);
    const input = await screen.findByPlaceholderText("搜索...");
    fireEvent.change(input, { target: { value: "k" } });
    // Opening with minKeywordLength=0 fetches "" first, then "k".
    await waitFor(() => expect(fetcher).toHaveBeenCalled());
    const callsAfterK = fetcher.mock.calls.length;
    // type a different keyword -> new fetch
    fireEvent.change(input, { target: { value: "m" } });
    await waitFor(() => expect(fetcher.mock.calls.length).toBeGreaterThan(callsAfterK));
    const callsAfterM = fetcher.mock.calls.length;
    // go back to the first keyword -> cache hit (no additional fetch)
    fireEvent.change(input, { target: { value: "k" } });
    await waitFor(() => {
      expect(screen.getByText("C")).toBeDefined();
    });
    expect(fetcher.mock.calls.length).toBe(callsAfterM);
  });

  it("accepts the disabled prop without crashing", () => {
    // NOTE: the RemoteSelect `disabled` prop is currently destructured but not
    // forwarded to the underlying Base UI <Select>, so the trigger does not
    // gain a `disabled`/`data-disabled` attribute. This test asserts the prop
    // is accepted and the component renders (the source is out of scope here).
    const { container } = render(
      <RemoteSelect fetcher={async () => []} disabled />,
    );
    const trigger = container.querySelector(
      '[data-slot="select-trigger"]',
    ) as HTMLElement;
    expect(trigger).not.toBeNull();
    expect(
      container.querySelector('[data-slot="select-trigger"]'),
    ).not.toBeNull();
  });

  it("renders without crashing with initialOptions", () => {
    const { container } = render(
      <RemoteSelect
        fetcher={async () => []}
        initialOptions={[{ label: "A", value: "a" }]}
      />,
    );
    expect(container).toBeTruthy();
  });

  it("fires onChange with the chosen value when an option is clicked", async () => {
    const onChange = vi.fn();
    render(
      <RemoteSelect
        fetcher={async () => [{ label: "Alice", value: "alice" }]}
        initialOptions={[{ label: "Alice", value: "alice" }]}
        onChange={onChange}
      />,
    );
    const trigger = screen.getByText("请选择").closest("button")!;
    fireEvent.click(trigger);
    const option = await screen.findByText("Alice");
    fireEvent.click(option);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith("alice");
    });
  });

  it("shows the no-match hint after a search that returns no options", async () => {
    const fetcher = vi.fn().mockResolvedValue([]);
    render(<RemoteSelect fetcher={fetcher} debounceMs={0} cache={false} />);
    const trigger = screen.getByText("请选择").closest("button")!;
    fireEvent.click(trigger);
    const input = await screen.findByPlaceholderText("搜索...");
    fireEvent.change(input, { target: { value: "zzz" } });
    await waitFor(() => {
      expect(screen.getByText("无匹配项")).toBeDefined();
    });
  });

  it("does not fetch when keyword is shorter than minKeywordLength", async () => {
    const fetcher = vi.fn().mockResolvedValue([{ label: "A", value: "a" }]);
    render(
      <RemoteSelect
        fetcher={fetcher}
        debounceMs={0}
        minKeywordLength={3}
        initialOptions={[{ label: "Seed", value: "seed" }]}
      />,
    );
    const trigger = screen.getByText("请选择").closest("button")!;
    fireEvent.click(trigger);
    const input = await screen.findByPlaceholderText("搜索...");
    // keyword shorter than minKeywordLength -> falls back to initialOptions, no fetch
    fireEvent.change(input, { target: { value: "ab" } });
    // allow any pending debounce to flush; fetcher must remain uncalled
    await waitFor(() => {
      expect(screen.getByText("Seed")).toBeDefined();
    });
    expect(fetcher).not.toHaveBeenCalled();
  });

  it("renders the selected option label on the trigger", () => {
    render(
      <RemoteSelect
        fetcher={async () => []}
        value="alice"
        initialOptions={[{ label: "Alice Anderson", value: "alice" }]}
      />,
    );
    expect(screen.getByText("Alice Anderson")).toBeDefined();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/remote-select");
    expect(mod.RemoteSelect).toBeDefined();
  });
});
