# Git Branching & Commit Strategy Steering

## Branching

- Every ticket gets its own branch, checked out fresh from the latest
  `main` — never stacked on another in-progress ticket's branch unless the
  tickets are being picked up together as a dependent set (see below).
- Branch naming follows the ticket: `SHU-XXX-short-description` (each spec
  file states its own branch name where relevant).
- Tickets that depend on each other and are being implemented together in
  the same pass should still result in atomic, per-ticket commits — don't
  squash multiple tickets' work into a single undifferentiated commit.

## Commits

- Commit only when a ticket (or an agreed dependent group of tickets) is
  actually complete and its acceptance criteria are met — not at arbitrary
  midpoints.
- Commit message format: `<type>(SHU-XXX): <short description>`, e.g.
  `feat(SHU-010): hero organism`, `chore(SHU-001): project foundation and
tooling`, `fix(SHU-014): honeypot field visibility`. Use `feat`/`fix`/
  `chore`/`refactor`/`test` as appropriate for the change.
- **Never list an AI agent/assistant as a contributor, co-author, or in the
  commit trailer.** No `Co-Authored-By` lines referencing Claude or any
  other AI tool. Commits are authored under the developer's own identity
  only.
- Never bypass the Husky pre-commit hook (`--no-verify`) to force a commit
  through. If lint, typecheck, or tests fail, fix the underlying issue and
  recommit — a commit with a failing hook indicates the ticket isn't
  actually done yet.
- Prefer creating a new commit to amending an existing one, unless
  explicitly instructed otherwise — especially important after a failed
  pre-commit hook, since the original commit never happened and `--amend`
  would target the wrong (previous) commit.

## Handoff process

- Once a ticket's branch is complete and committed, stop and inform the
  user — do not open the pull request yourself. The user raises the PR
  against `main` and merges it.
- Wait for the user to confirm the merge before starting a ticket that
  depends on the merged one. Don't assume merge timing or proceed
  speculatively against an unmerged dependency.
- Vercel handles CI/CD on merge to `main` — this is user-managed
  (project + env vars), not something a coding agent configures.

## Parallel ticket work

- Tickets within the same wave that don't depend on each other (see each
  spec's `Depends on:` line) can be picked up in parallel by different
  agents/branches. Tickets with a real dependency must wait for their
  dependency's branch to be merged to `main` first — don't branch off an
  unmerged branch to "save time," since that recreates the exact ordering
  problem waves exist to prevent.
