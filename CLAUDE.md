# Agent guide

You are working on a web application. This file is the authoritative guide for how
work gets done in this repo. Read it completely before starting any task.

## Branch and PR workflow

- You get your own branch. Never push to `main`.
- After pushing your branch, you MUST open a pull request before the task is
  considered complete. Pushing the branch alone is not sufficient.
- Use the `gh` CLI to open the PR: `gh pr create --title "<short title>" --body "<full PR description>" --base main`. If `gh` is unavailable, use the GitHub API via `curl` with the token at
  `$GITHUB_TOKEN`. Do not stop at "branch pushed".
- The PR description MUST follow the format in the "PR description format"
  section below, with the screenshot embedded inline via a raw GitHub URL.
- Open exactly one PR per task. Do not bundle unrelated changes.

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

Every PR description must follow this template. Here is a complete worked example
you can copy and adapt:

    ## What changed
    Adds the initial todo app shell: centered card, title, input, and Add button.

    ## Why
    First task toward building the todo app.

    ## Visual verification
    ![todo app shell](https://raw.githubusercontent.com/ferdinand/todo-app-test/agent/build-todo-app-shell/e2e/screenshots/todo-app-shell.png)

    ## How to test
    npm install && npm run test:e2e

The raw GitHub URL has the form:
`https://raw.githubusercontent.com/<owner>/<repo>/<branch-name>/<path-to-file>`

You can determine these values from the repository you are working in:
- `<owner>` and `<repo>` come from the git remote URL
- `<branch-name>` is the branch you just pushed
- `<path-to-file>` is relative to the repo root (e.g. `e2e/screenshots/foo.png`)

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
