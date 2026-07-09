"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertCircleIcon, CodeIcon, CalculatorIcon } from "@/components/ui/icons";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

/** A variable that can be used in a formula. */
export interface FormulaVariable {
  /** Variable name (identifier) */
  name: string;
  /** Display label */
  label: string;
  /** Variable type */
  type: "number" | "string" | "boolean";
  /** Category for grouping */
  category?: string;
  /** Sample value for preview */
  sampleValue?: number | string;
}

/** A function that can be used in a formula. */
export interface FormulaFunction {
  /** Function name */
  name: string;
  /** Display label */
  label: string;
  /** Parameter descriptions */
  args: Array<{ name: string; type: string; description?: string }>;
  /** Return type */
  returnType: string;
  /** Description */
  description?: string;
  /** Category */
  category?: string;
}

/** Props for the FormulaEditor component. */
export interface FormulaEditorProps {
  /** Current formula expression */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Available variables */
  variables?: FormulaVariable[];
  /** Available functions */
  functions?: FormulaFunction[];
  /** Validate the formula (return error message or null) */
  validator?: (formula: string) => string | null;
  /** Show preview panel */
  showPreview?: boolean;
  /** Sample values for preview evaluation */
  sampleValues?: Record<string, number>;
  /** Placeholder text */
  placeholder?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Error message (controlled) */
  error?: string;
  /** Additional CSS class names */
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Safe Expression Evaluator (recursive descent parser, NO eval)             */
/* -------------------------------------------------------------------------- */

type TokenKind = "number" | "ident" | "op" | "lparen" | "rparen" | "comma" | "eof";

interface Token {
  kind: TokenKind;
  value: string;
}

function tokenize(expr: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < expr.length) {
    const ch = expr[i]!;
    if (/\s/.test(ch)) { i++; continue; }
    if (/[0-9.]/.test(ch)) {
      let num = "";
      while (i < expr.length && /[0-9.]/.test(expr[i]!)) { num += expr[i]!; i++; }
      tokens.push({ kind: "number", value: num });
      continue;
    }
    if (/[a-zA-Z_$@]/.test(ch)) {
      let ident = "";
      while (i < expr.length && /[a-zA-Z0-9_$@]/.test(expr[i]!)) { ident += expr[i]!; i++; }
      tokens.push({ kind: "ident", value: ident });
      continue;
    }
    if ("+-*/%".includes(ch)) {
      tokens.push({ kind: "op", value: ch });
      i++; continue;
    }
    if (ch === "(") { tokens.push({ kind: "lparen", value: "(" }); i++; continue; }
    if (ch === ")") { tokens.push({ kind: "rparen", value: ")" }); i++; continue; }
    if (ch === ",") { tokens.push({ kind: "comma", value: "," }); i++; continue; }
    // Skip unknown
    i++;
  }
  tokens.push({ kind: "eof", value: "" });
  return tokens;
}

class Parser {
  private tokens: Token[];
  private pos: number;
  private vars: Record<string, number>;

  constructor(tokens: Token[], vars: Record<string, number>) {
    this.tokens = tokens;
    this.pos = 0;
    this.vars = vars;
  }

  private peek(): Token { return this.tokens[this.pos]!; }
  private advance(): Token { return this.tokens[this.pos++]!; }

  parse(): number {
    const result = this.parseExpr();
    return result;
  }

  private parseExpr(): number {
    return this.parseAddSub();
  }

  private parseAddSub(): number {
    let left = this.parseMulDiv();
    while (this.peek().kind === "op" && (this.peek().value === "+" || this.peek().value === "-")) {
      const op = this.advance().value;
      const right = this.parseMulDiv();
      left = op === "+" ? left + right : left - right;
    }
    return left;
  }

  private parseMulDiv(): number {
    let left = this.parseUnary();
    while (this.peek().kind === "op" && "*/%".includes(this.peek().value)) {
      const op = this.advance().value;
      const right = this.parseUnary();
      if (op === "*") left = left * right;
      else if (op === "/") left = right !== 0 ? left / right : NaN;
      else left = right !== 0 ? left % right : NaN;
    }
    return left;
  }

  private parseUnary(): number {
    if (this.peek().kind === "op" && this.peek().value === "-") {
      this.advance();
      return -this.parseUnary();
    }
    if (this.peek().kind === "op" && this.peek().value === "+") {
      this.advance();
      return this.parseUnary();
    }
    return this.parsePrimary();
  }

