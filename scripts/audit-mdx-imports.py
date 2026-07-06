#!/usr/bin/env python3
"""Audit MDX imports — verify all @/components/... imports resolve to real proxy files."""
import re
from pathlib import Path

ROOT = Path("/home/chaos/projects/personal/chaos_style")
CONTENT = ROOT / "apps/docs/@/content"
DOCS_SRC = ROOT / "apps/docs/@"

errors = []
unique_imports = set()
for mdx in CONTENT.rglob("*.mdx"):
    content = mdx.read_text()
    # Match import ... from "@/components/..."
    for m in re.finditer(r'import[^;]*from\s*["\'](@/[^"\']+)["\']', content):
        imp = m.group(1)
        unique_imports.add(imp)
        if not imp.startswith("@/components/"):
            continue
        rel_path = imp[2:]  # strip "@/"
        candidate_tsx = DOCS_SRC / (rel_path + ".tsx")
        candidate_index = DOCS_SRC / rel_path / "index.tsx"
        candidate_ts = DOCS_SRC / (rel_path + ".ts")
        if candidate_tsx.exists() or candidate_index.exists() or candidate_ts.exists():
            continue
        errors.append((mdx.relative_to(ROOT), imp))

print(f"Unique @/ imports across all MDX: {len(unique_imports)}")
print(f"Broken imports: {len(errors)}")
for f, imp in errors[:30]:
    print(f"  {f}: {imp}")

if errors:
    print(f"\n{len(errors)} broken imports need fixing")
else:
    print("All imports resolve correctly!")
