"use client";
import * as React from "react";

/**
 * @hook usePrint
 * @category Data
 * @since 1.0.0-beta.0
 * @description Programmatic print helper: print a DOM node (via clone into a hidden iframe) or the whole window, with before/after hooks and cleanup.
 * @example
 * const { print, isPrinting } = usePrint();
 * await print(ref.current, { title: "Invoice" });
 */
export interface UsePrintOptions {
  title?: string;
  beforePrint?: () => void;
  afterPrint?: () => void;
  cssText?: string;
}

export interface UsePrintResult {
  print: (target?: HTMLElement | null, options?: UsePrintOptions) => Promise<void>;
  isPrinting: boolean;
}

export function usePrint(): UsePrintResult {
  const [isPrinting, setIsPrinting] = React.useState(false);

  const print = React.useCallback(
    async (target?: HTMLElement | null, options: UsePrintOptions = {}) => {
      if (typeof window === "undefined") return;
      const { title, beforePrint, afterPrint } = options;
      setIsPrinting(true);
      beforePrint?.();
      try {
        if (target) {
          await printNode(target, options);
        } else {
          window.print();
        }
        if (title) document.title = title;
      } finally {
        afterPrint?.();
        setIsPrinting(false);
      }
    },
    [],
  );

  return { print, isPrinting };
}

function printNode(node: HTMLElement, options: UsePrintOptions): Promise<void> {
  return new Promise((resolve) => {
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) {
      document.body.removeChild(iframe);
      resolve();
      return;
    }
    doc.open();
    doc.write(`<!doctype html><html><head><title>${options.title ?? ""}</title>`);
    if (options.cssText) {
      doc.write(`<style>${options.cssText}</style>`);
    }
    doc.write(`</head><body>${node.outerHTML}</body></html>`);
    doc.close();

    const cleanup = () => {
      document.body.removeChild(iframe);
      resolve();
    };
    iframe.contentWindow?.addEventListener("afterprint", cleanup, { once: true });
    // Fallback in case afterprint doesn't fire
    setTimeout(() => {
      try {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      } catch {
        // ignore
      }
      setTimeout(cleanup, 500);
    }, 100);
  });
}