  private parsePrimary(): number {
    const tok = this.peek();

    if (tok.kind === "number") {
      this.advance();
      return parseFloat(tok.value);
    }

    if (tok.kind === "lparen") {
      this.advance(); // skip (
      const val = this.parseExpr();
      if (this.peek().kind === "rparen") this.advance(); // skip )
      return val;
    }

    if (tok.kind === "ident") {
      this.advance();
      // Check for function call
      if (this.peek().kind === "lparen") {
        return this.parseFunctionCall(tok.value);
      }
      // Variable lookup - strip leading $ if present
      const varName = tok.value.startsWith("$") ? tok.value.slice(1) : tok.value;
      return this.vars[varName] ?? 0;
    }

    // Fallback
    this.advance();
    return 0;
  }

  private parseFunctionCall(name: string): number {
    this.advance(); // skip (
    const args: number[] = [];
    if (this.peek().kind !== "rparen") {
      args.push(this.parseExpr());
      while (this.peek().kind === "comma") {
        this.advance(); // skip ,
        args.push(this.parseExpr());
      }
    }
    if (this.peek().kind === "rparen") this.advance(); // skip )

    const upper = name.toUpperCase();
    switch (upper) {
      case "SUM": return args.reduce((a, b) => a + b, 0);
      case "AVG": return args.length > 0 ? args.reduce((a, b) => a + b, 0) / args.length : 0;
      case "MIN": return Math.min(...args);
      case "MAX": return Math.max(...args);
      case "ABS": return Math.abs(args[0] ?? 0);
      case "ROUND": return args.length > 1
        ? Math.round((args[0] ?? 0) * Math.pow(10, args[1] ?? 0)) / Math.pow(10, args[1] ?? 0)
        : Math.round(args[0] ?? 0);
      default: return NaN;
    }
  }
}

