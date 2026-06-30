"use client";
import * as React from "react";

/**
 * @hook useDict
 * @category Data
 * @since 1.0.0-beta.0
 */
export function useDict() {
  return React.useMemo(() => ({}), []);
}
