import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { logger } from "./logger";
import type { LogLevel } from "./logger";

describe("logger", () => {
  it("exports logger", () => {
    expect(logger).toBeDefined();
  });
  it("exports types", () => {
    const _tc1: LogLevel | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });

  describe("level gating", () => {
    let originalLevel: LogLevel;

    beforeEach(() => {
      originalLevel = logger.level;
      logger.setLevel("info");
    });

    afterEach(() => {
      logger.setLevel(originalLevel);
    });

    it("info logs when level is info", () => {
      const spy = vi.spyOn(console, "info");
      logger.info("hello", { a: 1 });
      expect(spy).toHaveBeenCalledTimes(1);
      const [prefix, ...rest] = spy.mock.calls[0]!;
      expect(String(prefix)).toMatch(/^\[\S+\] \[INFO\]$/);
      expect(rest).toEqual(["hello", { a: 1 }]);
    });

    it("debug is suppressed when level is info", () => {
      const debugSpy = vi.spyOn(console, "debug");
      logger.debug("nope");
      expect(debugSpy).not.toHaveBeenCalled();
    });

    it("warn logs at info level", () => {
      const spy = vi.spyOn(console, "warn");
      logger.warn("careful");
      expect(spy).toHaveBeenCalledTimes(1);
      expect(String(spy.mock.calls[0]![0])).toMatch(/\[WARN\]$/);
    });

    it("error logs at info level", () => {
      const spy = vi.spyOn(console, "error");
      logger.error("boom");
      expect(spy).toHaveBeenCalledTimes(1);
      expect(String(spy.mock.calls[0]![0])).toMatch(/\[ERROR\]$/);
    });

    it("setLevel to warn suppresses info and debug", () => {
      logger.setLevel("warn");
      const infoSpy = vi.spyOn(console, "info");
      const debugSpy = vi.spyOn(console, "debug");
      const warnSpy = vi.spyOn(console, "warn");
      logger.info("skip");
      logger.debug("skip");
      logger.warn("keep");
      expect(infoSpy).not.toHaveBeenCalled();
      expect(debugSpy).not.toHaveBeenCalled();
      expect(warnSpy).toHaveBeenCalledTimes(1);
    });

    it("setLevel to error only emits errors", () => {
      logger.setLevel("error");
      const debugSpy = vi.spyOn(console, "debug");
      const infoSpy = vi.spyOn(console, "info");
      const warnSpy = vi.spyOn(console, "warn");
      const errorSpy = vi.spyOn(console, "error");
      logger.debug("d");
      logger.info("i");
      logger.warn("w");
      logger.error("e");
      expect(debugSpy).not.toHaveBeenCalled();
      expect(infoSpy).not.toHaveBeenCalled();
      expect(warnSpy).not.toHaveBeenCalled();
      expect(errorSpy).toHaveBeenCalledTimes(1);
    });

    it("setLevel to debug emits everything", () => {
      logger.setLevel("debug");
      const debugSpy = vi.spyOn(console, "debug");
      const infoSpy = vi.spyOn(console, "info");
      const warnSpy = vi.spyOn(console, "warn");
      const errorSpy = vi.spyOn(console, "error");
      logger.debug("d");
      logger.info("i");
      logger.warn("w");
      logger.error("e");
      expect(debugSpy).toHaveBeenCalledTimes(1);
      expect(infoSpy).toHaveBeenCalledTimes(1);
      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy).toHaveBeenCalledTimes(1);
    });

    it("prefix includes an ISO timestamp", () => {
      const spy = vi.spyOn(console, "info");
      logger.info("x");
      const prefix = String(spy.mock.calls[0]![0]);
      // [2024-01-01T00:00:00.000Z] [INFO]
      const iso = prefix.slice(1, prefix.indexOf("] "));
      const d = new Date(iso);
      expect(d.toString()).not.toBe("Invalid Date");
    });

    it("level getter reflects setLevel", () => {
      logger.setLevel("warn");
      expect(logger.level).toBe("warn");
    });
  });
});
