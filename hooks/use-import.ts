"use client";
import * as React from "react";

/**
 * @hook useImport
 * @category Data
 * @since 1.0.0-beta.0
 * @description Drive a file import: parse an uploaded file (text/json/csv), track progress, validation errors, and parsed rows.
 * @example
 * const { importFile, rows, errors, isLoading, progress } = useImport();
 */
export interface ImportError {
  row: number;
  message: string;
}

export interface UseImportResult<T> {
  rows: T[];
  errors: ImportError[];
  isLoading: boolean;
  progress: number;
  importFile: (
    file: File,
    parser: (text: string, file: File) => T[] | Promise<T[]>,
  ) => Promise<T[]>;
  reset: () => void;
}

export function useImport<T = Record<string, unknown>>(): UseImportResult<T> {
  const [rows, setRows] = React.useState<T[]>([]);
  const [errors, setErrors] = React.useState<ImportError[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const mountedRef = React.useRef(true);

  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const importFile = React.useCallback(
    async (
      file: File,
      parser: (text: string, file: File) => T[] | Promise<T[]>,
    ): Promise<T[]> => {
      setIsLoading(true);
      setProgress(0);
      setErrors([]);
      setRows([]);
      try {
        const text = await file.text();
        if (!mountedRef.current) return [];
        setProgress(0.5);
        const result = await parser(text, file);
        if (!mountedRef.current) return [];
        setRows(result);
        setProgress(1);
        return result;
      } catch (err) {
        if (!mountedRef.current) return [];
        setErrors([
          { row: 0, message: err instanceof Error ? err.message : String(err) },
        ]);
        return [];
      } finally {
        if (mountedRef.current) setIsLoading(false);
      }
    },
    [],
  );

  const reset = React.useCallback(() => {
    setRows([]);
    setErrors([]);
    setProgress(0);
    setIsLoading(false);
  }, []);

  return { rows, errors, isLoading, progress, importFile, reset };
}
