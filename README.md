# Workshop App — Unit Testing & Playwright

This is the **initial starter project** for the Unit Testing & Playwright workshop. It provides a base React + TypeScript + Vite app that participants will use to learn how to write unit tests with Vitest and end-to-end tests with Playwright.

---

## Prerequisites

Before getting started, make sure you have the following installed:

- **Node.js** v20 or higher — check with `node --version`
- **npm** v10 or higher — check with `npm --version`

Optional but recommended:
- **VS Code** with the [Vitest extension](https://marketplace.visualstudio.com/items?itemName=vitest.explorer)
- **Playwright VS Code extension** for running E2E tests from the editor

---

## Getting Started

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

---

## Workshop Steps

Follow the `WORKSHOP_GUIDE.md` file for the full step-by-step guide. It covers:

1. Setting up **Vitest** for unit testing
2. Writing your first unit tests
3. Setting up **Playwright** for end-to-end testing
4. Writing E2E tests for the contact form
5. Code challenges (TDD, coverage, and more)

---

## Available Scripts

```bash
npm run dev           # Start the development server
npm run build         # Build for production
npm run preview       # Preview the production build
```

Testing scripts will be added during the workshop:

```bash
# Unit tests (added in step 3)
npm test              # Run in watch mode
npm run test:run      # Run once
npm run test:ui       # Open Vitest UI
npm run test:coverage # Generate coverage report

# E2E tests (added in step 6)
npm run e2e           # Run Playwright tests
npm run e2e:ui        # Open Playwright UI
npm run e2e:codegen   # Record actions and generate test code
```

---

## Tech Stack

- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Vitest](https://vitest.dev) *(added during workshop)*
- [Playwright](https://playwright.dev) *(added during workshop)*