/** Safely evaluate a formula expression with variable substitution. No eval() used. */
export function safeEvaluate(
  formula: string,
  variables: Record<string, number>,
): number | null {
  try {
    // Substitute variable names with their values
    let expr = formula;
    // Sort variable names by length (longest first) to avoid partial replacements
    const sortedKeys = Object.keys(variables).sort((a, b) => b.length - a.length);
    for (const key of sortedKeys) {
      const pattern = new RegExp(`\\$?${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "g");
      expr = expr.replace(pattern, `(${variables[key]})`);
    }

    const tokens = tokenize(expr);
    const parser = new Parser(tokens, variables);
    const result = parser.parse();
    return Number.isFinite(result) ? result : null;
  } catch {
    return null;
  }
}

/* -------------------------------------------------------------------------- */
/*  Validation helpers                                                        */
/* -------------------------------------------------------------------------- */

function checkBalancedParentheses(formula: string): string | null {
  let depth = 0;
  for (const ch of formula) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (depth < 0) return "Unexpected closing parenthesis";
  }
  if (depth > 0) return "Unbalanced parentheses: missing closing parenthesis";
  return null;
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * @component FormulaEditor
 * @category business/manufacturing
 * @since 1.0.0
 * @description Formula expression editor with variable/function autocomplete,
 *   validation, and safe preview evaluation. Supports basic arithmetic,
 *   variable substitution, and built-in functions (SUM, AVG, MIN, MAX, ABS, ROUND).
 * @keywords formula, editor, expression, variable, function, autocomplete, validation, preview
 * @example
 * <FormulaEditor
 *   variables={[{ name: "price", label: "Unit Price", type: "number" }]}
 *   functions={[{ name: "SUM", label: "Sum", args: [{ name: "a", type: "number" }], returnType: "number" }]}
 * />
 */
export function FormulaEditor({
  value = "",
  onChange,
  variables = [],
  functions = [],
  validator,
  showPreview = false,
  sampleValues = {},
  placeholder = "Enter formula, e.g. $price * $quantity + SUM($tax, $shipping)",
  disabled = false,
  error: controlledError,
  className,
}: FormulaEditorProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const [internalValue, setInternalValue] = React.useState(value);
  const [autocompleteOpen, setAutocompleteOpen] = React.useState(false);
  const [autocompleteFilter, setAutocompleteFilter] = React.useState("");
  const [autocompleteTrigger, setAutocompleteTrigger] = React.useState<"$" | "@">("$");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [cursorTriggerPos, setCursorTriggerPos] = React.useState(-1);

  // Sync external value
  React.useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const currentValue = value !== undefined ? value : internalValue;

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);
      onChange?.(newValue);

      // Check for autocomplete triggers
      const cursorPos = e.target.selectionStart;
      const textBefore = newValue.slice(0, cursorPos);

      // Find the last $ or @ before cursor
      const dollarIdx = textBefore.lastIndexOf("$");
      const atIdx = textBefore.lastIndexOf("@");
      const triggerIdx = Math.max(dollarIdx, atIdx);

      if (triggerIdx >= 0) {
        const triggerChar = dollarIdx >= atIdx ? "$" : "@";
        const textAfterTrigger = textBefore.slice(triggerIdx + 1);
        // Only show autocomplete if no spaces since trigger
        if (!/\s/.test(textAfterTrigger)) {
          setAutocompleteOpen(true);
          setAutocompleteFilter(textAfterTrigger.toLowerCase());
          setAutocompleteTrigger(triggerChar);
          setCursorTriggerPos(triggerIdx);
          setActiveIndex(0);
          return;
        }
      }
      setAutocompleteOpen(false);
    },
    [onChange],
  );

  // Validation
  const validationError = React.useMemo(() => {
    if (controlledError) return controlledError;
    if (!currentValue.trim()) return null;
    const parenError = checkBalancedParentheses(currentValue);
    if (parenError) return parenError;
    if (validator) return validator(currentValue);
    return null;
  }, [currentValue, controlledError, validator]);

  // Preview evaluation
  const previewResult = React.useMemo(() => {
    if (!showPreview || !currentValue.trim()) return null;
    return safeEvaluate(currentValue, sampleValues);
  }, [showPreview, currentValue, sampleValues]);

  // Preview formula display (with values substituted)
  const previewFormula = React.useMemo(() => {
    if (!showPreview || !currentValue.trim()) return null;
    let display = currentValue;
    const sortedKeys = Object.keys(sampleValues).sort((a, b) => b.length - a.length);
    for (const key of sortedKeys) {
      const pattern = new RegExp(`\\$${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "g");
      display = display.replace(pattern, String(sampleValues[key]));
    }
    return display;
  }, [showPreview, currentValue, sampleValues]);

  // Filtered autocomplete items
  const autocompleteItems = React.useMemo(() => {
    if (autocompleteTrigger === "$") {
      return variables.filter(
        (v) => !autocompleteFilter || v.name.toLowerCase().includes(autocompleteFilter) || v.label.toLowerCase().includes(autocompleteFilter),
      );
    }
    return functions.filter(
      (f) => !autocompleteFilter || f.name.toLowerCase().includes(autocompleteFilter) || f.label.toLowerCase().includes(autocompleteFilter),
    );
  }, [autocompleteTrigger, autocompleteFilter, variables, functions]);

  const insertAtCursor = React.useCallback(
    (text: string) => {
      const textarea = textareaRef.current;
      if (!textarea) {
        const newValue = currentValue + text;
        setInternalValue(newValue);
        onChange?.(newValue);
        return;
      }

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      // If autocomplete is open, replace from trigger position
      let insertStart = start;
      if (autocompleteOpen && cursorTriggerPos >= 0) {
        insertStart = cursorTriggerPos;
      }

      const before = currentValue.slice(0, insertStart);
      const after = currentValue.slice(end);
      const newValue = before + text + after;

      setInternalValue(newValue);
      onChange?.(newValue);
      setAutocompleteOpen(false);

      // Restore focus and cursor position
      requestAnimationFrame(() => {
        textarea.focus();
        const newPos = before.length + text.length;
        textarea.setSelectionRange(newPos, newPos);
      });
    },
    [currentValue, onChange, autocompleteOpen, cursorTriggerPos],
  );

  const handleInsertVariable = React.useCallback(
    (varName: string) => {
      insertAtCursor(`$${varName}`);
    },
    [insertAtCursor],
  );

  const handleInsertFunction = React.useCallback(
    (fn: FormulaFunction) => {
      const argPlaceholders = fn.args.map((a) => a.name).join(", ");
      insertAtCursor(`${fn.name}(${argPlaceholders})`);
    },
    [insertAtCursor],
  );

  const handleAutocompleteSelect = React.useCallback(
    (item: FormulaVariable | FormulaFunction) => {
      if (autocompleteTrigger === "$" && "type" in item && !("args" in item)) {
        insertAtCursor(`$${(item as FormulaVariable).name}`);
      } else {
        const fn = item as FormulaFunction;
        const argPlaceholders = fn.args.map((a) => a.name).join(", ");
        insertAtCursor(`${fn.name}(${argPlaceholders})`);
      }
    },
    [autocompleteTrigger, insertAtCursor],
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (!autocompleteOpen || autocompleteItems.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % autocompleteItems.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + autocompleteItems.length) % autocompleteItems.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        handleAutocompleteSelect(autocompleteItems[activeIndex]!);
      } else if (e.key === "Escape") {
        setAutocompleteOpen(false);
      }
    },
    [autocompleteOpen, autocompleteItems, activeIndex, handleAutocompleteSelect],
  );

  return (
    <div
      data-slot="formula-editor"
      className={cn("space-y-3", className)}
    >
      {/* Editor area */}
      <div className="relative">
        <Textarea
          ref={textareaRef}
          value={currentValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          data-testid="formula-textarea"
          className={cn(
            "min-h-24 font-mono text-sm",
            validationError && "border-destructive",
          )}
          aria-invalid={!!validationError}
        />

        {/* Autocomplete dropdown */}
        {autocompleteOpen && autocompleteItems.length > 0 && (
          <div
            data-testid="autocomplete-dropdown"
            className="absolute z-50 mt-1 max-h-48 w-full overflow-auto rounded-md border bg-popover p-1 shadow-md"
          >
            {autocompleteItems.map((item, idx) => {
              const isActive = idx === activeIndex;
              const isVar = "type" in item && !("args" in item);
              return (
                <button
                  key={item.name}
                  type="button"
                  className={cn(
                    "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm",
                    isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent/50",
                  )}
                  data-testid={`autocomplete-item-${item.name}`}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleAutocompleteSelect(item);
                  }}
                  onMouseEnter={() => setActiveIndex(idx)}
                >
                  {isVar ? (
                    <CodeIcon className="size-3.5 text-muted-foreground" />
                  ) : (
                    <CalculatorIcon className="size-3.5 text-muted-foreground" />
                  )}
                  <span className="font-mono">{item.name}</span>
                  <span className="text-muted-foreground">{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Validation error */}
      {validationError && (
        <div
          data-testid="formula-error"
          className="flex items-center gap-1.5 text-sm text-destructive"
        >
          <AlertCircleIcon className="size-3.5" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Insertion toolbar */}
      {(variables.length > 0 || functions.length > 0) && !disabled && (
        <div data-testid="insertion-toolbar" className="space-y-2">
          {variables.length > 0 && (
            <div className="space-y-1">
              <span className="text-xs font-medium text-muted-foreground">Variables</span>
              <div className="flex flex-wrap gap-1">
                {variables.map((v) => (
                  <Badge
                    key={v.name}
                    variant="outline"
                    className="cursor-pointer hover:bg-accent"
                    data-testid={`var-badge-${v.name}`}
                    onClick={() => handleInsertVariable(v.name)}
                    role="button"
                    tabIndex={0}
                  >
                    <CodeIcon className="mr-1 size-3" />
                    {v.label}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {variables.length > 0 && functions.length > 0 && <Separator />}

          {functions.length > 0 && (
            <div className="space-y-1">
              <span className="text-xs font-medium text-muted-foreground">Functions</span>
              <div className="flex flex-wrap gap-1">
                {functions.map((f) => (
                  <Badge
                    key={f.name}
                    variant="outline"
                    className="cursor-pointer hover:bg-accent"
                    data-testid={`fn-badge-${f.name}`}
                    onClick={() => handleInsertFunction(f)}
                    role="button"
                    tabIndex={0}
                  >
                    <CalculatorIcon className="mr-1 size-3" />
                    {f.label}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Preview panel */}
      {showPreview && currentValue.trim() && (
        <Card data-testid="preview-panel" className="bg-muted/30">
          <CardContent className="space-y-2 pt-4">
            {previewFormula && (
              <div className="space-y-1">
                <span className="text-xs font-medium text-muted-foreground">Formula</span>
                <div
                  data-testid="preview-formula"
                  className="rounded bg-background px-2 py-1 font-mono text-sm"
                >
                  {previewFormula}
                </div>
              </div>
            )}
            <div className="space-y-1">
              <span className="text-xs font-medium text-muted-foreground">Result</span>
              <div
                data-testid="preview-result"
                className={cn(
                  "rounded bg-background px-2 py-1 font-mono text-sm font-semibold",
                  previewResult === null && "text-muted-foreground",
                )}
              >
                {previewResult !== null ? String(previewResult) : "Cannot evaluate"}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
