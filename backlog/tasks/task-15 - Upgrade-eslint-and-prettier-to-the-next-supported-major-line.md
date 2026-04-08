---
id: TASK-15
title: Upgrade ESLint and Prettier to the next supported major line
status: To Do
assignee: []
created_date: '2026-04-08 16:25'
updated_date: '2026-04-08 16:25'
labels:
  - dependencies
  - lint
  - formatting
documentation:
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/package.json
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/eslint.config.js
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Upgrade the repository from the current ESLint 9 and Prettier 2 baseline to the next supported major line where practical. This task should absorb the remaining meaningful linting and formatting Renovate upgrades into one deliberate change rather than a set of fragmented PRs.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 ESLint is upgraded to the next supported major line and the flat config remains valid.
- [ ] #2 Prettier is upgraded to the next supported major line and repository formatting commands still work as expected.
- [ ] #3 Any resulting config or code cleanup needed for the major-version change is handled in the same task.
- [ ] #4 Local validation confirms linting, formatting, and tests still pass after the upgrade.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-08: Relevant Renovate pressure from the current queue includes `eslint -> v10` and `prettier -> v3`. `typescript-eslint` v8 is already in use and should be treated as already satisfied rather than a new target.
<!-- SECTION:NOTES:END -->
