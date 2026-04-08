---
id: TASK-14
title: Review and reduce transitive dev dependency deprecation warnings in the test stack
status: To Do
assignee: []
created_date: '2026-04-08 16:18'
updated_date: '2026-04-08 16:18'
labels:
  - dependencies
  - test
  - maintenance
documentation:
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/package.json
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/package-lock.json
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/vitest.config.ts
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Review remaining transitive deprecation warnings in the development and test dependency tree and reduce them where practical without destabilizing the repository. This currently includes warnings such as `glob@10.5.0`, which is pulled in transitively by the Vitest coverage stack and may not be an active audit failure, but still creates install noise and should be evaluated deliberately.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Remaining transitive deprecation warnings from the dev/test dependency graph are identified with their incoming dependency paths.
- [ ] #2 Warnings that can be removed safely through normal version upgrades are addressed.
- [ ] #3 Any warnings that must remain temporarily are documented with rationale instead of being ignored silently.
- [ ] #4 The resulting install/test flow remains stable after any dependency-tree cleanup.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-08: Current `npm install` warns about `glob@10.5.0`, which is pulled in via `@vitest/coverage-istanbul -> test-exclude -> glob`. `npm audit --json` still reports only the separate transitive `lodash` advisory from `standard-version`, so this warning is not currently an active audit blocker, but it should still be tracked for cleanup.
<!-- SECTION:NOTES:END -->
