# Agent guide

You are working on a web application. This file is the authoritative guide for how
work gets done in this repo. Read it completely before starting any task.

## Branch and PR workflow

- You get your own branch. Never push to `main`.
- Name your branch `agent/<short-kebab-description>` (e.g. `agent/add-date-filter`).
- Open exactly one PR per task. Do not bundle unrelated changes.
- The PR description MUST include a visual verification screenshot embedded inline
  (see "PR description format" below).

## Visual verification — required for every UI change

Before you open a PR, you must visually verify the change. The workflow is:

1. Start the dev server. The Playwright config auto-starts it via `webServer`, so
   running the tests is enough: `npm run test:e2e`.
2. Write or update a Playwright test in `e2e/` that exercises the changed UI.
   Follow the pattern in `e2e/example.spec.ts`.
3. In the test, call `await page.screenshot({ path: 'e2e/screenshots/<name>.png' })`
   for each state worth reviewing.
4. Run `npm run test:e2e`. Then **open the screenshot file** with your file-read
   tool. You can see images — look at it and confirm the result matches the
   request.
5. If it does not match, iterate: fix the code, re-run, re-check.
6. Commit the screenshot(s) alongside the code change. `e2e/screenshots/` is
   intentionally NOT gitignored — the screenshots are part of the review.

Do not mark the task complete until step 4 has passed.

## PR description format

Every PR description must follow this template exactly:

```
## What changed
<one-sentence summary>

## Why
<link to issue, or brief rationale>

## Visual verification
![<short description>](https://raw.githubusercontent.com/<owner>/<repo>/<branch>/e2e/screenshots/<file>.png)

## How to test
<local repro steps, if not obvious>
```

The raw GitHub URL format is required so the screenshot renders inline in the PR.
Substitute `<owner>`, `<repo>`, and `<branch>` with the actual values. If multiple
screenshots are relevant (e.g. before/after, different states), include all of them.

## Code conventions

- Use `data-testid` attributes for any element a test needs to reference. Never
  rely on CSS classes or visible text — they are brittle and change for unrelated
  reasons.
- Components go in `src/components/`. One component per file.
- Tests go in `e2e/`, mirroring the component they exercise (e.g. `e2e/filters.spec.ts`
  for `src/components/Filters.tsx`).
- Prefer small, focused tests. One test = one user-visible behaviour.
- Keep the viewport at 1440x900 (set in `playwright.config.ts`) so screenshots are
  consistent across runs.

## Things you should not do

- Do not modify `.github/workflows/` unless the task explicitly asks you to.
- Do not change `playwright.config.ts` base settings without calling it out in the
  PR description.
- Do not skip visual verification, even for "small" or "obvious" changes.
- Do not force-push to your branch after opening the PR.
- Do not delete other agents' screenshots — only touch files relevant to your task.
