---
name: resolve-github-issue
description: "Fetch a GitHub issue by number, locate related code, and produce an actionable fix/implementation plan. With no issue number, list all open issues in the current repo. Use when the user runs /iss, mentions issue #N, or asks to analyze GitHub issues — default is plan-only (or triage list), no code changes until the user explicitly asks to implement."
---

# Resolve GitHub Issue

Analyze GitHub issues and produce a concrete plan. **Default stop: proposal / triage only** — do not edit files, commit, or push unless the user clearly asks to implement.

## Inputs

1. Issue number from `$1` / `$ARGUMENTS` / user text (first positive integer wins).
2. Repo: prefer current git remote via `gh repo view --json nameWithOwner -q .nameWithOwner`. If that fails and this is chaos-ui, use `chao2hang/chaos-ui`.

### Mode A — no issue number

If `$1` and `$ARGUMENTS` contain **no** issue number (empty `/iss`, or only non-numeric text without a clear id):

1. List **all open** issues for the current repo.
2. Present a triage table (do not deep-dive every issue unless few and small).
3. Stop and ask which number to analyze next (or accept a follow-up `/iss N`).

Do **not** ask “what is the number?” and exit empty-handed when the repo has open issues — show them first.

### Mode B — issue number present

Fetch that issue and produce a full implementation plan (below).

## Fetch

### List open issues (Mode A)

Prefer GitHub MCP:

- `mcp__github__list_issues` with `owner`, `repo`, `state: "open"` (paginate if needed)

Fallback:

```bash
gh issue list --state open --limit 50 --json number,title,labels,updatedAt,author,url
```

Sort for display: newest `updatedAt` first, or keep API order but show `updatedAt`.

If both fail, report auth setup (`gh auth login` or `GITHUB_PERSONAL_ACCESS_TOKEN`) and stop.

### Single issue (Mode B)

Prefer GitHub MCP:

- `mcp__github__get_issue` with `owner`, `repo`, `issue_number`
- Comments if useful (`gh issue view N --comments` or MCP equivalents)

Fallback:

```bash
gh issue view <N> --json number,title,body,labels,state,url,author,comments
```

## Mode A output format

```markdown
## Open issues (`owner/repo`)

| #   | Title | Labels | Updated |
| --- | ----- | ------ | ------- |
| N   | …     | …      | …       |

**Count:** N open

## Next step

Reply with a number (e.g. `/iss 9` or `分析 9`) for a full plan.
Default remains plan-only — no code changes until you ask to implement.
```

If zero open issues, say so and stop.

Optional: if the user also passed a filter word (e.g. `/iss bug` without a number), prefer `gh issue list --label bug` or search — only when the non-numeric args look like a label/keyword, not a mistaken empty run.

## Mode B — analyze

1. Extract: problem statement, repro steps, acceptance criteria, priority/labels, linked internal IDs (e.g. `CUI-*`).
2. Search the workspace for related symbols, components, routes, tests, and CHANGELOG mentions.
3. Prefer structural lookup (CodeGraph if present) for symbols; use `rg` for exact strings and docs.
4. Form a root-cause hypothesis grounded in code, not only the issue text.

## Chaos UI project rules (when applicable)

Detect chaos-ui by package name `@chaos_team/chaos-ui`, remote `chao2hang/chaos-ui`, or presence of `designs/` + `components/ui`.

When detected:

- Significant features/refactors need a plan under `designs/` first (`designs/_模板_设计计划.md`, board in `INDEX.md`). Mention this in the proposal if missing.
- Verification candidates: `pnpm run check`, `pnpm test`, `pnpm run build:pkg`, Storybook as relevant.
- Keep component APIs stable unless the issue is an intentional breaking change.

## Mode B output format

```markdown
## Issue

- **#N** Title
- State / labels / URL

## Summary

1–3 sentences.

## Acceptance criteria

- …

## Code touchpoints

- `path:line` — why relevant

## Root cause

…

## Proposed plan

1. …
2. … (file-level where possible)

## Verification

- commands / manual checks

## Risks / open questions

- …

## Next step

Default: wait for user to say **开始修 / implement**.
If a `designs/` plan is required, say so before coding.
```

## After implementation (when user asks to implement / ship)

Default `/iss` is plan-only. Once the user authorizes implementation and the work is **done** (merged/on main, and released if this repo cuts a package version for it):

1. **Close the issue** — required project rule (处理完成就必须关 issue). Do not wait for the user to ask.
2. Prefer: `gh issue close N --comment "…"` with commit SHA, PR, and/or `vX.Y.Z` release URL.
3. If shipping via `/release`, issue close is step 10 of **prepare-release** for all issues in that cut; if shipping without a release cut, close immediately after the fix is on the delivery branch.

Plan-only analysis does **not** close issues. Partial progress → comment, leave open.

## Boundaries

- Do **not** modify the working tree in the default `/iss` flow.
- Do **not** open PRs or comment on the issue unless asked (**exception**: closing with a completion comment after ship is required).
- After the user authorizes implementation, still avoid drive-by refactors; stage intentional files only when committing later.
- After the work is fully shipped, **do** close the issue — not optional.
