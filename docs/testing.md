# Testing

## Overview

Chaos UI uses **Vitest 4** with **jsdom** environment and **@testing-library/react** for component testing.

## Configuration

- Config file: `vitest.config.ts`
- Setup: `vitest.setup.ts` (registers jest-dom matchers)
- Environment: `jsdom`
- Coverage: V8 provider, 85% threshold (lines/branches/functions/statements)

## Running Tests

```bash
npm test              # Run all tests
npm run test:coverage # Run with coverage report
```

## Test File Convention

Test files live next to the component:

```
components/ui/button.tsx
components/ui/button.test.tsx
```

## Test Patterns

### 1. Basic Component Test

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "./button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeDefined();
  });
});
```

### 2. Base UI Component (needs Root context)

For components that require a Base UI Root context (Dialog, Select, Popover), test type exports + module imports instead of full rendering:

```tsx
import { describe, it, expect } from "vitest";
import type { DialogProps } from "./dialog";

describe("Dialog types", () => {
  it("exports DialogProps type", () => {
    const props: DialogProps = { open: false };
    expect(props).toBeDefined();
  });
});
```

### 3. Interaction Test

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Button } from "./button";

describe("Button interaction", () => {
  it("calls onClick", async () => {
    const fn = vi.fn();
    render(<Button onClick={fn}>Click</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(fn).toHaveBeenCalledOnce();
  });
});
```

## Coverage

Coverage reports are generated in `./coverage/` directory. The threshold is set to 85% for all metrics.
