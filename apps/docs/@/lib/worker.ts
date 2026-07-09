/**
 * @module worker
 * @category Utility
 * @since 1.0.0-beta.0
 * @description Web Worker helpers — create a worker from an inline function (no separate file needed), run a function off the main thread with a timeout, and a tiny pool for parallel map. Falls back to running synchronously on the main thread when Workers are unavailable (jsdom/SSR).
 * @example
 * const heavy = (n: number) => n * n;
 * const result = await runInWorker(heavy, 5);  // 25
 */

/** Create a Web Worker from an inline function. Returns the Worker, or null if unsupported. */
export function createWorkerFromFn<T extends (...args: never[]) => unknown>(fn: T): Worker | null {
  if (typeof Worker === "undefined") return null;
  const src = `
    self.onmessage = function (e) {
      try {
        const fn = new Function('return (' + e.data.__src + ')')();
        var args = e.data.args || [];
        Promise.resolve(fn.apply(null, args)).then(function (result) {
          self.postMessage({ ok: true, result: result });
        }, function (err) {
          self.postMessage({ ok: false, error: String(err && err.message || err) });
        });
      } catch (err) {
        self.postMessage({ ok: false, error: String(err && err.message || err) });
      }
    };
  `;
  const blob = new Blob([src], { type: "application/javascript" });
  const url = URL.createObjectURL(blob);
  const worker = new Worker(url);
  // store the function source for the message handler
  (worker as Worker & { __fnSrc?: string }).__fnSrc = fn.toString();
  URL.revokeObjectURL(url);
  return worker;
}

/** Run a pure function off the main thread. Falls back to in-thread execution when Workers are unavailable. */
export function runInWorker<T extends (...args: never[]) => unknown>(
  fn: T,
  args: Parameters<T>,
  timeout = 30_000,
): Promise<ReturnType<T>> {
  return new Promise((resolve, reject) => {
    const worker = createWorkerFromFn(fn);
    if (!worker) {
      // Fallback: run synchronously (jsdom/SSR)
      try {
        resolve(fn(...args) as ReturnType<T>);
      } catch (err) {
        reject(err);
      }
      return;
    }
    const timer = setTimeout(() => {
      worker.terminate();
      reject(new Error("Worker timed out"));
    }, timeout);
    worker.onmessage = (e: MessageEvent) => {
      clearTimeout(timer);
      worker.terminate();
      const data = e.data as { ok: boolean; result?: unknown; error?: string };
      if (data.ok) resolve(data.result as ReturnType<T>);
      else reject(new Error(data.error ?? "Worker error"));
    };
    worker.onerror = (e) => {
      clearTimeout(timer);
      worker.terminate();
      reject(new Error(e.message || "Worker error"));
    };
    worker.postMessage({ __src: (worker as Worker & { __fnSrc?: string }).__fnSrc, args });
  });
}

/** Run a map over an array with up to `concurrency` workers in parallel. */
export async function parallelMap<I, O>(
  items: I[],
  fn: (item: I, index: number) => O | Promise<O>,
  concurrency = 4,
): Promise<O[]> {
  const results: O[] = new Array(items.length);
  let cursor = 0;
  const workers = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (cursor < items.length) {
      const idx = cursor++;
      results[idx] = await fn(items[idx]!, idx);
    }
  });
  await Promise.all(workers);
  return results;
}

/** Backward-compat default export name — returns the helper bag. */
export function worker() {
  return { createWorkerFromFn, runInWorker, parallelMap };
}
