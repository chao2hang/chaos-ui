# AI Prompt: Fix Component Bug

Use this prompt to guide AI in fixing a bug in a Chaos UI component.

## Prompt Template

```
Fix the following bug in Chaos UI:

Component: `{component-name}`
File: `components/ui/{component-name}.tsx` (or `components/business/`)
Bug Description: {describe the bug}
Reproduction: {steps to reproduce}
Expected: {expected behavior}
Actual: {actual behavior}

Steps:
1. Read the component file and understand the current implementation
2. Identify the root cause
3. Fix the bug while preserving the existing API
4. Add or update a test case that covers the bug scenario
5. Run `npm run check` to verify no type/lint errors
6. Run `npm test` to verify the fix
7. Do not break any existing functionality
```
