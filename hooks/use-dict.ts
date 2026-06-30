"use client";
import * as React from "react";

/**
 * @hook useDict
 * @category Data
 * @since 1.0.0-beta.0
 * @description Loads and caches a dictionary (key/label/code options) by dict type, with loading/error state and a label lookup helper.
 * @param dictType Dictionary type key. Falsy skips loading.
 * @param fetcher Returns the options for the given dict type.
 * @example
 * const { options, isLoading, getLabel } = useDict("gender", fetchDict);
 */
export interface DictOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface UseDictState {
  options: DictOption[];
  isLoading: boolean;
  error: Error | undefined;
  getLabel: (value: string) => string;
  refresh: () => void;
}

const dictCache = new Map<string, DictOption[]>();

export function useDict(
  dictType: string | null,
  fetcher: (type: string) => Promise<DictOption[]>,
): UseDictState {
  const [options, setOptions] = React.useState<DictOption[]>(
    dictType && dictCache.has(dictType) ? dictCache.get(dictType)! : [],
  );
  const [isLoading, setIsLoading] = React.useState(
    dictType !== null && !(dictType && dictCache.has(dictType)),
  );
  const [error, setError] = React.useState<Error | undefined>(undefined);
  const [tick, setTick] = React.useState(0);
  const mountedRef = React.useRef(true);

  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  React.useEffect(() => {
    if (!dictType) return;
    if (dictCache.has(dictType) && tick === 0) {
      setOptions(dictCache.get(dictType)!);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    fetcher(dictType)
      .then((opts) => {
        if (!mountedRef.current) return;
        dictCache.set(dictType, opts);
        setOptions(opts);
        setError(undefined);
        setIsLoading(false);
      })
      .catch((err: unknown) => {
        if (!mountedRef.current) return;
        setError(err instanceof Error ? err : new Error(String(err)));
        setIsLoading(false);
      });
  }, [dictType, tick, fetcher]);

  const getLabel = React.useCallback(
    (value: string) => options.find((o) => o.value === value)?.label ?? value,
    [options],
  );

  const refresh = React.useCallback(() => setTick((t) => t + 1), []);

  return { options, isLoading, error, getLabel, refresh };
}
