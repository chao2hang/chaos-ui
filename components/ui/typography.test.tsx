import { describe, it, expect } from "vitest";
import {
  Typography,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Text,
  Paragraph,
  Blockquote,
  InlineCode,
  Lead,
  Large,
  Small,
  Muted,
  List,
} from "./typography";
import type { TextProps, ParagraphProps } from "./typography";

describe("typography", () => {
  it("exports Typography", () => {
    expect(Typography).toBeDefined();
  });

  it("exports H1", () => {
    expect(H1).toBeDefined();
  });

  it("exports H2", () => {
    expect(H2).toBeDefined();
  });

  it("exports H3", () => {
    expect(H3).toBeDefined();
  });

  it("exports H4", () => {
    expect(H4).toBeDefined();
  });

  it("exports H5", () => {
    expect(H5).toBeDefined();
  });

  it("exports H6", () => {
    expect(H6).toBeDefined();
  });

  it("exports Text", () => {
    expect(Text).toBeDefined();
  });

  it("exports Paragraph", () => {
    expect(Paragraph).toBeDefined();
  });

  it("exports Blockquote", () => {
    expect(Blockquote).toBeDefined();
  });

  it("exports InlineCode", () => {
    expect(InlineCode).toBeDefined();
  });

  it("exports Lead", () => {
    expect(Lead).toBeDefined();
  });

  it("exports Large", () => {
    expect(Large).toBeDefined();
  });

  it("exports Small", () => {
    expect(Small).toBeDefined();
  });

  it("exports Muted", () => {
    expect(Muted).toBeDefined();
  });

  it("exports List", () => {
    expect(List).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: TextProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: ParagraphProps | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
