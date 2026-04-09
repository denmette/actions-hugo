---
id: TASK-26
title: Harden the post-merge hook so pulls do not fail on temporary lockfile drift
status: Done
assignee: []
created_date: '2026-04-09 10:29'
updated_date: '2026-04-09 12:24'
labels:
  - developer-experience
  - tooling
  - git
documentation:
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/.husky/post-merge
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/package.json
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/package-lock.json
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Make the local `post-merge` hook more resilient. It currently runs `npm ci` unconditionally after every merge or rebase. When the dependency graph is in flux or a pull lands an inconsistent intermediate state, the hook causes `git pull --rebase` itself to fail, which is a poor developer experience for a repository that intentionally evolves its tooling frequently.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 The `post-merge` behavior is reviewed and adjusted so a failed dependency install does not make normal pulls fragile.
- [x] #2 Any install-on-merge behavior remains understandable and still helps contributors stay in sync when dependencies actually change.
- [x] #3 If conditional logic is added, it only runs installs when relevant files changed or fails in a more controlled way.
- [x] #4 The resulting local-hook behavior is documented for contributors.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-09: Code review follow-up after a real `git fetch --all ; git pull --rebase` failed in the `post-merge` hook because `npm ci` detected a temporary package/lock mismatch. The problem is not just the dependency mismatch itself; it is that the hook currently turns ordinary pulls into a brittle install gate.
2026-04-09: Implementation plan: only run the dependency refresh when `package.json`, `package-lock.json`, or `.nvmrc` changed across the pull, keep the sync behavior on successful installs, and downgrade install failures to a clear manual-recovery warning so the Git operation itself still succeeds.
2026-04-09: Completed by making `.husky/post-merge` dependency-aware, keeping `npm ci` as the sync path only when dependency metadata changed, and converting install failures into a manual recovery warning so `git pull --rebase` is no longer blocked by transient install issues. Contributor guidance was added to `AGENTS.md`.
<!-- SECTION:NOTES:END -->
