1. Install dependencies

```bash
npm install -D vitest @vitest/ui @vitest/coverage-v8 jsdom \
  @testing-library/react @testing-library/jest-dom \
  @testing-library/user-event
```

2. Create `vitest.config.ts`

Create this file at the project root:

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/utils/**'],
    },
  },
})
```

3. Complete the unit test suite

Open `src/utils/utils.ts`. There are 13 functions grouped into four categories. Write a `describe` block for each one.

### Date utilities

| Function | What to test |
|---|---|
| `formatDate` | correct format, leading zeros, throws on invalid input |
| `isFutureDate` | future date → `true`, past date → `false` |
| `daysBetween` | correct count, order-independent, same date → 0, across year boundaries |

### String utilities

| Function | What to test |
|---|---|
| `capitalize` | uppercases first char, leaves the rest untouched, throws on empty string |
| `truncate` | appends `...`, no-op when short, exact length, throws on maxLength ≤ 0 |
| `countWords` | correct count, empty string → 0, whitespace-only → 0, ignores extra spaces |
| `slugify` | lowercases, replaces spaces, strips special chars, collapses multiple hyphens |
| `reverseString` | reverses, empty string → empty, double-reverse equals original |

### Validation utilities

| Function | What to test |
|---|---|
| `isValidEmail` | valid addresses pass, missing `@`, missing TLD, empty string → `false` |
| `isValidNIF` | known-valid NIFs pass, wrong length, letters, starts with 0, wrong check digit |

### Number utilities

| Function | What to test |
|---|---|
| `formatCurrency` | output contains the amount and `€`, handles zero and negative values |
| `percentage` | correct calculation, result > 100 when value > total, throws when total is 0 |
| `clamp` | within range stays, above max → max, below min → min, throws when min > max |

> **Reference:** the complete test suite is in `workshop-app/src/utils/utils.test.ts`.


4. Install and configure Playwright

npm init playwright@latest

```bash
# If you need to install browsers separately:
npx playwright install
```

5. Replace `playwright.config.ts` with this:

```ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
})
```

6. Command reference

```bash
# ── VITEST ───────────────────────────────────────────────────────
npm test                # watch mode — re-runs on every save
npm run test:run        # run once and exit
npm run test:ui         # graphical Vitest UI
npm run test:coverage   # coverage report → open coverage/index.html

# ── PLAYWRIGHT ───────────────────────────────────────────────────
npm run e2e             # run all E2E tests (headless)
npm run e2e:ui          # Playwright UI — step through tests visually
npm run e2e:codegen     # record interactions → generate test code
npx playwright show-report  # open the last HTML report
```

---

## Resources

| Tool | Docs |
|---|---|
| Vitest | https://vitest.dev |
| Vitest UI | https://vitest.dev/guide/ui |
| Playwright | https://playwright.dev |
| Playwright Codegen | https://playwright.dev/docs/codegen |
| Testing Library | https://testing-library.com |

---

