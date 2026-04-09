---
id: TASK-26
title: Harden the post-merge hook so pulls do not fail on temporary lockfile drift
status: To Do
assignee: []
created_date: '2026-04-09 10:29'
updated_date: '2026-04-09 10:29'
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
- [ ] #1 The `post-merge` behavior is reviewed and adjusted so a failed dependency install does not make normal pulls fragile.
- [ ] #2 Any install-on-merge behavior remains understandable and still helps contributors stay in sync when dependencies actually change.
- [ ] #3 If conditional logic is added, it only runs installs when relevant files changed or fails in a more controlled way.
- [ ] #4 The resulting local-hook behavior is documented for contributors.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-09: Code review follow-up after a real `git fetch --all ; git pull --rebase` failed in the `post-merge` hook because `npm ci` detected a temporary package/lock mismatch. The problem is not just the dependency mismatch itself; it is that the hook currently turns ordinary pulls into a brittle install gate.
<!-- SECTION:NOTES:END -->
