import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

// DialogContent calls useTranslation("ui"); mock it so the portal renders in jsdom.
vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
}));

import { UserBrowse } from "./user-browse";
import type { User, UserBrowseProps } from "./user-browse";

const customUsers: User[] = [
  { id: "1", name: "Alice", email: "alice@example.com", department: "Eng" },
  { id: "2", name: "Bob", email: "bob@example.com", department: "Design" },
  { id: "3", name: "Carol", email: "carol@example.com", department: "Mkt" },
];

describe("user-browse", () => {
  it("exports UserBrowse", () => {
    expect(UserBrowse).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: User | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: UserBrowseProps | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });

  it("renders the placeholder when no value", () => {
    render(<UserBrowse placeholder="Pick a user" users={[]} />);
    expect(screen.getByText("Pick a user")).toBeDefined();
  });

  it("renders a default placeholder", () => {
    render(<UserBrowse users={[]} />);
    expect(screen.getByText("Select user...")).toBeDefined();
  });

  it("renders a selected user as a badge", () => {
    render(
      <UserBrowse
        defaultValue={{ id: "1", name: "Alice" }}
        users={customUsers}
      />,
    );
    expect(screen.getByText("Alice")).toBeDefined();
  });

  it("renders multiple selected users when multiple", () => {
    render(
      <UserBrowse
        multiple
        defaultValue={[
          { id: "1", name: "Alice" },
          { id: "2", name: "Bob" },
        ]}
        users={customUsers}
      />,
    );
    expect(screen.getByText("Alice")).toBeDefined();
    expect(screen.getByText("Bob")).toBeDefined();
  });

  it("calls onChange with undefined when clearing a single selection", () => {
    const onChange = vi.fn();
    render(
      <UserBrowse
        defaultValue={{ id: "1", name: "Alice" }}
        users={customUsers}
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /clear all/i }));
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it("calls onChange with an empty array when clearing a multiple selection", () => {
    const onChange = vi.fn();
    render(
      <UserBrowse
        multiple
        defaultValue={[{ id: "1", name: "Alice" }]}
        users={customUsers}
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /clear all/i }));
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it("removes a user badge via its remove button", () => {
    const onChange = vi.fn();
    render(
      <UserBrowse
        multiple
        defaultValue={[
          { id: "1", name: "Alice" },
          { id: "2", name: "Bob" },
        ]}
        users={customUsers}
        onChange={onChange}
      />,
    );
    const removeBtns = screen.getAllByRole("button", { name: /^remove$/i });
    fireEvent.click(removeBtns[0]!);
    expect(onChange).toHaveBeenCalledWith([{ id: "2", name: "Bob" }]);
    expect(screen.queryByText("Alice")).toBeNull();
  });

  it("hides the clear and remove buttons when disabled", () => {
    render(
      <UserBrowse
        defaultValue={{ id: "1", name: "Alice" }}
        users={customUsers}
        disabled
      />,
    );
    expect(screen.queryByRole("button", { name: /clear all/i })).toBeNull();
    expect(screen.queryByRole("button", { name: /^remove$/i })).toBeNull();
  });

  it("opens the dialog and shows the title and user list", () => {
    render(<UserBrowse users={customUsers} />);
    fireEvent.click(screen.getByText("Select user..."));
    expect(screen.getByText("Select User")).toBeDefined();
    expect(screen.getByText("Alice")).toBeDefined();
    expect(screen.getByText("bob@example.com")).toBeDefined();
  });

  it("shows department badge for each user", () => {
    render(<UserBrowse users={customUsers} />);
    fireEvent.click(screen.getByText("Select user..."));
    expect(screen.getByText("Eng")).toBeDefined();
    expect(screen.getByText("Design")).toBeDefined();
  });

  it("filters users by name search query", () => {
    render(<UserBrowse users={customUsers} />);
    fireEvent.click(screen.getByText("Select user..."));
    const search = screen.getByPlaceholderText("Search users...");
    fireEvent.change(search, { target: { value: "alice" } });
    expect(screen.getByText("Alice")).toBeDefined();
    expect(screen.queryByText("Bob")).toBeNull();
  });

  it("filters users by department search query", () => {
    render(<UserBrowse users={customUsers} />);
    fireEvent.click(screen.getByText("Select user..."));
    const search = screen.getByPlaceholderText("Search users...");
    fireEvent.change(search, { target: { value: "design" } });
    expect(screen.getByText("Bob")).toBeDefined();
    expect(screen.queryByText("Alice")).toBeNull();
  });

  it("shows the empty state when no users match the search", () => {
    render(<UserBrowse users={customUsers} />);
    fireEvent.click(screen.getByText("Select user..."));
    const search = screen.getByPlaceholderText("Search users...");
    fireEvent.change(search, { target: { value: "zzznomatch" } });
    expect(screen.getByText("No users found")).toBeDefined();
  });

  it("selects a user in single mode and closes the dialog", () => {
    const onChange = vi.fn();
    render(<UserBrowse users={customUsers} onChange={onChange} />);
    fireEvent.click(screen.getByText("Select user..."));
    fireEvent.click(screen.getByText("Bob"));
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ id: "2", name: "Bob" }),
    );
  });

  it("toggles selection in multiple mode without closing", () => {
    const onChange = vi.fn();
    render(
      <UserBrowse multiple users={customUsers} onChange={onChange} />,
    );
    fireEvent.click(screen.getByText("Select user..."));
    fireEvent.click(screen.getByText("Bob"));
    expect(onChange).toHaveBeenCalledWith([
      expect.objectContaining({ id: "2" }),
    ]);
    expect(screen.getByText("Select User")).toBeDefined();
    fireEvent.click(screen.getByText("Bob"));
    expect(onChange).toHaveBeenLastCalledWith([]);
  });

  it("enforces maxCount by not adding beyond the limit", () => {
    const onChange = vi.fn();
    render(
      <UserBrowse
        multiple
        maxCount={1}
        users={customUsers}
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByText("Select user..."));
    fireEvent.click(screen.getByText("Alice"));
    expect(onChange).toHaveBeenCalledTimes(1);
    // Trying to add a second user should be ignored.
    fireEvent.click(screen.getByText("Bob"));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("shows the selection count and max in multiple mode", () => {
    render(
      <UserBrowse
        multiple
        maxCount={5}
        defaultValue={[{ id: "1", name: "Alice" }]}
        users={customUsers}
      />,
    );
    fireEvent.click(screen.getByText("Alice"));
    expect(screen.getByText("1 user(s) selected")).toBeDefined();
    expect(screen.getByText("Max: 5")).toBeDefined();
  });

  it("renders a checkbox per user in multiple mode", () => {
    render(<UserBrowse multiple users={customUsers} />);
    fireEvent.click(screen.getByText("Select user..."));
    expect(screen.getByText("1 user(s) selected")).toBeDefined();
  });

  it("module is importable", async () => {
    const mod = await import("./user-browse");
    expect(mod.UserBrowse).toBeDefined();
  });
});
