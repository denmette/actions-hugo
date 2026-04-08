---
id: TASK-17
title: Upgrade Husky to v9 and modernize local hook installation
status: To Do
assignee: []
created_date: '2026-04-08 16:25'
updated_date: '2026-04-08 16:25'
labels:
  - dependencies
  - developer-experience
  - tooling
documentation:
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/package.json
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/.husky
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Upgrade Husky from the current v5 line to v9 and modernize the repository's local hook installation path accordingly. This should also reconcile stale Renovate noise around both `husky -> v9` and older `husky -> v5.x` lockfile PRs.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Husky is upgraded to v9 with a supported hook installation flow.
- [ ] #2 Existing local hook behavior remains functional after the upgrade.
- [ ] #3 `package.json` scripts and any `.husky/` files are updated coherently for the new Husky line.
- [ ] #4 Local contributor setup remains understandable and documented after the migration.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-08: Relevant Renovate pressure from the current queue includes `husky -> v9` plus stale `husky -> v5.2.0` noise. `lint-staged -> v16` is already satisfied and should not be treated as a new open upgrade.
<!-- SECTION:NOTES:END -->
