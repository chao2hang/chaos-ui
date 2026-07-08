#!/usr/bin/env python3
"""Scan component files for props that lack defaults but are used with array/object methods."""
import os
import re

ROOT = r"d:/Projects/chaos/chaos-ui/apps/docs/@/components"
DIRS = ["business", "ui"]
# Skip charts (already fixed)
SKIP = {"business/charts"}
# Array/string/object methods/props that crash on undefined
METHOD_RE = re.compile(
    r"\bPNAME\.(map|filter|reduce|find|forEach|some|every|sort|length|split|trim|charAt|toLowerCase|toUpperCase|includes|indexOf|slice|splice|join|pop|push|shift|unshift|concat|flat|flatMap|entries|keys|values|findIndex|findLast|findLastIndex|at|reverse)\b"
)

def scan_file(path):
    with open(path, encoding="utf-8") as f:
        content = f.read()
    # Quick check: must have destructured params with { ... }
    # Find function/export function signatures with destructuring
    # Pattern: function NAME({...}) or ({...}) => or ({...}: Props)
    # We'll find all destructure blocks by matching balanced braces after a function/arrow
    results = []
    # Find all destructured parameter blocks: { prop, prop2 = def, ... }
    # We'll scan for lines that look like destructure entries:  identifier, or identifier = default,
    # But only within function param destructures.
    # Simpler: find all "function ...({" and arrow "({" openings, then parse until matching }.
    idx = 0
    n = len(content)
    destructures = []
    # Match "function NAME(" or "= (" or "=> (" or "({"
    for m in re.finditer(r"(function\s+[A-Za-z_][A-Za-z0-9_]*\s*\(|=>\s*\(|=\s*\(|\()", content):
        pos = m.end()
        if pos < n and content[pos] == "{":
            # Parse balanced braces
            depth = 0
            start = pos
            j = pos
            while j < n:
                c = content[j]
                if c == "{":
                    depth += 1
                elif c == "}":
                    depth -= 1
                    if depth == 0:
                        destructures.append(content[start:j+1])
                        break
                j += 1
    for block in destructures:
        # Parse props in this destructure block
        # Each prop: identifier (no default) or identifier = default or ...rest
        # We want identifiers that are directly destructured (not nested) and have NO default.
        # Simple approach: find lines, match identifier before optional '=' and ','
        # Split by top-level commas (not inside nested {})
        parts = []
        depth = 0
        cur = ""
        for c in block:
            if c == "{":
                depth += 1
                cur += c
            elif c == "}":
                depth -= 1
                cur += c
            elif c == "," and depth == 1:
                parts.append(cur.strip())
                cur = ""
            else:
                cur += c
        # last part
        if cur.strip():
            parts.append(cur.strip())
        # parts[0] is after "{", remove leading {
        if parts and parts[0].startswith("{"):
            parts[0] = parts[0][1:].strip()
        if parts and parts[-1].endswith("}"):
            parts[-1] = parts[-1][:-1].strip()
        for part in parts:
            part = part.strip()
            if not part or part.startswith("..."):
                continue
            # Skip nested destructure: starts with :
            # Match simple identifier without default
            m = re.match(r"^([a-zA-Z_][a-zA-Z0-9_]*)\s*$", part)
            if m:
                prop = m.group(1)
                # Check usage in content
                method_re = METHOD_RE.pattern.replace("PNAME", re.escape(prop))
                if re.search(method_re, content):
                    results.append(prop)
    return results

def is_already_default(path, prop):
    # Check if prop already has default in file
    with open(path, encoding="utf-8") as f:
        content = f.read()
    # Look for "prop =" in destructure context
    return re.search(r"\b" + re.escape(prop) + r"\s*=", content) is not None

def main():
    findings = []
    for d in DIRS:
        base = os.path.join(ROOT, d)
        if not os.path.isdir(base):
            continue
        for fname in sorted(os.listdir(base)):
            if not fname.endswith(".tsx"):
                continue
            if fname.endswith(".test.tsx") or fname.endswith(".spec.tsx"):
                continue
            # Skip charts subdirectory files
            full = os.path.join(base, fname)
            rel = os.path.relpath(full, ROOT).replace("\\", "/")
            if rel.startswith("business/charts/"):
                continue
            props = scan_file(full)
            if not props:
                continue
            # Filter out props that already have defaults
            missing = []
            for p in set(props):
                if not is_already_default(full, p):
                    missing.append(p)
            if missing:
                findings.append((rel, sorted(set(missing))))
    print(f"Total files with issues: {len(findings)}")
    for rel, props in findings:
        print(f"{rel}: {', '.join(props)}")

if __name__ == "__main__":
    main()
