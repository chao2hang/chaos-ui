# AI Prompt: Write Unit Test

Use this prompt to guide AI in writing unit tests.

## Prompt Template

```
Write unit tests for the `{ComponentName}` component.

File: `components/ui/{component-name}.test.tsx` (or business/)

Requirements:
1. Use Vitest + @testing-library/react + @testing-library/user-event
2. Import patterns:
   ```tsx
   import { describe, it, expect, vi } from "vitest";
   import { render, screen } from "@testing-library/react";
   import userEvent from "@testing-library/user-event";
   ```
3. Test cases:
   - Renders without crashing
   - Renders with correct text/content
   - Responds to user interactions (click, type, etc.)
   - Applies correct className based on variants
   - Handles disabled state
   - Calls callbacks when expected
   - Accessibility: has correct ARIA attributes
4. Use `data-slot` for querying elements
5. Mock external dependencies if needed
6. Coverage: aim for 85%+ for the component
```
