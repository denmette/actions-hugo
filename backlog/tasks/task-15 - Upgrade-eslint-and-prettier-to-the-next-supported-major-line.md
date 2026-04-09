---
id: TASK-15
title: Upgrade ESLint and Prettier to the next supported major line
status: Done
assignee: []
created_date: '2026-04-08 16:25'
updated_date: '2026-04-09 08:57'
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
- [x] #1 ESLint is upgraded to the next supported major line and the flat config remains valid.
- [x] #2 Prettier is upgraded to the next supported major line and repository formatting commands still work as expected.
- [x] #3 Any resulting config or code cleanup needed for the major-version change is handled in the same task.
- [x] #4 Local validation confirms linting, formatting, and tests still pass after the upgrade.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-08: Relevant Renovate pressure from the current queue includes `eslint -> v10` and `prettier -> v3`. `typescript-eslint` v8 is already in use and should be treated as already satisfied rather than a new target.
2026-04-09: The repository is already on ESLint 9 with flat config. This task should therefore treat Prettier 3 as the concrete upgrade target now and only change the ESLint line if a real next supported major is available and compatible during implementation. The goal is to avoid inventing churn for a not-yet-actionable ESLint major.
2026-04-09: ESLint 10 is now available and compatible with the repository baseline, so the task was completed by upgrading `eslint` and `@eslint/js` to v10 and `prettier` to v3. The only code cleanup required was removing a handful of initialization patterns that ESLint 10 now flags with `no-useless-assignment`.
2026-04-09: Validation under Node 24: `npm run format:check`, `npm run lint`, `npm run tsc`, and a targeted Vitest pass covering the repo's static test suites plus the non-networked `main.test.ts` cases all passed. The broader networked integration downloads are unchanged by this task and remain subject to the existing sandbox/network limits.
<!-- SECTION:NOTES:END -->
