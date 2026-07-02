import { describe, it, expect } from "vitest";
import type {
  KeyboardShortcutDialogProps,
  ShortcutGroup,
  ShortcutItem,
} from "@/components/ui/keyboard-shortcut-dialog";

// KeyboardShortcutDialog uses CommandDialog which depends on @base-ui/react
// Dialog. The dialog rendering lifecycle (portal, focus trap, backdrop)
// is not fully supported in jsdom, so we test type exports + module
// importability here. Behavioral tests live in Storybook stories.

describe("KeyboardShortcutDialog", () => {
  it("module is importable", async () => {
    const mod = await import("@/components/ui/keyboard-shortcut-dialog");
    expect(mod.KeyboardShortcutDialog).toBeDefined();
  });

  it("KeyboardShortcutDialog is a function component", async () => {
    const { KeyboardShortcutDialog } = await import(
      "@/components/ui/keyboard-shortcut-dialog"
    );
    expect(typeof KeyboardShortcutDialog).toBe("function");
  });

  it("KeyboardShortcutDialogProps type is usable", () => {
    const props: KeyboardShortcutDialogProps = {
      open: true,
      groups: [
        {
          title: "Navigation",
          shortcuts: [{ keys: ["Ctrl", "K"], description: "Open palette" }],
        },
      ],
    };
    expect(props.open).toBe(true);
    expect(props.groups).toHaveLength(1);
    expect(props.groups[0]!.title).toBe("Navigation");
  });

  it("ShortcutGroup type is usable", () => {
    const group: ShortcutGroup = {
      title: "Editing",
      shortcuts: [
        { keys: ["Ctrl", "Z"], description: "Undo" },
        { keys: ["Ctrl", "Shift", "Z"], description: "Redo", action: () => {} },
      ],
    };
    expect(group.title).toBe("Editing");
    expect(group.shortcuts).toHaveLength(2);
    expect(group.shortcuts[1]!.action).toBeDefined();
  });

  it("ShortcutItem type is usable", () => {
    const item: ShortcutItem = {
      keys: ["Ctrl", "S"],
      description: "Save file",
      action: () => {},
    };
    expect(item.keys).toEqual(["Ctrl", "S"]);
    expect(item.description).toBe("Save file");
    expect(typeof item.action).toBe("function");
  });

  it("ShortcutItem action is optional", () => {
    const item: ShortcutItem = {
      keys: ["Ctrl", "P"],
      description: "Print",
    };
    expect(item.action).toBeUndefined();
  });

  it("KeyboardShortcutDialogProps supports optional fields", () => {
    const props: KeyboardShortcutDialogProps = {
      groups: [],
    };
    expect(props.open).toBeUndefined();
    expect(props.onOpenChange).toBeUndefined();
    expect(props.title).toBeUndefined();
    expect(props.placeholder).toBeUndefined();
    expect(props.className).toBeUndefined();
  });

  it("KeyboardShortcutDialogProps supports all fields", () => {
    const props: KeyboardShortcutDialogProps = {
      open: false,
      onOpenChange: (_open: boolean) => {},
      groups: [{ title: "G", shortcuts: [] }],
      title: "My Shortcuts",
      placeholder: "Search...",
      className: "custom-class",
    };
    expect(props.open).toBe(false);
    expect(props.title).toBe("My Shortcuts");
    expect(props.placeholder).toBe("Search...");
    expect(props.className).toBe("custom-class");
  });
});
