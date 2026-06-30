import { describe, it, expect } from "vitest";
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
});
