# Testing Patterns

**Analysis Date:** 2026-08-04

## Test Framework

**Runner:**
- None. No test runner is installed or configured. `package.json` has no `vitest`, `jest`, `@testing-library/*`, `playwright`, or `cypress` dependency, and no `test` script exists (only `dev`, `build`, `build:dev`, `preview`, `lint`).
- No `vitest.config.*`, `jest.config.*`, or `playwright.config.*` file exists anywhere in the repo.

**Assertion Library:**
- Not applicable — none installed.

**Run Commands:**
```bash
# No test command exists. `npm run lint` is the only automated quality check:
npm run lint          # eslint . — static analysis only, not a test suite
```

## Test File Organization

**Location:**
- Not applicable. There are zero `*.test.*` or `*.spec.*` files anywhere in the repository (verified via `find . -name "*.test.*" -o -name "*.spec.*"` excluding `node_modules`).

**Naming:**
- No convention established yet.

**Structure:**
- No test directory (`__tests__`, `tests/`, `src/**/*.test.tsx`) exists.

## Test Structure

Not applicable — no tests exist to derive a pattern from.

## Mocking

Not applicable — no mocking library or pattern exists in the codebase.

## Fixtures and Factories

Not applicable — no fixture/factory pattern exists. Content data (projects, services, methods) is hardcoded directly in route files as plain arrays (see `src/routes/index.tsx`), which could serve as natural fixture data if tests were introduced.

## Coverage

**Requirements:** None. No coverage tool configured, no threshold enforced, no CI pipeline detected in the repo that would run tests or measure coverage.

## Test Types

**Unit Tests:** Not present.

**Integration Tests:** Not present.

**E2E Tests:** Not present. No Playwright/Cypress/Puppeteer dependency.

## Recommendations for Introducing Testing

This project is a content-heavy marketing/portfolio site built with TanStack Start + React 19 + Vite. If a testing phase is planned, the natural fit given the current stack is:

1. **Unit/component tests:** Vitest + `@testing-library/react`, since Vite is already the build tool (`vite.config.ts`) and Vitest shares its config format, minimizing setup friction. Priority candidates for first coverage:
   - `src/lib/nav-context.ts` — pure functions (`getRouteContext`, `setOrigin`, `getOrigin`) with clear inputs/outputs and existing try/catch edge cases around `sessionStorage`.
   - `src/lib/seo.ts` — pure function `routeSeo()` with well-defined input/output shape, ideal first test target.
   - `src/lib/utils.ts` — `cn()` helper, trivial but establishes the pattern.
   - `src/hooks/use-scroll-reveal.tsx` — would need `@testing-library/react-hooks` or `renderHook` from `@testing-library/react` plus an `IntersectionObserver` mock (not natively available in jsdom).

2. **E2E/smoke tests:** Playwright is a reasonable fit for verifying route navigation, since the app is built around TanStack Router file-based routes with SEO-critical `head()` metadata (canonical URLs, OG tags) per route in `src/routes/*.tsx` — an E2E smoke test asserting each route renders and has correct `<title>`/meta tags would catch regressions in `routeSeo()` usage across the ~20 route files.

3. **No test infrastructure currently exists to extend** — introducing testing here means creating the config, scripts, and initial patterns from scratch rather than following an established in-repo convention.

---

*Testing analysis: 2026-08-04*
