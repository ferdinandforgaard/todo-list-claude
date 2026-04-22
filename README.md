# Claude Agent Web Template

A GitHub template for web app projects where multiple Claude Code agents work in
parallel — each on their own branch, each opening their own PR, each self-verifying
their work with a screenshot that shows up inline in the PR.

## What's inside

- **Vite + React + TypeScript** — minimal scaffold; replace `src/` with your own app
- **Playwright** — configured to auto-start the dev server and save screenshots
- **`CLAUDE.md`** — agent workflow rules, read automatically at every session start
- **GitHub Actions** — runs Playwright on every PR, uploads report + screenshots
- **PR template** — requires an embedded visual verification screenshot

## How it works

```
     You                 Claude Code (cloud / desktop / @claude)
      │                              │
      │ "add date filter"  ──────►   │  reads CLAUDE.md
      │                              │  creates branch agent/add-date-filter
      │                              │  edits code
      │                              │  writes Playwright test
      │                              │  runs test → screenshot saved
      │                              │  reads screenshot → verifies visually
      │                              │  iterates if wrong
      │                              │  commits screenshot
      │                              │  opens PR with screenshot embedded
      │                              ▼
      │                        GitHub Actions re-runs Playwright as a safety net
      │ reviews PR  ◄────────── PR ready: screenshot visible in description
```

Each dispatched agent does the full loop autonomously.

## Setup (one time)

### 1. Create a repo from this template

On GitHub, click **Use this template** → **Create a new repository**. Or push this
folder to a new repo and mark it as a template in repo settings.

### 2. Clone and install locally (optional — just to verify it works)

```bash
git clone <your-new-repo>
cd <your-new-repo>
npm install
npx playwright install chromium
npm run test:e2e
```

You should see `e2e/screenshots/homepage.png` created.

### 3. Connect Claude Code

Pick the dispatch method that fits your workflow:

- **Claude Code on the web** (best for parallel dispatch): go to
  [claude.com/code](https://claude.com/code), connect the repo, describe each
  task. Each runs in its own cloud VM.
- **GitHub Action with `@claude`**: run `/install-github-app` inside Claude Code
  once to install the app, then open one issue per task and tag `@claude`.
- **Claude Code Desktop**: open the Code tab, create a new session per task
  (Cmd+N / Ctrl+N). Each session gets its own Git worktree automatically.

## Dispatching work

Phrase each task as a standalone unit — describe the feature, the expected
visual outcome, and any constraints. Example:

> Add a date-range filter to the top of the search results list. Two date inputs
> labelled "From" and "To", with an "Apply" button. When applied, the list should
> filter to items whose `createdAt` falls in the range. Use `data-testid` on the
> inputs and the Apply button.

The agent reads `CLAUDE.md`, implements it, writes a Playwright test, runs it,
looks at the screenshot, iterates until correct, and opens a PR with the
screenshot embedded.

## Swapping in your own app

The template ships with a bare React app. Replace `src/` with your own code.
Keep these files as-is (or adapt):

- `CLAUDE.md`
- `playwright.config.ts`
- `.github/workflows/visual-check.yml`
- `.github/pull_request_template.md`

If your dev server runs on a different port, update `playwright.config.ts`
(`baseURL` and `webServer.url`) and `vite.config.ts` (`server.port`).

## Why screenshots commit to the branch

The PR description embeds screenshots via raw GitHub URLs. For those URLs to
work, the screenshots must exist on the branch. That's why `e2e/screenshots/`
is intentionally NOT in `.gitignore`. The GitHub Actions report artifact is a
belt-and-suspenders alternative — it's attached to the workflow run and
downloadable if you want to see video or traces.

## Tips

- Group parallel dispatches by area to minimise merge conflicts (one agent on
  filtering, one on settings, one on the nav — not three agents on the nav).
- Keep `CLAUDE.md` in sync with conventions you want enforced. It's the agents'
  system prompt for this repo.
- If agents start missing details, add to "Things you should not do" in
  `CLAUDE.md` — it's surprisingly effective.
