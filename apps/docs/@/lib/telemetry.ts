/**
 * Lightweight telemetry abstraction for error reporting and event tracking.
 *
 * Consumers inject an adapter (e.g. Sentry, Datadog, custom analytics) via
 * `setTelemetryAdapter()`. Components use `track()` / `reportError()` without
 * coupling to a specific provider.
 *
 * @since 1.1.0
 */

export interface TelemetryEvent {
  name: string;
  properties?: Record<string, unknown> | undefined;
}

export interface TelemetryAdapter {
  /** Track a user action or business event. */
  track(event: TelemetryEvent): void;
  /** Report an error to the monitoring platform. */
  reportError(error: Error, context?: Record<string, unknown>): void;
}

let adapter: TelemetryAdapter | null = null;

/**
 * Register the telemetry adapter. Call once at app init.
 * @example
 * setTelemetryAdapter({
 *   track: (e) => sentry?.addBreadcrumb({ message: e.name, data: e.properties }),
 *   reportError: (e, ctx) => sentry?.captureException(e, { extra: ctx }),
 * })
 */
export function setTelemetryAdapter(a: TelemetryAdapter): void {
  adapter = a;
}

/**
 * Track a user action or business event. No-op if no adapter is set.
 */
export function track(name: string, properties?: Record<string, unknown>): void {
  if (adapter) {
    adapter.track({ name, properties });
  }
}

/**
 * Report an error. Falls back to `console.error` when no adapter is set.
 */
export function reportError(error: Error, context?: Record<string, unknown>): void {
  if (adapter) {
    adapter.reportError(error, context);
  } else {
    console.error("[telemetry]", error.message, context ?? "");
  }
}
