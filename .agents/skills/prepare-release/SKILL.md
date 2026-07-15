---
name: prepare-release
description: "Prepare a package release without publishing: propose SemVer, draft CHANGELOG section, version bump plan, commit/tag commands. Use when the user runs /release or asks to cut a version. Default is prepare-only — never push tags or npm publish unless the user explicitly authorizes each step."
---

# Prepare Release

Draft everything needed for a release. **Default stop: preparation artifacts and commands only.**

Do **not** by default:

- `git push` of tags
- `pnpm publish` / `npm publish`
- create GitHub Releases via API

## Gather context

```bash
node -p "require('./package.json').version" 2>/dev/null || true
git describe --tags --abbrev=0 2>/dev/null || true
git log --oneline -20
```

Also read:

- `CHANGELOG.md` (top section)
- `package.json` name/version
- `.github/workflows/release.yml` when present

Optional arg from `/release`:

- `$1` = exact version (`1.5.4`) **or** `patch` | `minor` | `major`

## Chaos UI release path (when detected)

Primary pipeline (SoT = hand-maintained CHANGELOG + version tag):

1. Bump `package.json` version
2. Add `## [X.Y.Z] — YYYY-MM-DD` section to `CHANGELOG.md` (Keep a Changelog)
3. Commit: `release: vX.Y.Z - <short summary>` and push to `main` (wait for **CI** green)
4. Local full gate: `pnpm run release:check` (typecheck + test + prepack + smoke)
5. Tag: `vX.Y.Z` (prerelease: `vX.Y.Z-rc.N` / `-beta` → workflow marks prerelease)
6. Push tag → `.github/workflows/release.yml`:
   - Require tag commit on `main` + workflow `CI` success for that SHA
   - `pnpm run prepack` once, then `pnpm publish --ignore-scripts`
   - GitHub Release notes from `scripts/extract-changelog-section.mjs`

Do **not** treat heavy `prepublishOnly` as the release gate — it is intentionally light (`check:no-bom`). Full suite is `release:check` + main CI.

Changesets (`pnpm changeset` / `version` / `release:changeset`) are **secondary**; mention only if the user is on that path.

## Propose

Output:

```markdown
## Release proposal

- Current version: …
- Suggested next: … (patch/minor/major reason)
- Package: …

## CHANGELOG draft

## [X.Y.Z] — YYYY-MM-DD

### Fixed | Added | Changed

- …

## Files to edit

- package.json → version X.Y.Z
- CHANGELOG.md → new section

## Suggested commit

release: vX.Y.Z - <summary>

## Before tag (local)

pnpm run release:check

## Suggested tag commands (not run)

git tag vX.Y.Z
git push origin vX.Y.Z

## After tag push (CI)

- release.yml requires green main CI for the same SHA
- prepack once + npm publish --ignore-scripts
- GitHub Release body from CHANGELOG

## Stop

Waiting for explicit approval before writing files / committing / tagging / pushing.
```

## If user says “apply prep” / “写进仓库”

Then you may:

1. Edit `package.json` + `CHANGELOG.md`
2. Use intentional staging + conventional/release commit (`/commit` skill rules)
3. Create **local** tag only if asked

Still do **not** push tag or publish unless separately authorized.

## Versioning heuristics

- **patch**: fixes, docs-only consumer-facing notes, small non-breaking tweaks
- **minor**: new features, new components, non-breaking API additions
- **major**: breaking API / behavior without compat path

Include issue refs (`#9`) and internal IDs (`CUI-*`) in CHANGELOG bullets when known.

## Boundaries

- Never print or request npm tokens.
- Never skip `release:check` / main CI by tagging a red or untested commit.
- Prefer tag → Actions publish over local `pnpm publish`.
- Report faithfully if version already exists as a tag.
