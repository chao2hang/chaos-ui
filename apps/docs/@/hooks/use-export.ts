"use client";
import * as React from "react";
import { download } from "@chaos_team/chaos-ui/lib";

/**
 * @hook useExport
 * @category Data
 * @since 1.0.0-beta.0
 * @description Triggers a file export (download) with progress, abort, and blob/text support.
 * @example
 * const { exportFile, isLoading, error } = useExport();
 * await exportFile(() => fetch("/api/export").then(r => r.blob()), "report.xlsx");
 */
export interface UseExportResult {
  exportFile: (
    source: () => Promise<Blob | string>,
    filename: string,
    mime?: string,
  ) => Promise<void>;
  isLoading: boolean;
  error: Error | undefined;
  progress: number;
  abort: () => void;
}

export function useExport(): UseExportResult {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | undefined>(undefined);
  const [progress, setProgress] = React.useState(0);
  const cancelledRef = React.useRef(false);
  const mountedRef = React.useRef(true);

  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const exportFile = React.useCallback(
    async (
      source: () => Promise<Blob | string>,
      filename: string,
      mime?: string,
    ) => {
      cancelledRef.current = false;
      setIsLoading(true);
      setError(undefined);
      setProgress(0);
      try {
        const result = await source();
        if (cancelledRef.current || !mountedRef.current) return;
        setProgress(1);
        if (typeof result === "string") {
          download.text(filename, result, mime ?? "text/plain");
        } else {
          download.blob(filename, result);
        }
      } catch (err) {
        if (cancelledRef.current || !mountedRef.current) return;
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        if (mountedRef.current) setIsLoading(false);
      }
    },
    [],
  );

  const abort = React.useCallback(() => {
    cancelledRef.current = true;
  }, []);

  return { exportFile, isLoading, error, progress, abort };
}
