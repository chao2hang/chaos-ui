# Story 类型错误修复 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix ~360 TS2322 type errors in 552 `.stories.tsx` files by replacing `satisfies Meta<typeof X>` with `: Meta<typeof X>`, then fix ~38 remaining story errors manually.

**Architecture:** A single sed-based batch replacement across all story files, followed by targeted manual fixes for non-uniform error patterns. Verification via `npx tsc --noEmit`.

**Tech Stack:** sed, grep, TypeScript 5.x, @storybook/react 8.x

**Working directory:** `/home/chaos/projects/personal/chaos_style/apps/docs`

## Global Constraints

- Do NOT modify files outside `apps/docs/src/` in Phase 1
- Do NOT change the `StoryObj` type annotation — only `meta` declaration changes
- Do NOT touch `@/components/business/*` shim files
- Run `npx tsc --noEmit` from `apps/docs/` for verification
- All commands run from `apps/docs/` unless specified otherwise
- Commit after each completed task

---

### Task 1: Batch replace `satisfies Meta<` with `: Meta<` in all story files

**Files:**
- Modify: All `apps/docs/src/**/*.stories.tsx` files using `satisfies Meta<typeof ...>`

**Interfaces:**
- Consumes: 552 story files with the pattern `const meta = {\n...\n} satisfies Meta<typeof X>`
- Produces: Same 552 files with pattern `const meta: Meta<typeof X> = {\n...\n}`

- [ ] **Step 1: Verify current error count from story files**

Run: `cd /home/chaos/projects/personal/chaos_style/apps/docs && npx tsc --noEmit 2>&1 | grep "^src/" | wc -l`
Expected: ~404 (total story errors)

- [ ] **Step 2: Preview the replacement scope**

Run: `cd /home/chaos/projects/personal/chaos_style/apps/docs && grep -rn "satisfies Meta<typeof" src/ --include="*.stories.tsx" | head -5`
Expected output (example):
```
src/business/AccountBalance.stories.tsx:8:} satisfies Meta<typeof AccountBalance>
src/business/ActivityFeed.stories.tsx:8:} satisfies Meta<typeof ActivityFeed>
```

- [ ] **Step 3: Run the batch replacement using sed**

This is a multi-step sed that operates per-file:
1. Read each `*.stories.tsx` file
2. Find the `satisfies Meta<typeof X>` line
3. Extract `X` (the component name)
4. Replace `const meta = {` line with `const meta: Meta<typeof X> = {`
5. Remove the `satisfies Meta<typeof X>` line

Run:
```bash
cd /home/chaos/projects/personal/chaos_style/apps/docs

find src/ -name "*.stories.tsx" -type f | while read -r f; do
  # Extract component name from "satisfies Meta<typeof ComponentName>"
  comp=$(grep -oP 'satisfies Meta<typeof \K\w+(?=>)' "$f" 2>/dev/null)
  [ -z "$comp" ] && continue
  
  # Replace "const meta = {" with "const meta: Meta<typeof CompName> = {"
  # (only the FIRST occurrence which is the meta declaration)
  sed -i "0,/^const meta = {/s/^const meta = {/const meta: Meta<typeof ${comp}> = {/" "$f"
  
  # Remove "} satisfies Meta<typeof CompName>" line
  sed -i '/^} satisfies Meta<typeof /d' "$f"
done

echo "Replacement complete"
```

Expected: Script runs without error, 552+ files modified.

- [ ] **Step 4: Verify error reduction**

Run: `cd /home/chaos/projects/personal/chaos_style/apps/docs && npx tsc --noEmit 2>&1 | grep "^src/" | wc -l`
Expected: ~38 (down from ~404 — ~360 errors eliminated)

- [ ] **Step 5: Check for any unintended changes**

Run: `cd /home/chaos/projects/personal/chaos_style/apps/docs && npx tsc --noEmit 2>&1 | grep "^src/" | head -40`
Review errors to confirm they are all the expected remaining patterns (TS2353, TS2741, etc.) not new TS2322 on `satisfies` patterns.

- [ ] **Step 6: Commit**

```bash
cd /home/chaos/projects/personal/chaos_style
git add apps/docs/src/
git commit -m "fix(docs): replace satisfies Meta<typeof X> with explicit Meta annotation to fix ~360 story type errors"
```

---

### Task 2: Fix remaining TS2353 "Object literal may only specify known properties" errors

**Files:**
- Modify: Story files with TS2353 errors (extra properties in args)

**Interfaces:**
- Consumes: List of files/errors from `npx tsc --noEmit 2>&1 | grep "TS2353" | grep "^src/"`
- Produces: Fixed files with correct args property names

**Step 1: Identify all TS2353 errors**

Run: `cd /home/chaos/projects/personal/chaos_style/apps/docs && npx tsc --noEmit 2>&1 | grep "TS2353" | grep "^src/"`
Expected: A list of ~19 errors with format `src/business/X.stories.tsx(line,col): error TS2353: Object literal may only specify known properties, and 'Y' does not exist in type '...'`

