import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

// DialogContent calls useTranslation("ui"); mock it so the portal renders in jsdom.
vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
}));

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "./alert-dialog";

describe("alert-dialog", () => {
  it("exports AlertDialog", () => {
    expect(AlertDialog).toBeDefined();
  });
  it("exports AlertDialogTrigger", () => {
    expect(AlertDialogTrigger).toBeDefined();
  });
  it("exports AlertDialogContent", () => {
    expect(AlertDialogContent).toBeDefined();
  });
  it("exports AlertDialogHeader", () => {
    expect(AlertDialogHeader).toBeDefined();
  });
  it("exports AlertDialogTitle", () => {
    expect(AlertDialogTitle).toBeDefined();
  });
  it("exports AlertDialogDescription", () => {
    expect(AlertDialogDescription).toBeDefined();
  });
  it("exports AlertDialogFooter", () => {
    expect(AlertDialogFooter).toBeDefined();
  });
  it("exports AlertDialogAction", () => {
    expect(AlertDialogAction).toBeDefined();
  });
  it("exports AlertDialogCancel", () => {
    expect(AlertDialogCancel).toBeDefined();
  });

  it("renders the trigger button label", () => {
    render(
      <AlertDialog>
        <AlertDialogTrigger render={<button type="button">Open dialog</button>} />
      </AlertDialog>,
    );
    expect(screen.getByText("Open dialog")).toBeDefined();
  });

  it("renders title and description when controlled open", () => {
    render(
      <AlertDialog open>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>,
    );
    expect(screen.getByText("Are you sure?")).toBeDefined();
    expect(screen.getByText("This cannot be undone.")).toBeDefined();
  });

  it("renders footer with action and cancel buttons and fires onClick", () => {
    const onAction = vi.fn();
    const onCancel = vi.fn();
    render(
      <AlertDialog open>
        <AlertDialogContent showCloseButton={false}>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onAction}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>,
    );
    fireEvent.click(screen.getByText("Confirm"));
    expect(onAction).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByText("Cancel"));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("AlertDialogCancel renders with outline variant styling", () => {
    render(
      <AlertDialog open>
        <AlertDialogContent showCloseButton={false}>
          <AlertDialogFooter>
            <AlertDialogCancel>Dismiss</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>,
    );
    expect(screen.getByText("Dismiss")).toBeDefined();
  });

  it("opens the dialog when the trigger is clicked", () => {
    render(
      <AlertDialog>
        <AlertDialogTrigger render={<button type="button">Show</button>} />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Dialog Body</AlertDialogTitle>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>,
    );
    // Initially closed: body not present.
    expect(screen.queryByText("Dialog Body")).toBeNull();
    fireEvent.click(screen.getByText("Show"));
    expect(screen.getByText("Dialog Body")).toBeDefined();
  });

  it("module is importable", async () => {
    const mod = await import("./alert-dialog");
    expect(mod.AlertDialog).toBeDefined();
    expect(mod.AlertDialogContent).toBeDefined();
  });
});
