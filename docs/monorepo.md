# Monorepo Structure

## Current State (Single Package)

Chaos UI is currently a single package with all components, hooks, and lib in the root.

## Target State (npm workspaces)

```
chaos_style/
├── packages/
│   ├── chaos-ui/          # Main component library
│   │   ├── src/
│   │   │   ├── components/ui/
│   │   │   ├── components/business/
│   │   │   ├── components/layout/
│   │   │   ├── hooks/
│   │   │   └── lib/
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── chaos-icons/       # Icon system (future)
│   │   └── package.json
│   ├── chaos-hooks/       # Standalone hooks (future)
│   │   └── package.json
│   └── chaos-lib/         # Standalone utilities (future)
│       └── package.json
├── apps/
│   ├── demo/              # Next.js demo app
│   └── docs/              # Storybook docs
├── turbo.json
├── package.json           # Root workspace config
└── pnpm-workspace.yaml    # (if using pnpm)
```

## Migration Plan

### Phase 3.1: Single Package Reorganization (Current)

- Maintain current flat structure (`components/`, `hooks/`, `lib/`)
- Add `turbo.json` for task orchestration
- Preserve `@/` import alias
- Preserve 7 subpath exports
- Keep `pre-monorepo-restructure` branch as rollback

### Phase 3.2: Enable npm workspaces

- Move components to `packages/chaos-ui/src/`
- Create `chaos-icons`, `chaos-hooks`, `chaos-lib` sub-packages
- Configure npm workspaces in root `package.json`
- Use Changesets for version management

### Phase 3.3: Monorepo Governance

- CODEOWNERS per package
- Shared ESLint/TypeScript/Prettier configs
- Apps in sandboxed `apps/` directory
- CI pipeline per package

## Turbo Configuration

`turbo.json` is configured with:

- **build**: Builds all packages and apps
- **dev**: Starts dev servers (no cache, persistent)
- **test**: Runs tests with coverage output
- **check**: Runs typecheck + lint + css + deps
- **clean**: Cleans build artifacts

## Changesets

Version management uses `@changesets/cli`:

```bash
npx changeset          # Create a changeset
npx changeset version  # Apply changesets to bump versions
npx changeset publish  # Publish to npm
```

The `.changeset/config.json` file configures:

- Access: restricted
- Base branch: main
- Changelog: auto-generated
- Update internal dependencies on version bump
