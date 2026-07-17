import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import {
  MessageCenter,
  messageCenter,
  useMessageCenter,
} from "./message-center";

vi.mock("react-i18next", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as Record<string, unknown>),
    useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
  };
});

async function openList(): Promise<void> {
  fireEvent.click(screen.getByLabelText(/notificationCenter\.ariaLabel/));
  await waitFor(() =>
    expect(screen.getByText("notificationCenter.title")).toBeDefined(),
  );
}

describe("MessageCenter", () => {
  beforeEach(() => {
    messageCenter.clear();
  });

  it("renders bell trigger with no unread badge when empty", () => {
    render(<MessageCenter />);
    expect(
      screen.getByLabelText(/notificationCenter\.ariaLabel/),
    ).toBeDefined();
  });

  it("shows unread badge after push", async () => {
    render(<MessageCenter useStore />);
    act(() => {
      messageCenter.push({
        id: "1",
        title: "流程到达",
        body: "报销单待审批",
        timestamp: Date.now(),
      });
    });
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("renders pushed item title inside the panel", async () => {
    render(<MessageCenter useStore />);
    act(() => {
      messageCenter.push({
        id: "1",
        title: "流程到达",
        body: "报销单待审批",
        timestamp: Date.now(),
      });
    });
    await openList();
    expect(screen.getByText("流程到达")).toBeInTheDocument();
  });

  it("marks all read via store", async () => {
    render(<MessageCenter useStore />);
    act(() => {
      messageCenter.push({ id: "1", title: "消息A", timestamp: Date.now() });
      messageCenter.push({ id: "2", title: "消息B", timestamp: Date.now() });
    });
    expect(screen.getByText("2")).toBeInTheDocument();
    act(() => {
      messageCenter.markAllRead();
    });
    expect(screen.queryByText("2")).not.toBeInTheDocument();
  });

  it("useMessageCenter hook returns items and api", () => {
    function Probe() {
      const mc = useMessageCenter();
      return <div data-testid="count">{mc.items.length}</div>;
    }
    render(
      <>
        <Probe />
        <MessageCenter useStore />
      </>,
    );
    expect(screen.getByTestId("count").textContent).toBe("0");
    act(() => {
      messageCenter.push({ id: "x", title: "t", timestamp: Date.now() });
    });
    expect(screen.getByTestId("count").textContent).toBe("1");
  });

  it("renders tabs when provided", async () => {
    render(
      <MessageCenter
        useStore={false}
        items={[
          { id: "1", title: "待办项", timestamp: Date.now(), category: "todo" },
        ]}
        tabs={[{ key: "todo", label: "待办", count: 1 }]}
      />,
    );
    await openList();
    expect(screen.getByText("待办")).toBeInTheDocument();
  });

  it("clears via store", () => {
    render(<MessageCenter useStore />);
    act(() => {
      messageCenter.push({ id: "1", title: "t", timestamp: Date.now() });
    });
    expect(screen.getByText("1")).toBeInTheDocument();
    act(() => {
      messageCenter.clear();
    });
    expect(screen.queryByText("1")).not.toBeInTheDocument();
  });
});