For each error, the fix is to:
1. Look at the error message to identify the wrong property name
2. Check the component's actual props interface
3. Rename/remove the incorrect property

Common patterns expected from our analysis:
- `ActivityFeed`: `activities` → `items`
- Other args that reference renamed props

For each file:
- Read the file
- Rename the incorrect property to the correct one
- Save

- [ ] **Step 1b: Fix all TS2353 errors**

Run a systematic fix:
```bash
cd /home/chaos/projects/personal/chaos_style/apps/docs
npx tsc --noEmit 2>&1 | grep "TS2353" | grep "^src/" | while read -r line; do
  file=$(echo "$line" | cut -d: -f1)
  echo "NEEDS FIX: $file"
  echo "  $line"
done
```

For each file, read it, identify the incorrect property name from the error, and fix it manually. Common fixes (based on current analysis):
- `ActivityFeed.stories.tsx`: `activities` → `items`

- [ ] **Step 2: Verify TS2353 count drops to 0**

Run: `cd /home/chaos/projects/personal/chaos_style/apps/docs && npx tsc --noEmit 2>&1 | grep -c "TS2353"`
Expected: 0

- [ ] **Step 3: Commit**

```bash
cd /home/chaos/projects/personal/chaos_style
git add apps/docs/src/
git commit -m "fix(docs): fix TS2353 object literal extra properties in story args"
```

---

### Task 3: Fix remaining TS2741 "missing property" errors

**Files:**
- Modify: Story files with TS2741 errors

**Step 1: Identify all TS2741 errors**

Run: `cd /home/chaos/projects/personal/chaos_style/apps/docs && npx tsc --noEmit 2>&1 | grep "TS2741" | grep "^src/"`
Expected: ~8 errors

For each, add the missing property to the story args.

- [ ] **Step 2: Fix each TS2741**

Read each file, add the required property to `args`.

- [ ] **Step 3: Verify**

Run: `cd /home/chaos/projects/personal/chaos_style/apps/docs && npx tsc --noEmit 2>&1 | grep -c "TS2741"`
Expected: 0

- [ ] **Step 4: Commit**

```bash
cd /home/chaos/projects/personal/chaos_style
git add apps/docs/src/
git commit -m "fix(docs): fix TS2741 missing property errors in story args"
```

---

### Task 4: Fix remaining TS2352 / TS18046 / TS2305 / TS2724 errors

**Files:**
- Modify: Story files with TS2352, TS18046, TS2305, TS2724 errors

**Step 1: Categorize remaining errors**

Run: `cd /home/chaos/projects/personal/chaos_style/apps/docs && npx tsc --noEmit 2>&1 | grep "^src/" | awk '{for(i=1;i<=NF;i++){if($i~/^TS[0-9]+/)print $i}}' | sort | uniq -c | sort -rn`
Review the remaining error codes.

Common fixes:
- **TS2352** (as conversion): Change `as Record<string, unknown>[]` to `as unknown as Record<string, unknown>[]`
- **TS18046** (unknown type): Add type annotation
- **TS2305/TS2724** (no exported member): Fix import name, e.g. `BOMTreeEditor` not `BomTreeEditor`

- [ ] **Step 2: Fix each remaining error**

Read each file and fix accordingly.

- [ ] **Step 3: Verify**

Run: `cd /home/chaos/projects/personal/chaos_style/apps/docs && npx tsc --noEmit 2>&1 | grep "^src/" | wc -l`
Expected: 0

- [ ] **Step 4: Commit**

```bash
cd /home/chaos/projects/personal/chaos_style
git add apps/docs/src/
git commit -m "fix(docs): fix remaining story type errors (TS2352, TS18046, TS2305, TS2724)"
```

---

### Task 5: Final verification

- [ ] **Step 1: Full tsc check on story files**

Run: `cd /home/chaos/projects/personal/chaos_style/apps/docs && npx tsc --noEmit 2>&1 | grep "^src/" | wc -l`
Expected: 0

- [ ] **Step 2: Check total error count hasn't regressed elsewhere**

Run: `cd /home/chaos/projects/personal/chaos_style/apps/docs && npx tsc --noEmit 2>&1 | wc -l`
Record the baseline for Phase 2 (should still have business shim errors etc.)

- [ ] **Step 3: Build Storybook to verify no breakage**

Run: `cd /home/chaos/projects/personal/chaos_style && npm run build-storybook 2>&1 | tail -20`
Expected: Build succeeds (may have unrelated warnings but no errors)
Note: Use `timeout 180` or similar if it hangs.

- [ ] **Step 4: Update design doc status**

Edit `designs/2026-07-08_Story类型错误修复_设计计划.md`:
- Change `status: 工作中` to `status: 待审核`
- Update `updated: 2026-07-08`
- Mark all completed tasks with `- [x]`

- [ ] **Step 5: Update INDEX.md**

Move the link from `工作中` to `待审核` section in `designs/INDEX.md`
