"use client";
import * as React from "react";

/**
 * @hook useLineEditor
 * @category Data
 * @since 1.0.0-beta.0
 * @description Inline line editor: tracks edit/draft state for a single value, with commit/cancel, validation, and dirty flag. Used by editable table cells and inline-edit fields.
 * @param value The committed value.
 * @param options onCommit, validate, autoFocus.
 * @example
 * const { draft, setDraft, commit, cancel, isEditing, start, isValid } = useLineEditor("foo");
 */
export interface UseLineEditorOptions<T> {
  onCommit?: (value: T) => void | Promise<void>;
  validate?: (value: T) => string | null;
  autoFocus?: boolean;
}

export interface UseLineEditorResult<T> {
  value: T;
  draft: T;
  isEditing: boolean;
  error: string | null;
  isValid: boolean;
  dirty: boolean;
  start: () => void;
  setDraft: (value: T) => void;
  commit: () => Promise<void>;
  cancel: () => void;
}

export function useLineEditor<T>(
  value: T,
  options: UseLineEditorOptions<T> = {},
): UseLineEditorResult<T> {
  const { onCommit, validate } = options;
  const [draft, setDraft] = React.useState<T>(value);
  const [isEditing, setIsEditing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const valueRef = React.useRef(value);
  valueRef.current = value;

  React.useEffect(() => {
    if (!isEditing) setDraft(value);
  }, [value, isEditing]);

  const start = React.useCallback(() => {
    setDraft(valueRef.current);
    setError(null);
    setIsEditing(true);
  }, []);

  const setDraftValue = React.useCallback(
    (next: T) => {
      setDraft(next);
      setError(validate ? validate(next) : null);
    },
    [validate],
  );

  const commit = React.useCallback(async () => {
    const err = validate ? validate(draft) : null;
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setIsEditing(false);
    await onCommit?.(draft);
  }, [draft, validate, onCommit]);

  const cancel = React.useCallback(() => {
    setDraft(valueRef.current);
    setError(null);
    setIsEditing(false);
  }, []);

  return {
    value,
    draft,
    isEditing,
    error,
    isValid: error === null,
    dirty: draft !== value,
    start,
    setDraft: setDraftValue,
    commit,
    cancel,
  };
}
